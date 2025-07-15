"use client";

import { useActionState, useEffect, useState } from "react";
import { authenticate } from "@/actions/auth/server";
import { useRouter } from "next/navigation";

import AuthForm from "@/ui/AuthForm";
import FormInput from "@/ui/FormInput";
import Link from "next/link";

const initialState: string | undefined = undefined;

export default function Login() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);

  const [state, formAction] = useActionState(
    async (_prevState: string | undefined, formData: FormData): Promise<string | undefined> => {
      setSubmitted(true);
      return await authenticate(undefined, formData);
    },
    initialState
  );

  useEffect(() => {
    if (submitted && state === undefined) {
      router.push("/dashboard"); // only redirect after successful login
    }
  }, [state, submitted, router]);

  return (
    <AuthForm
      greet="Welcome back!"
      desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      action={formAction}
      actionText="Login"
      red_desc="Don't have an account?"
      red_link="/sign-up"
      redirect="Sign up"
    >
      <FormInput label="Email" name="email" type="text" />
      <FormInput label="Password" name="password" type="password" />
      {submitted && state && (
        <p className="text-red-500 text-sm">{state}</p>
      )}
      <div className="flex justify-end">
        <Link
          href="/forgot-password"
          className="text-sm text-blue-400 hover:underline"
        >
          Forgot Password?
        </Link>
      </div>
    </AuthForm>
  );
}
