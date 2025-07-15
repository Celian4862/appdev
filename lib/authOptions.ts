export const runtime = 'nodejs';

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";

export const authOptions: NextAuthConfig = {
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const email = credentials?.email as string;
        const password = credentials?.password as string;

        if (!email || !password) {
          throw new Error("Missing email or password.");
        }

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user || !user.password) {
          throw new Error("Invalid credentials.");
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) throw new Error("Invalid credentials.");

        return {
          id: user.id,
          email: user.email,
          name: user.firstName ? `${user.firstName} ${user.lastName}` : user.email,
          image: user.image ?? undefined,
        };
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
    strategy: "database",
  },
  callbacks: {
    async signIn({ user, account }) {
    if (account?.provider === "google") {
      const { access_token, id_token, providerAccountId } = account;

      // Link account directly here instead of calling /api/link-google
      await prisma.account.upsert({
        where: {
          provider_providerAccountId: {
            provider: "google",
            providerAccountId,
          },
        },
        update: {},
        create: {
          userId: user.id, // user.id from your DB
          provider: "google",
          providerAccountId,
          type: "oauth",
          access_token,
          id_token,
          token_type: "bearer",
          scope: account.scope ?? "openid email profile",
          expires_at: Math.floor(Date.now() / 1000) + 3600,
        },
      });
    }

    return true;
  },
    async session({ session }) {
      const dbUser = await prisma.user.findUnique({
        where: { email: session.user?.email || "" },
        select: { id: true, email: true, name: true },
      });

      if (session.user && dbUser) {
        session.user.id = dbUser.id;
      }

      return session;
    },
    async jwt({ token}) {
      return token;
    }
  },
};
