"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="rounded-md border-2 px-4 py-1 text-white hover:bg-white hover:text-black transition"
    >
      Logout
    </button>
  );
}
