export const runtime = 'nodejs';

// lib/auth.ts
import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { authOptions } from "./authOptions";

// Add Prisma adapter
authOptions.adapter = PrismaAdapter(prisma);

export const { auth, signIn, signOut, handlers } = NextAuth(authOptions);
