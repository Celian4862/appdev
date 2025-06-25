import Image from "next/image";
import Link from "next/link";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
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
        <div className="flex flex-wrap items-center gap-10">
          <Link href="/" className="capitalize">
            home
          </Link>
          <Link href="/features" className="capitalize">
            features
          </Link>
          <Link href="/how-it-works" className="capitalize">
            how it works
          </Link>
          <Link href="/tracks" className="capitalize">
            tracks
          </Link>
          <Link href="/faq" className="uppercase">
            faq
          </Link>
        </div>
        <Link href="/login" className="block rounded-md border-2 px-5 py-1">
          Login
        </Link>
      </nav>
      {children}
    </>
  );
}
