import Link from "next/link";
import Image from "next/image";

export default function DashboardPage() {
  // Replace with actual user data as needed
  const userName = "Bernie";
  const hasRoadmap = true;

  return (
    <main className="p-32 px-8 bg-black w-full">
      <div className="mt-16 max-w-7xl mx-auto">
        <h1 className="mb-6 text-4xl font-bold text-white">
            Hi, {userName}!
        </h1>
        <Link href="/roadmap" className="text-lg mb-4">
            <span className="inline-flex items-center pb-2 gap-2 border-b-3 border-transparent hover:border-b-3 hover:border-white">
              <Image
              src="/icons/roadmap_icon.png"
              alt="icon"
              width={24}
              height={24}
              className="rounded-full"
              />
              Roadmap
              <Image
              src="/icons/right_arrow.png"
              alt="icon"
              width={18}
              height={18}
              className="rounded-full"
              />
            </span>
        </Link>
        <div className="relative rounded-lg shadow-md p-8 overflow-hidden min-h-[300px] border-2 border-white mt-6">
            <Image
                src="/roadmap_background.png"
                alt="Roadmap Background"
                fill
                style={{ objectFit: "cover", objectPosition: "center" }}
                className="z-0" // removed rounded-lg here
            />
            <div className="absolute inset-0 bg-black opacity-60"></div>
            <div className="relative z-10 flex flex-col items-start justify-center h-full w-full m-8">
                {hasRoadmap ? (
                    <>
                        <p className="text-md text-white">Phase 1</p>
                        {/* Replace below with actual roadmap content */}
                        <h2 className="text-3xl font-bold mt-5 text-white">Lesson 1</h2>
                        <button className="mt-8 px-12 py-3 bg-white text-black rounded-lg font-semibold text-lg border border-transparent hover:bg-black hover:text-white hover:border-1 hover:border-white transition duration-500 cursor-pointer">
                          Continue learning
                        </button>
                    </>
                    ) : (
                    <>
                        <p className="text-2xl font-bold text-white mt-8">Create your roadmap.</p>
                        <p className="text-md text-white mt-5">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </p>
                        <button className="mt-8 px-12 py-3 bg-white text-black rounded-lg font-semibold text-lg border border-transparent hover:bg-black hover:text-white hover:border-1 hover:border-white transition duration-500 cursor-pointer">
                        Let's go
                        </button>
                    </>
                    )}
            </div>
        </div>
      </div>
    </main>
  );
}