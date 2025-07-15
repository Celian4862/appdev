"use client";
import Link from "next/link";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import NavLink from "./client/NavLink";
import LogoutButton from "@/app/(nav)/ui/LogoutButton";
import  getServerSession from "next-auth";

export default async function Nav() {
  const { authOptions } = await import("@/lib/authOptions");
  const session = await getServerSession(authOptions);
  const logged_in = session && "user" in session && !!session.user;

  return (
    <nav
      className={`${
        logged_in && "border-b-2 border-white bg-black"
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
        <NavLink logged_in={logged_in} />
      </div>
      {logged_in ? (
        <>
          <FaUserCircle size={50} color="#ccc" />
          <LogoutButton />
        </>
      ) : (
        <Link href="/login" className="block rounded-md border-2 px-5 py-1">
          Login
        </Link>
      )}
    </nav>
  );
}
