export const runtime = 'nodejs';

// import type { User as NextAuthUser } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";

export const authOptions: NextAuthConfig = {
  secret: process.env.AUTH_SECRET,
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

        console.log("[auth] Authorize called with:", { email });

        if (!email || !password) {
          console.log("[auth] Missing email or password");
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          console.log("[auth] User not found:", email);
          return null;
        }

        if (!user.password) {
          console.log("[auth] User has no password — maybe OAuth-only account");
          return null;
        }

        const isValid = await bcrypt.compare(password, user.password);
        console.log("[auth] Password match:", isValid);

        if (!isValid) {
          console.log("[auth] Password mismatch");
          return null;
        }

        const safeUser = {
          id: user.id,
          email: user.email,
          name: user.name ?? `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
          image: user.image ?? undefined,
        };

        console.log("[auth] Returning safe user for session:", safeUser);

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
      console.log("SIGNIN CALLBACK", user, account);
      
      // For credentials provider, ensure user exists in database
      if (account?.provider === "credentials" && user?.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email }
        });
        
        if (!dbUser) {
          console.log("[auth] User not found in database during signIn");
          return false;
        }
        
        // Update user object with database ID
        user.id = dbUser.id;
      }
      
      return true;
    },
    async jwt({ token, user }) {
      // When user signs in, add their info to the token
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        
        // Fetch additional user data from database
        if (user.email) {
          const dbUser = await prisma.user.findUnique({
            where: { email: user.email },
            select: {
              id: true,
              email: true,
              name: true,
              firstName: true,
              lastName: true,
              image: true,
            },
          });
          
          if (dbUser) {
            token.id = dbUser.id;
            token.firstName = dbUser.firstName;
            token.lastName = dbUser.lastName;
            token.image = dbUser.image;
          }
        }
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name ?? undefined;
        session.user.firstName = token.firstName as string | undefined;
        session.user.lastName = token.lastName as string | undefined;
        session.user.image = token.image as string | undefined;
        session.user.email = token.email ?? session.user.email;
      }

      console.log("[auth] Session callback result:", session);
      return session;
    },
  },
};
