"use client";

import { useState, useEffect, useRef } from "react";
import OnlineCompiler from "@/app/components/online-compiler";
import ChatBox from "@/app/components/ChatBox";

export default function AssessmentPage() {
  const [chatOpen, setChatOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Description");
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState("100vh");

  // Match the height of the parent container
  useEffect(() => {
    if (containerRef.current) {
      setContainerHeight(`${containerRef.current.offsetHeight}px`);
    }
  }, [chatOpen]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "Description":
        return <div className="text-white p-4">Add your description here.</div>;
      case "Code":
        return <OnlineCompiler />;
      default:
        return null;
    }
  };

  const tabs = ["Description", "Code"];

  return (
    <div
      ref={containerRef}
      className="w-full min-h-screen bg-black pt-12 px-8 relative flex transition-all duration-500"
    >
      <div
        className={`fixed left-0 top-24 z-50 w-64 border-r border-white bg-black text-white p-6 transform transition-transform duration-500 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ height: containerHeight }}
      >
        <div className="flex justify-between items-center mb-4">
          <button onClick={() => setMenuOpen(false)} className="text-white text-lg">
            ✕
          </button>
        </div>
        {/* E match pa sa roadmap */}
        <ul className="space-y-4">
          <li><button className="hover:text-gray-400">Home</button></li>
          <li><button className="hover:text-gray-400">Run Code</button></li>
          <li><button className="hover:text-gray-400">Settings</button></li>
        </ul>
      </div>

      <div className={`transition-all duration-500 ${chatOpen ? "w-2/3" : "w-full"} p-6`}>
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => setMenuOpen(true)}
            className="cursor-pointer rounded-lg border border-white bg-black px-4 py-2 text-lg font-semibold text-white transition duration-300 hover:bg-white hover:text-black"
          >
            ☰ Menu
          </button>

          <button
            onClick={() => setChatOpen(!chatOpen)}
            className="cursor-pointer rounded-lg border border-white bg-black px-6 py-2 text-lg font-semibold text-white transition duration-500 hover:border hover:bg-white hover:text-black"
          >
            {chatOpen ? "Close Buddy" : "Study Buddy"}
          </button>
        </div>

        <div className="border border-white rounded-md overflow-hidden w-full min-h-[400px] bg-black">
          <div className="flex border-b border-white">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 font-medium ${
                  activeTab === tab
                    ? "bg-black text-white"
                    : "bg-black text-gray-400"
                } border-r border-white last:border-r-0`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="p-4">{renderTabContent()}</div>
        </div>
      </div>

      {chatOpen && (
        <div className="w-1/3 h-screen border-l border-white">
          <ChatBox onClose={() => setChatOpen(false)} />
        </div>
      )}
    </div>
  );
}