'use client';

import Terminal from './terminal';

export default function Home() {
  return (
    <form>
      <div className="min-h-sm bg-gradient-to-br from-zinc-950 to-black p-8 text-white font-sans">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between border-b border-gray-700 pb-4">
          <h1 className="text-2xl font-bold tracking-wide">Activity (Roadmap)</h1>
          <button className="rounded-lg bg-white px-5 py-2 text-black font-medium transition hover:bg-gray-300 hover:scale-105">
            Study Buddy
          </button>
        </div>
        {/* Grid Layout */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Description Section */}
          <div className="rounded-xl bg-zinc-800 p-6 shadow-lg">
            <h2 className="mb-3 text-xl font-semibold text-white">Description</h2>
            <p className="text-gray-400 leading-relaxed text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent at bibendum dui.
              Donec commodo lobortis ex nec congue. Etiam ultricies purus ut pulvinar feugiat.
            </p>
          </div>

          {/* Terminal Section */}
          <div className="rounded-xl bg-zinc-900 p-6 shadow-md font-mono text-green-400 text-sm overflow-auto">
            <Terminal />
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8 text-right">
          <button
            type="submit"
            className="rounded-lg bg-white px-6 py-2 text-black font-medium transition hover:bg-gray-300 hover:scale-105"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}