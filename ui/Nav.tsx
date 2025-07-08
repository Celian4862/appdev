"use client";
import Link from "next/link";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import { usePathname } from "next/navigation";

export default function Nav() {
  const logged_in = true; // Placeholder session variable
  const pathname = usePathname();
  const guest = [
    {
      route: "/features",
      name: "features",
    },
    {
      route: "/how-it-works",
      name: "how it works",
    },
    {
      route: "/tracks",
      name: "tracks",
    },
    {
      route: "/faq",
      name: "FAQ",
    },
  ];
  const member = [
    {
      route: "/",
      name: "home",
    },
    {
      route: "/dashboard",
      name: "dashboard",
    },
    {
      route: "/roadmap",
      name: "roadmap",
    },
    {
      route: "/assessments",
      name: "assessments",
    },
    {
      route: "/playground",
      name: "playground",
    },
  ];
  return (
    <nav
      className={`${
        logged_in
          ? "fixed top-0 left-0 z-50 w-full border-b-2 border-white bg-black py-8"
          : "m-7"
      } flex flex-wrap items-center justify-around *:font-bold`}
    >
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/favicon.ico"
          alt="DevMate Logo"
          width={25}
          height={25}
          className="rounded-full"
        />
        <span className="text-3xl">DevMate</span>
      </Link>
      <div className="flex flex-wrap items-center gap-10 *:capitalize">
        {logged_in ? (
          <>
            {member.map((links, index) => (
              <Link
                key={index}
                href={links.route}
                className={`rounded-md px-3 py-1 transition-colors duration-300 ${
                  pathname === links.route
                    ? "bg-white text-black"
                    : "hover:bg-white hover:text-black"
                }`}
              >
                {links.name}
              </Link>
            ))}
          </>
        ) : (
          <>
            {guest.map((links, index) => (
              <Link key={index} href={links.route}>
                {links.name}
              </Link>
            ))}
          </>
        )}
      </div>
      {logged_in ? (
        <>
          <FaUserCircle size={50} color="#ccc" />
        </>
      ) : (
        <Link href="/login" className="block rounded-md border-2 px-5 py-1">
          Login
        </Link>
      )}
    </nav>
  );
}
