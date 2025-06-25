import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex h-135 flex-col justify-center gap-10 text-center">
        <div className="text-6xl font-bold">Your ultimate study buddy.</div>
        <div className="text-xl font-light">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </div>
        <div>
          <Link
            href="/sign-up"
            className="rounded-md bg-white px-13 py-4 text-xl font-bold text-black"
          >
            Get Started
          </Link>
        </div>
      </div>
    </>
  );
}
