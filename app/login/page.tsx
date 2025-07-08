import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import FormInput from "@/ui/FormInput";

export default function Login() {
  return (
    <div className="mb-10 flex justify-center">
      <div className="justify-content flex w-[40vw] flex-col gap-6 rounded-xl border-1 bg-black p-20">
        <div>
          <h1 className="mb-3 text-3xl font-bold">Welcome back!</h1>
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
          <button
            type="submit"
            className="w-full cursor-pointer rounded-md bg-white py-2 text-xl font-bold text-black active:bg-gray-400"
          >
            Login
          </button>
        </form>
        <div className="text-center">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="text-blue-400">
            Sign up
          </Link>
          !
        </div>
      </div>
    </div>
  );
}
