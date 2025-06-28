"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
   
    <nav className="m-7">
      <div className="flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <Image
            src="/favicon.ico"
            alt="DevMate Logo"
            width={25}
            height={25}
            className="rounded-full ml-10"
          />
          <span className="text-3xl">DevMate</span>
        </Link>

        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        <div className="hidden md:flex items-center gap-10 *:font-bold">
        {["home", "features", "how-it-works", "tracks", "FAQ"].map((text, i) => (
  <Link
    key={i}
    href={text === "home" ? "/" : `/#${text}`} 
    className="capitalize hover:bg-white hover:text-black hover:rounded-md px-2 py-1 transition"
  >
    {text.replace("-", " ")}
  </Link>
))}

          <Link
            href="/login"
            className="block rounded-md border-2 px-5 py-1 capitalize hover:bg-white hover:text-black transition"
          >
            Login
          </Link>
        </div>
      </div>

      <div
        className={`md:hidden mt-4 flex flex-col gap-4 *:font-bold transform transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 translate-y-0 max-h-screen"
            : "opacity-0 -translate-y-5 max-h-0 overflow-hidden"
        }`}
      >
       {["home", "features", "how-it-works", "tracks", "FAQ"].map((text, i) => (
  <Link
    key={i}
    href={`#${text === "home" ? "" : text}`}
    className="capitalize hover:bg-white hover:text-black hover:rounded-md px-2 py-1 transition"
    onClick={() => setIsOpen(false)}
  >
    {text.replace("-", " ")}
  </Link>
))}
        <Link
          href="/login"
          className="block rounded-md border-2 px-5 py-1 capitalize hover:bg-white hover:text-black transition"
          onClick={() => setIsOpen(false)}
        >
          Login
        </Link>
      </div>
    </nav>
  );
}

