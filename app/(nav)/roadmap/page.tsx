import Image from "next/image";
import { useState } from "react";
import ShowDetails from "./ui/client/ShowDetails";

export default function RoadmapPage() {
  // Replace with actual user data as needed
  const hasRoadmap = true;
  const [showDetails, setShowDetails] = useState([false, false, false]);

  return (
    <main className="w-full bg-black p-32 px-8">
      <div className="mx-auto mt-16 max-w-7xl">
        <div className="relative mt-6 min-h-[300px] overflow-hidden rounded-lg border-2 border-white p-12 shadow-md">
          <Image
            src="/roadmap_background.png"
            alt="Roadmap Background"
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            className="z-0" // removed rounded-lg here
          />
          <div className="absolute inset-0 bg-black opacity-60"></div>
          <div className="relative z-10 flex h-full w-full flex-col items-start justify-center">
            {hasRoadmap ? (
              <>
                <div className="mb-6 flex w-full items-center">
                  <div className="h-3 flex-1 overflow-hidden rounded-full bg-white/30">
                    <div
                      className="h-full rounded-full bg-blue-600 transition-all"
                      style={{ width: "40%" }} // Set progress percentage here
                    ></div>
                  </div>
                  <span className="ml-4 font-semibold text-white">40%</span>
                </div>
                <p className="text-md text-white">Track</p>
                {/* Replace below with actual roadmap content */}
                <h2 className="mt-5 text-3xl font-bold text-white">
                  Track Name
                </h2>
                <button className="mt-8 cursor-pointer rounded-lg border border-transparent bg-white px-12 py-3 text-lg font-semibold text-black transition duration-500 hover:border-1 hover:border-white hover:bg-black hover:text-white">
                  Continue learning
                </button>
                <div className="mt-6 flex flex-row items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/icons/bar_icon.png"
                      alt="icon"
                      width={16}
                      height={16}
                    />
                    <p>Beginner</p>
                  </div>
                  <div className="flex items-center gap-2 rounded-md bg-white/20 px-4 py-2">
                    <Image
                      src="/icons/time_icon.png"
                      alt="icon"
                      width={16}
                      height={16}
                    />
                    <p>14 days</p>
                  </div>
                  <div className="flex items-center gap-2 rounded-md bg-white/20 px-4 py-2">
                    <Image
                      src="/icons/activity_icon.png"
                      alt="icon"
                      width={16}
                      height={16}
                    />
                    <p>12 Activities</p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <p className="mt-8 text-2xl font-bold text-white">
                  Create your roadmap.
                </p>
                <p className="text-md mt-5 text-white">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
                <button className="mt-8 rounded-lg bg-white px-12 py-3 text-lg font-semibold text-black transition hover:bg-blue-700">
                  Let&apos;s go
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      {hasRoadmap ? (
        <>
          {/* ...existing roadmap content... */}
          <div className="mx-auto max-w-7xl">
            <h4 className="mt-10 text-2xl font-bold text-white">Description</h4>
            <p className="text-md mt-5 text-white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              nec vehicula enim. Pellentesque varius est tellus, ac ultrices
              nulla consequat eu. Aliquam erat volutpat. Etiam rhoncus
              ullamcorper dictum. Sed eget ex arcu. Aenean aliquet mi et erat
              molestie blandit. Duis et diam sed ex rutrum faucibus. Nulla eget
              urna id libero finibus tempus. Integer imperdiet tincidunt dui
              eget placerat. Cras vel mauris ornare libero sodales blandit.
              Donec aliquet, ipsum ut elementum tincidunt, sapien orci
              scelerisque tellus, ac dapibus nisl ante ac nulla. Sed sed dapibus
              sapien.
            </p>
            {["Phase 1", "Phase 2", "Phase 3"].map((phase, index) => (
              <div
                key={index}
                className="relative mt-10 min-h-[300px] overflow-hidden rounded-lg border-2 border-white p-12 shadow-md"
              >
                {/* You can add content here */}
                <div className="flex items-center gap-3">
                  <Image
                    src="/icons/phase1_icon.png"
                    alt="icon"
                    width={24}
                    height={24}
                  />
                  <p className="text-xl text-white">{phase}</p>
                  <div className="flex-1"></div>{" "}
                  {/* pushes the next items to the right */}
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-84 overflow-hidden rounded-full bg-white/30">
                      <div
                        className="h-full rounded-full bg-blue-600 transition-all"
                        style={{ width: "40%" }} // Set progress percentage here
                      ></div>
                    </div>
                    <span className="ml-4 font-semibold text-white">40%</span>
                  </div>
                </div>
                <p className="text-md mt-5 text-white">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Integer nec vehicula enim. Pellentesque varius est tellus, ac
                  ultrices nulla consequat eu. Aliquam erat volutpat. Etiam
                  rhoncus ullamcorper dictum. Sed eget ex arcu. Aenean aliquet
                  mi et erat molestie blandit. Duis et diam sed ex rutrum
                  faucibus. Nulla eget urna id libero finibus tempus. Integer
                  imperdiet tincidunt dui eget placerat. Cras vel mauris ornare
                  libero sodales blandit. Donec aliquet, ipsum ut elementum
                  tincidunt, sapien orci scelerisque tellus, ac dapibus nisl
                  ante ac nulla. Sed sed dapibus sapien.
                </p>
                <hr className="my-8 border-t-3 border-white/40" />
                <ShowDetails index={index} />
              </div>
            ))}
          </div>
        </>
      ) : (
        <>{/* ...content for users without a roadmap... */}</>
      )}
    </main>
  );
}
