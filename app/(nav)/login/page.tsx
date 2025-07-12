import AuthForm from "@/ui/AuthForm";
import FormInput from "@/ui/FormInput";
import Link from "next/link";

export default function Login() {
  return (
    <AuthForm
      greet="Welcome back!"
      desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      action=""
      actionText="Login"
      red_desc="Don't have an account?"
      red_link="/sign-up"
      redirect="Sign up"
    >
      <FormInput label="Email" name="email" type="text" />
      <FormInput label="Password" name="password" type="password" />
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
