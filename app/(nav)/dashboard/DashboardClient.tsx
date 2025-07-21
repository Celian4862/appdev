"use client";

import Link from "next/link";
import Image from "next/image";
import ChatBox from "@/app/components/ChatBox";
import { useState } from "react";

interface DashboardClientProps {
  userName: string;
  hasRoadmap: boolean;
}

export default function DashboardClient({ userName, hasRoadmap }: DashboardClientProps) {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="w-full min-h-screen bg-black pt-24 px-8 relative flex transition-all duration-500">
      <div className={`transition-all duration-500 ${chatOpen ? "w-2/3" : "w-full"} p-10`}>
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-4xl font-bold text-white">Hi, {userName}!</h1>
          <button
            onClick={() => setChatOpen(!chatOpen)}
            className="cursor-pointer rounded-lg border border-white bg-black px-6 py-2 text-lg font-semibold text-white transition duration-500 hover:border hover:bg-white hover:text-black"
          >
            Study Buddy
          </button>
        </div>

        <Link href="/roadmap" className="mb-4 text-lg">
          <span className="inline-flex items-center gap-2 border-b-3 border-transparent pb-2 hover:border-b-3 hover:border-white">
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

        <div className="relative mt-6 min-h-[300px] overflow-hidden rounded-lg border-2 border-white p-8 shadow-md">
          <Image
            src="/roadmap_background.png"
            alt="Roadmap Background"
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            className="z-0"
          />
          <div className="absolute inset-0 bg-black opacity-60"></div>
          <div className="relative m-8 flex h-full w-full flex-col items-start justify-center">
            {hasRoadmap ? (
              <>
                <p className="text-md text-white">Phase 1</p>
                <h2 className="mt-5 text-3xl font-bold text-white">Lesson 1</h2>
                <button className="mt-8 cursor-pointer rounded-lg border border-transparent bg-white px-12 py-3 text-lg font-semibold text-black transition duration-500 hover:border-1 hover:border-white hover:bg-black hover:text-white">
                  Continue learning
                </button>
              </>
            ) : (
              <>
                <p className="mt-8 text-2xl font-bold text-white">
                  Create your roadmap.
                </p>
                <p className="text-md mt-5 text-white">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
                <button className="mt-8 cursor-pointer rounded-lg border border-transparent bg-white px-12 py-3 text-lg font-semibold text-black transition duration-500 hover:border-1 hover:border-white hover:bg-black hover:text-white">
                  Let&apos;s go
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      {/* Chat box container */}
      {chatOpen && (
        <div className="w-1/3 h-screen border-l border-white">
          <ChatBox onClose={() => setChatOpen(false)} />
        </div>
      )}
    </div>
  );
}
