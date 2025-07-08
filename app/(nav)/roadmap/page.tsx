"use client"
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function RoadmapPage() {
  // Replace with actual user data as needed
  const hasRoadmap = true;
  const [showDetails, setShowDetails] = useState([false, false, false]);

  return (
    <main className="p-32 px-8 bg-black w-full">
      <div className="mt-16 max-w-7xl mx-auto">
        <div className="relative rounded-lg shadow-md p-12 overflow-hidden min-h-[300px] border-2 border-white mt-6">
            <Image
                src="/roadmap_background.png"
                alt="Roadmap Background"
                fill
                style={{ objectFit: "cover", objectPosition: "center" }}
                className="z-0" // removed rounded-lg here
            />
            <div className="absolute inset-0 bg-black opacity-60"></div>
            <div className="relative z-10 flex flex-col items-start justify-center h-full w-full">
                {hasRoadmap ? (
                    <>
                         <div className="w-full flex items-center mb-6">
                            <div className="flex-1 h-3 bg-white/30 rounded-full overflow-hidden">
                                <div
                                className="h-full bg-blue-600 rounded-full transition-all"
                                style={{ width: "40%" }} // Set progress percentage here
                                ></div>
                            </div>
                            <span className="ml-4 text-white font-semibold">40%</span>
                        </div>
                        <p className="text-md text-white">Track</p>
                        {/* Replace below with actual roadmap content */}
                        <h2 className="text-3xl font-bold mt-5 text-white">Track Name</h2>
                        <button className="mt-8 px-12 py-3 bg-white text-black rounded-lg font-semibold text-lg border border-transparent hover:bg-black hover:text-white hover:border-1 hover:border-white transition duration-500 cursor-pointer">
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
                            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-md">
                                <Image
                                src="/icons/time_icon.png"
                                alt="icon"
                                width={16}
                                height={16}
                                />
                                <p>14 days</p>
                            </div>
                            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-md">
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
                        <p className="text-2xl font-bold text-white mt-8">Create your roadmap.</p>
                        <p className="text-md text-white mt-5">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </p>
                        <button className="mt-8 px-12 py-3 bg-white text-black rounded-lg font-semibold text-lg hover:bg-blue-700 transition">
                        Let's go
                        </button>
                    </>
                    )}
            </div>
        </div>
      </div>
      {hasRoadmap ? (
        <>
          {/* ...existing roadmap content... */}
          <div className="max-w-7xl mx-auto">
            <h4 className="text-2xl font-bold mt-10 text-white">Description</h4>
            <p className="text-md text-white mt-5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec vehicula enim. Pellentesque varius est tellus, ac ultrices nulla consequat eu. Aliquam erat volutpat. Etiam rhoncus ullamcorper dictum. Sed eget ex arcu. Aenean aliquet mi et erat molestie blandit. Duis et diam sed ex rutrum faucibus. Nulla eget urna id libero finibus tempus. Integer imperdiet tincidunt dui eget placerat. Cras vel mauris ornare libero sodales blandit. Donec aliquet, ipsum ut elementum tincidunt, sapien orci scelerisque tellus, ac dapibus nisl ante ac nulla. Sed sed dapibus sapien.
            </p>
            <div className="relative rounded-lg shadow-md p-12 overflow-hidden min-h-[300px] border-2 border-white mt-10">
              {/* You can add content here */}
              <div className="flex items-center gap-3">
                <Image
                  src="/icons/phase1_icon.png"
                  alt="icon"
                  width={24}
                  height={24}
                />
                <p className="text-white text-xl">Phase 1</p>
                <div className="flex-1"></div> {/* pushes the next items to the right */}
                <div className="flex items-center gap-2">
                  <div className="w-84 h-3 bg-white/30 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full transition-all"
                      style={{ width: "40%" }} // Set progress percentage here
                    ></div>
                  </div>
                  <span className="ml-4 text-white font-semibold">40%</span>
                </div>
              </div>
              <p className="text-white text-md mt-5">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec vehicula enim. Pellentesque varius est tellus, ac ultrices nulla consequat eu. Aliquam erat volutpat. Etiam rhoncus ullamcorper dictum. Sed eget ex arcu. Aenean aliquet mi et erat molestie blandit. Duis et diam sed ex rutrum faucibus. Nulla eget urna id libero finibus tempus. Integer imperdiet tincidunt dui eget placerat. Cras vel mauris ornare libero sodales blandit. Donec aliquet, ipsum ut elementum tincidunt, sapien orci scelerisque tellus, ac dapibus nisl ante ac nulla. Sed sed dapibus sapien.
              </p>
              <hr className="my-8 border-t-3 border-white/40" />
              <div>
                <button
                  type="button"
                  className="inline-flex items-center pb-2 gap-2 border-b border-transparent focus:outline-none cursor-pointer"
                  onClick={() => setShowDetails((prev) =>
                    prev.map((val, i) => (i === 0 ? !val : val))
                  )
                }
                >
                  <p className="text-white text-md">Show Chapter Details</p>
                  <Image
                    src={
                      showDetails[0]
                        ? "/icons/arrow_up_icon.png"
                        : "/icons/arrow_down_icon.png"
                    }
                    alt="icon"
                    width={24}
                    height={24}
                  />
                </button>
                {showDetails[0] && (
                  <div className="flex flex-col gap-4 mt-4">
                    <Link href="/" className="flex items-center gap-3">
                      <Image
                        src="/icons/activity_icon.png"
                        alt="icon"
                        width={20}
                        height={20}
                      />
                      <p>Activity 1</p>
                    </Link>
                    <Link href="/" className="flex items-center gap-3">
                      <Image
                        src="/icons/activity_icon.png"
                        alt="icon"
                        width={20}
                        height={20}
                      />
                      <p>Activity 2</p>
                    </Link>
                    <Link href="/" className="flex items-center gap-3">
                      <Image
                        src="/icons/activity_icon.png"
                        alt="icon"
                        width={20}
                        height={20}
                      />
                      <p>Activity 3</p>
                    </Link>
                    <Link href="/" className="flex items-center gap-3">
                      <Image
                        src="/icons/assessment_icon.png"
                        alt="icon"
                        width={20}
                        height={20}
                      />
                      <p>Assessment</p>
                    </Link>
                  </div>
                )}
              </div>
            </div>

            <div className="relative rounded-lg shadow-md p-12 overflow-hidden min-h-[300px] border-2 border-white mt-10">
              {/* You can add content here */}
              <div className="flex items-center gap-3">
                <Image
                  src="/icons/phase1_icon.png"
                  alt="icon"
                  width={24}
                  height={24}
                />
                <p className="text-white text-xl">Phase 2</p>
                <div className="flex-1"></div> {/* pushes the next items to the right */}
                <div className="flex items-center gap-2">
                  <div className="w-84 h-3 bg-white/30 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full transition-all"
                      style={{ width: "40%" }} // Set progress percentage here
                    ></div>
                  </div>
                  <span className="ml-4 text-white font-semibold">40%</span>
                </div>
              </div>
              <p className="text-white text-md mt-5">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec vehicula enim. Pellentesque varius est tellus, ac ultrices nulla consequat eu. Aliquam erat volutpat. Etiam rhoncus ullamcorper dictum. Sed eget ex arcu. Aenean aliquet mi et erat molestie blandit. Duis et diam sed ex rutrum faucibus. Nulla eget urna id libero finibus tempus. Integer imperdiet tincidunt dui eget placerat. Cras vel mauris ornare libero sodales blandit. Donec aliquet, ipsum ut elementum tincidunt, sapien orci scelerisque tellus, ac dapibus nisl ante ac nulla. Sed sed dapibus sapien.
              </p>
              <hr className="my-8 border-t-3 border-white/40" />
              <div>
                <button
                  type="button"
                  className="inline-flex items-center pb-2 gap-2 border-b border-transparent focus:outline-none cursor-pointer"
                  onClick={() => setShowDetails((prev) =>
                    prev.map((val, i) => (i === 1 ? !val : val))
                  )
                }
                >
                  <p className="text-white text-md">Show Chapter Details</p>
                  <Image
                    src={
                      showDetails[1]
                        ? "/icons/arrow_up_icon.png"
                        : "/icons/arrow_down_icon.png"
                    }
                    alt="icon"
                    width={24}
                    height={24}
                  />
                </button>
                {showDetails[1] && (
                  <div className="flex flex-col gap-4 mt-4">
                    <Link href="/" className="flex items-center gap-3">
                      <Image
                        src="/icons/activity_icon.png"
                        alt="icon"
                        width={20}
                        height={20}
                      />
                      <p>Activity 1</p>
                    </Link>
                    <Link href="/" className="flex items-center gap-3">
                      <Image
                        src="/icons/activity_icon.png"
                        alt="icon"
                        width={20}
                        height={20}
                      />
                      <p>Activity 2</p>
                    </Link>
                    <Link href="/" className="flex items-center gap-3">
                      <Image
                        src="/icons/activity_icon.png"
                        alt="icon"
                        width={20}
                        height={20}
                      />
                      <p>Activity 3</p>
                    </Link>
                    <Link href="/" className="flex items-center gap-3">
                      <Image
                        src="/icons/assessment_icon.png"
                        alt="icon"
                        width={20}
                        height={20}
                      />
                      <p>Assessment</p>
                    </Link>
                  </div>
                )}
              </div>
            </div>

            <div className="relative rounded-lg shadow-md p-12 overflow-hidden min-h-[300px] border-2 border-white mt-10">
              {/* You can add content here */}
              <div className="flex items-center gap-3">
                <Image
                  src="/icons/phase1_icon.png"
                  alt="icon"
                  width={24}
                  height={24}
                />
                <p className="text-white text-xl">Phase 3</p>
                <div className="flex-1"></div> {/* pushes the next items to the right */}
                <div className="flex items-center gap-2">
                  <div className="w-84 h-3 bg-white/30 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full transition-all"
                      style={{ width: "40%" }} // Set progress percentage here
                    ></div>
                  </div>
                  <span className="ml-4 text-white font-semibold">40%</span>
                </div>
              </div>
              <p className="text-white text-md mt-5">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec vehicula enim. Pellentesque varius est tellus, ac ultrices nulla consequat eu. Aliquam erat volutpat. Etiam rhoncus ullamcorper dictum. Sed eget ex arcu. Aenean aliquet mi et erat molestie blandit. Duis et diam sed ex rutrum faucibus. Nulla eget urna id libero finibus tempus. Integer imperdiet tincidunt dui eget placerat. Cras vel mauris ornare libero sodales blandit. Donec aliquet, ipsum ut elementum tincidunt, sapien orci scelerisque tellus, ac dapibus nisl ante ac nulla. Sed sed dapibus sapien.
              </p>
              <hr className="my-8 border-t-3 border-white/40" />
              <div>
                <button
                  type="button"
                  className="inline-flex items-center pb-2 gap-2 border-b border-transparent focus:outline-none cursor-pointer"
                  onClick={() => 
                    setShowDetails((prev) =>
                      prev.map((val, i) => (i === 2 ? !val : val))
                    )
                  }
                >
                  <p className="text-white text-md">Show Chapter Details</p>
                  <Image
                    src={
                      showDetails[2]
                        ? "/icons/arrow_up_icon.png"
                        : "/icons/arrow_down_icon.png"
                    }
                    alt="icon"
                    width={24}
                    height={24}
                  />
                </button>
                {showDetails[2] && (
                  <div className="flex flex-col gap-4 mt-4">
                    <Link href="/" className="flex items-center gap-3">
                      <Image
                        src="/icons/activity_icon.png"
                        alt="icon"
                        width={20}
                        height={20}
                      />
                      <p>Activity 1</p>
                    </Link>
                    <Link href="/" className="flex items-center gap-3">
                      <Image
                        src="/icons/activity_icon.png"
                        alt="icon"
                        width={20}
                        height={20}
                      />
                      <p>Activity 2</p>
                    </Link>
                    <Link href="/" className="flex items-center gap-3">
                      <Image
                        src="/icons/activity_icon.png"
                        alt="icon"
                        width={20}
                        height={20}
                      />
                      <p>Activity 3</p>
                    </Link>
                    <Link href="/" className="flex items-center gap-3">
                      <Image
                        src="/icons/assessment_icon.png"
                        alt="icon"
                        width={20}
                        height={20}
                      />
                      <p>Assessment</p>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* ...content for users without a roadmap... */}
        </>
      )}
    </main>
  );
}