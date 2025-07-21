// import type { User as NextAuthUser } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";

export const authOptions: NextAuthConfig = {
  secret: process.env.AUTH_SECRET,
  trustHost: true, // Required for Vercel deployments
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const email = credentials?.email as string;
        const password = credentials?.password as string;

        if (process.env.NODE_ENV === 'development') {}

        if (!email || !password) {
          if (process.env.NODE_ENV === 'development') {}
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          if (process.env.NODE_ENV === 'development') {}
          return null;
        }

        if (!user.password) {
          if (process.env.NODE_ENV === 'development') {}
          return null;
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (process.env.NODE_ENV === 'development') {}

        if (!isValid) {
          if (process.env.NODE_ENV === 'development') {}
          return null;
        }

        const safeUser = {
          id: user.id,
          email: user.email,
          name: user.name ?? `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
          image: user.image ?? undefined,
        };

        if (process.env.NODE_ENV === 'development') {}

        return safeUser;
      },
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt", // Change to JWT for credentials provider
  },
  callbacks: {
    async signIn({ user, account }) {
      if (process.env.NODE_ENV === 'development') {}
      
      // For credentials provider, ensure user exists in database
      if (account?.provider === "credentials" && user?.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email }
        });
        
        if (!dbUser) {
          if (process.env.NODE_ENV === 'development') {}
          return false;
        }
        
        // Update user object with database ID
        user.id = dbUser.id;
      }
      
      return true;
    },
    async jwt({ token, user, trigger }) {
      try {
        if (process.env.NODE_ENV === 'development') {}
        
        // When user signs in, add their info to the token
        if (user) {
          token.id = user.id;
          token.email = user.email;
          token.name = user.name;
          
          // Fetch additional user data from database including onboarding status
          if (user.email) {
            try {
              const dbUser = await prisma.user.findUnique({
                where: { email: user.email },
                select: {
                  id: true,
                  email: true,
                  name: true,
                  firstName: true,
                  lastName: true,
                  image: true,
                  UserPreferences: true, // Include preferences to check onboarding
                },
              });
              
              if (dbUser) {
                token.id = dbUser.id;
                token.firstName = dbUser.firstName;
                token.lastName = dbUser.lastName;
                token.image = dbUser.image;
                token.onboardingCompleted = !!dbUser.UserPreferences; // Check if user has preferences
                token.lastOnboardingCheck = Date.now();
              }
            } catch (error) {
              if (process.env.NODE_ENV === "development") { console.error("Error fetching user data during sign in:", error); }
              // Set safe defaults
              token.onboardingCompleted = false;
              token.lastOnboardingCheck = Date.now();
            }
          }
        }
        
        // Check onboarding status and profile data periodically OR when manually updated
        // More conservative in production to prevent Vercel timeouts
        if (token.id) {
          const now = Date.now();
          const lastCheck = token.lastOnboardingCheck as number || 0;
          const isProduction = process.env.NODE_ENV === 'production';
          const checkInterval = isProduction ? (30 * 60 * 1000) : (5 * 60 * 1000); // 30min prod, 5min dev
          
          // ONLY refresh database on explicit trigger or when onboarding is incomplete AND interval passed
          // This minimizes database hits to prevent Vercel timeouts
          const shouldRefresh = trigger === 'update' || 
                               (!token.onboardingCompleted && (now - lastCheck) > checkInterval);
                               
          if (shouldRefresh) {
              try {
                // Add timeout to prevent hanging in Vercel serverless functions
                const timeoutPromise = new Promise((_, reject) =>
                  setTimeout(() => reject(new Error('Database query timeout')), 8000)
                );
                
                // Fetch both preferences and updated profile data with timeout
                const [userPreferences, userData] = await Promise.race([
                  Promise.all([
                    prisma.userPreferences.findUnique({
                      where: { userId: token.id as string },
                    }),
                    prisma.user.findUnique({
                      where: { id: token.id as string },
                      select: {
                        firstName: true,
                        lastName: true,
                        image: true,
                        name: true,
                      },
                    })
                  ]),
                  timeoutPromise
                ]) as [
                  { userId: string } | null, // userPreferences
                  { firstName: string | null; lastName: string | null; image: string | null; name: string | null } | null // userData
                ];
                
                const wasCompleted = token.onboardingCompleted;
                token.onboardingCompleted = !!userPreferences;
                token.lastOnboardingCheck = now;
                
                // Update profile data if available
                if (userData) {
                  token.firstName = userData.firstName;
                  token.lastName = userData.lastName;
                  token.image = userData.image;
                  token.name = userData.name;
                }
                
                if (!wasCompleted && token.onboardingCompleted) {
                  // User just completed onboarding - could trigger refresh if needed
                }
            } catch (error) {
              if (process.env.NODE_ENV === "development") { 
                console.error("❌ Error checking user preferences and profile data in JWT:", error); 
              }
              // Don't break the session, keep existing values and extend delay
              // This prevents auth failures from cascading in production
              token.lastOnboardingCheck = Date.now() + (10 * 60 * 1000); // Delay 10 minutes
              // If this is a fresh token without onboarding status, assume not completed
              if (token.onboardingCompleted === undefined) {
                token.onboardingCompleted = false;
              }
            }
          }
        }
        
        return token;
      } catch (error) {
        if (process.env.NODE_ENV === "development") { console.error("Error in JWT callback:", error); }
        // Return token as-is to prevent session from breaking
        return token;
      }
    },
    async session({ session, token }) {
      try {
        // Send properties to the client
        if (token && session.user) {
          session.user.id = token.id as string;
          session.user.name = token.name ?? undefined;
          session.user.firstName = token.firstName as string | undefined;
          session.user.lastName = token.lastName as string | undefined;
          session.user.image = token.image as string | undefined;
          session.user.email = token.email ?? session.user.email;
        }
        
        return session;
      } catch (error) {
        if (process.env.NODE_ENV === "development") { console.error("Error in session callback:", error); }
        // Return session as-is to prevent breaking
        return session;
      }
    },
  },
};
