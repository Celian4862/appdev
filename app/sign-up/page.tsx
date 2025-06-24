import FormInput from "@/ui/FormInput";
import AuthForm from "@/ui/AuthForm";

export default function SignUp() {
  return (
    <AuthForm
      greet="Create your account"
      desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      action=""
      actionText="Sign Up"
      red_desc="Already have an account?"
      red_link="/login"
      redirect="Sign in"
    >
      <div className="flex gap-4 *:w-full">
        <FormInput label="First Name" name="firstName" type="text" />
        <FormInput label="Last Name" name="lastName" type="text" />
      </div>
      <FormInput label="Email" name="email" type="text" />
      <FormInput label="Password" name="password" type="password" />
      <FormInput
        label="Confirm Password"
        name="confirmPassword"
        type="password"
      />
    </AuthForm>
  );
}
