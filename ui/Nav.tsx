import Link from "next/link";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";

export default function Nav() {
  let logged_in = true; // Placeholder session variable
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
    <nav className="m-7 flex flex-wrap justify-around *:font-bold">
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
        <Link href="/">home</Link>
        {logged_in ? (
          <>
            {member.map((links, index) => (
              <Link key={index} href={links.route}>
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
