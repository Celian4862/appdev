"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ logged_in }: { logged_in: boolean }) {
  const pathname = usePathname();
  const links = logged_in
    ? ["home", "dashboard", "roadmap", "assessments", "playground"]
    : ["home", "features", "how-it-works", "tracks", "faq"];

  return logged_in
    ? links.map((link, i) => (
        <Link
          key={i}
          href={link === "home" ? "/" : `/${link}`}
          className={`rounded-md px-3 py-1 capitalize transition-colors duration-300 ${
            pathname === `/${link === "home" ? "" : link}`
              ? "bg-white text-black"
              : "hover:bg-white hover:text-black"
          }`}
        >
          {link.replace("-", " ")}
        </Link>
      ))
    : links.map((link, i) => (
        <Link
          key={i}
          href={link === "home" ? "/" : `/#${link}`}
          className={`rounded-md px-3 py-1 ${link === "faq" ? "uppercase" : "capitalize"} hover:text-black" transition-colors duration-300 hover:bg-white hover:text-black`}
        >
          {link.replace("-", " ")}
        </Link>
      ));
}
