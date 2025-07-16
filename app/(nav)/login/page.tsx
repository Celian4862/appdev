"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useActionState } from "react";

import AuthForm from "@/ui/AuthForm";
import FormInput from "@/ui/FormInput";

// Initial state for useActionState (optional since we're not returning dynamic state)
const initialState: string | undefined = undefined;

export default function LoginPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [, formAction] = useActionState(
    async (_prevState: string | undefined, formData: FormData) => {
      setIsSubmitting(true);

      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      await signIn("credentials", {
        email,
        password,
        redirect: true, // ✅ let NextAuth handle the redirect and session
        callbackUrl: "/dashboard", // ✅ this ensures session is created fully
      });

      // If signIn returns (which it might not on redirect), reset submit state
      setIsSubmitting(false);

      // You could return something here for further client state if needed
      return undefined;
    },
    initialState
  );

  return (
    <AuthForm
      greet="Welcome back!"
      desc="Log in to your account to continue."
      action={formAction}
      actionText={isSubmitting ? "Logging in..." : "Login"}
      red_desc="Don’t have an account?"
      red_link="/sign-up"
      redirect="Sign up"
    >
      <FormInput label="Email" name="email" type="email" />
      <FormInput label="Password" name="password" type="password" />
    </AuthForm>
  );
}
