"use server";
import { signIn } from "next-auth/react";
import { z } from "zod";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs"; // ✅ bcryptjs instead of bcrypt
import { ZodAny, ZodPipe } from "zod";

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
});



/**
 * Handles user authentication.
 */
export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    const credentials = signInSchema.parse(Object.fromEntries(formData));

    const result = await signIn("credentials", {
      email: credentials.email,
      password: credentials.password,
      redirect: false,
    });

    if (result?.error) {
      return "Invalid email or password.";
    }

    return undefined; // ✅ only runs on successful sign-in

  } catch (err) {
    if (err instanceof z.ZodError) return "Please check your inputs.";
    return "Something went wrong.";
  }
}


/**
 * Handles user sign-up (registration).
 */
export async function signUp(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    const data = Object.fromEntries(formData.entries());
    const { email, password, firstName, lastName } = signUpSchema.parse(data);

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return "User already exists.";

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        name: `${firstName} ${lastName}`,
      },
    });

    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    redirect("/dashboard");
    return "Success!";
  } catch (err) {
    if (err instanceof z.ZodError) {
      const firstIssue = err.issues?.[0]?.message;
      return firstIssue ?? "Invalid input.";
    }
  }
}