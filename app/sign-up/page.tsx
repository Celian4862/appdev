import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import FormInput from "@/ui/FormInput";

export default function SignUp() {
  return (
    <div className="mb-10 flex justify-center ">
      <div className="justify-content flex w-[40vw] flex-col gap-6 border-1 bg-black p-20 rounded-xl">
        <div>
          <h1 className="mb-3 text-3xl font-bold">Create your account</h1>
          <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
        </div>
        <Link
          href=""
          className="block w-full rounded-md border-2 py-2 text-center text-lg font-bold"
        >
          <FcGoogle className="mr-2 inline-block" />
          Continue with Google
        </Link>
        <div className="text-center font-light uppercase">or</div>
        <form className="flex flex-col gap-4">
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
          <button
            type="submit"
            className="w-full cursor-pointer rounded-md bg-white py-2 text-xl font-bold text-black active:bg-gray-400"
          >
            Sign Up
          </button>
        </form>
        <div className="text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-400">
            Sign in
          </Link>
          !
        </div>
      </div>
    </div>
  );
}
