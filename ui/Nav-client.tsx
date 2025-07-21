"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import NavLink from "./client/NavLink";
import NavProfilePicture from "./client/NavProfilePicture";

export default function Nav() {
  const { data: session, status } = useSession();
  const logged_in = status === "authenticated" && !!session?.user;
  const loading = status === "loading";

  return (
    <nav
      className={`${
        logged_in ? "border-b-2 border-white bg-black" : ""
      } fixed z-50 flex w-full flex-wrap items-center justify-around py-8 *:font-bold`}
    >
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/favicon.ico"
          alt="DevMate Logo"
          width={25}
          height={25}
          className="h-auto w-7 rounded-full"
        />
        <span className="text-3xl">DevMate</span>
      </Link>

      <div className="flex flex-wrap items-center gap-10">
        <NavLink />
      </div>

      {loading ? (
        // Show loading state while session is being determined
        <div className="flex items-center gap-4">
          <div className="h-8 w-8 animate-pulse rounded-full bg-gray-700"></div>
        </div>
      ) : logged_in ? (
        <div className="flex items-center gap-4">
          <Link href="/profile" className="transition-colors hover:opacity-80">
            <NavProfilePicture imageUrl={session?.user?.image} />
          </Link>
        </div>
      ) : (
        <Link href="/login" className="block rounded-md border-2 px-5 py-1">
          Login
        </Link>
      )}
    </nav>
  );
}
