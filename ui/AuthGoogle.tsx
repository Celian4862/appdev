import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

export default function AuthGoogle() {
  return (
    <Link
      href=""
      className="block w-full items-center rounded-md border-2 py-2 text-center text-lg font-bold"
    >
      <FcGoogle className="mr-2 inline-block" />
      Continue with Google
    </Link>
  );
}
