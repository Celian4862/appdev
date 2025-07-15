"use client";

import { useActionState, useEffect } from "react";
import { signUp } from "@/actions/auth/server";
import toast from "react-hot-toast";

import FormInput from "@/ui/FormInput";
import AuthForm from "@/ui/AuthForm";

const initialState: string | undefined = undefined;

export default function SignUp() {
  const [state, formAction] = useActionState(
    async (_prevState: string | undefined, formData: FormData): Promise<string | undefined> => {
      return await signUp(undefined, formData);
    },
    initialState
  );

  useEffect(() => {
    if (state === "success") {
      toast.success("Successfully registered! Redirecting...");
    }
  }, [state]);

  return (
    <AuthForm
      greet="Create your account"
      desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      action={formAction}
      actionText="Sign Up"
      red_desc="Already have an account?"
      red_link="/login"
      redirect="Sign in"
    >
      <div className="flex gap-4 *:w-full">
        <FormInput label="First Name" name="firstName" type="text" />
        <FormInput label="Last Name" name="lastName" type="text" />
      </div>
      <FormInput label="Email" name="email" type="email" />
      <FormInput label="Password" name="password" type="password" />
      <FormInput label="Confirm Password" name="confirmPassword" type="password" />
    </AuthForm>
  );
}
