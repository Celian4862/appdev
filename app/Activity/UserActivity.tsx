"use client";
import { useState } from "react";

export default function Home() {
  const [code, setCode] = useState("");
  const [terminal, setTerminal] = useState("");

  const handleRun = () => {
    setTerminal("Simulated run output...\n");
  };

  const handleSubmit = () => {
    alert("Submitted!");
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold">Activity (Roadmap)</h1>
        <button className="bg-white text-black px-4 py-1 rounded-md hover:bg-gray-200">
          Study Buddy
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">

        <div className="bg-zinc-900 p-6 rounded-lg h-full">
          <h2 className="text-xl font-bold mb-2">Description</h2>
          <p className="text-gray-400 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent at
            bibendum dui. Donec commodo lobortis ex nec congue. Etiam ultricies
            purus ut pulvinar feugiat.
          </p>
        </div>

        <div className="flex flex-col h-full">

          <div className="bg-zinc-900 rounded-t-lg px-4 py-2 flex items-center justify-between">
            <span className="text-sm text-gray-400">make.c</span>
            <button
              className="bg-white text-black text-sm px-3 py-1 rounded-md hover:bg-gray-200"
              onClick={handleRun}
            >
              Run
            </button>
          </div>
          <textarea
            className="bg-black text-sm font-mono text-white p-4 h-52 resize-none outline-none border-t border-gray-700"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="// Write your code here"
          />

          <div className="bg-zinc-900 px-4 py-2 rounded-b-lg h-28 overflow-auto">
            <pre className="text-green-400 text-sm whitespace-pre-wrap">{terminal}</pre>
          </div>
        </div>
      </div>

      <div className="mt-4 text-right">
        <button
          onClick={handleSubmit}
          className="bg-white text-black px-6 py-2 rounded-md hover:bg-gray-200"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
