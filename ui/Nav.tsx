import Link from "next/link";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import NavLink from "./client/NavLink";

// Check app/(nav)/ui/Nav.tsx for additions
export default function Nav() {
  const logged_in = process.env.LOGGED_IN === "true"; // Placeholder session variable
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
        {!logged_in ? (
          ["home", "features", "how-it-works", "tracks", "faq"].map(
            (link, i) => (
              <Link
                key={i}
                href={link === "home" ? "/" : `/#${link}`}
                className={`rounded-md px-3 py-1 ${link === "faq" ? "uppercase" : "capitalize"} hover:text-black" transition-colors duration-300 hover:bg-white hover:text-black`}
              >
                {link.replace("-", " ")}
              </Link>
            ),
          )
        ) : (
          <NavLink />
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
