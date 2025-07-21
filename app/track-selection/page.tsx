"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function TrackSelectionPage() {
  const [step, setStep] = useState(1);
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
  const [currentTopics, setCurrentTopics] = useState<string[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<number[]>([]);
  const [confidence, setConfidence] = useState<number[]>([]);
  const router = useRouter();

  const topicsByTrack: Record<string, string[]> = {
    "Computer Science": [
      "Data Structures",
      "Algorithms",
      "Operating Systems",
      "Computer Architecture",
      "Theory of Computation",
      "Artificial Intelligence",
      "Machine Learning",
      "Software Engineering",
    ],
    "Information Technology": [
      "Network Administration",
      "Cybersecurity Basics",
      "System Integration",
      "Cloud Platforms",
      "IT Project Management",
      "Database Systems",
      "Web Technologies",
      "Technical Support",
    ],
    "Information Science": [
      "Data Management",
      "Human-Computer Interaction",
      "Information Retrieval",
      "UX Research",
      "Knowledge Organization",
      "Digital Libraries",
      "Data Analytics",
      "Metadata Standards",
    ],
    "Computer Engineering": [
      "Digital Logic Design",
      "Embedded Systems",
      "Computer Networks",
      "VLSI Design",
      "Microprocessors",
      "Control Systems",
      "Real-Time Systems",
      "Computer Organization",
    ],
  };

  useEffect(() => {
    localStorage.removeItem("studyPrefs");
  }, []);

  const handleTrackSelect = (track: string) => {
    setSelectedTrack(track);
    setCurrentTopics(topicsByTrack[track]);
    setSelectedTopics([]);
    setConfidence(Array(8).fill(0));
  };

  const handleTopicToggle = (index: number) => {
    setSelectedTopics((prev) =>
      prev.includes(index) ? prev.filter((t) => t !== index) : [...prev, index],
    );
  };

  const handleConfidenceChange = (index: number, value: number) => {
    const updated = [...confidence];
    updated[index] = value;
    setConfidence(updated);
  };

  const handleNext = () => {
    if (step === 1 && !selectedTrack) {
      alert("Please select a track.");
      return;
    }
    if (step === 2 && selectedTopics.length === 0) {
      alert("Please select at least one topic.");
      return;
    }
    setConfidence(Array(selectedTopics.length).fill(0));
    setStep(step + 1);
  };

  const handleBack = () => setStep(step - 1);

  const handleSubmit = () => {
    if (confidence.includes(0)) {
      alert("Please answer all confidence questions before submitting.");
      return;
    }

    const userData = {
      track: selectedTrack,
      topics: selectedTopics.map((i) => currentTopics[i]),
      confidence: confidence,
    };

    localStorage.setItem("studyPrefs", JSON.stringify(userData));
    router.push("/study-scheduler");
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-black via-blue-900 to-cyan-400 px-8 py-16 text-white">
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center gap-6">
        {/* Step 1 - Track Selection */}
        {step === 1 && (
          <>
            <p className="text-3xl font-semibold">1/3</p>
            <h1 className="text-5xl font-bold">Choose your track.</h1>
            <p className="text-gray-300">
              Pick the track you&apos;re focused on.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
              {Object.keys(topicsByTrack).map((track) => (
                <button
                  key={track}
                  onClick={() => handleTrackSelect(track)}
                  className={`rounded-md border px-6 py-3 text-lg font-semibold transition hover:bg-white hover:text-black ${
                    selectedTrack === track
                      ? "bg-white text-black"
                      : "bg-transparent"
                  }`}
                >
                  {track}
                </button>
              ))}
            </div>
          </>
        )}

        {/* Step 2 - Topic Selection */}
        {step === 2 && (
          <>
            <p className="text-3xl font-semibold">2/3</p>
            <h1 className="text-5xl font-bold">Select your topics.</h1>
            <p className="text-gray-300">Choose all that apply.</p>
            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
              {currentTopics.map((topic, index) => (
                <button
                  key={index}
                  onClick={() => handleTopicToggle(index)}
                  className={`rounded-md border px-6 py-3 text-lg font-semibold transition hover:bg-white hover:text-black ${
                    selectedTopics.includes(index)
                      ? "bg-white text-black"
                      : "bg-transparent"
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>
          </>
        )}

        {/* Step 3 - Confidence Rating */}
        {step === 3 && (
          <>
            <p className="text-3xl font-semibold">3/3</p>
            <h1 className="text-5xl font-bold">Rate your confidence</h1>
            <p className="text-gray-300">
              How confident are you in the selected topics?
            </p>
            <div className="mt-6 flex flex-col gap-4">
              {selectedTopics.map((topicIndex, i) => (
                <div key={i} className="rounded-md border p-4">
                  <p className="mb-2">{currentTopics[topicIndex]}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Not confident</span>
                    <div className="flex gap-4">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => handleConfidenceChange(i, num)}
                          className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold transition-all duration-200 ${
                            confidence[i] === num
                              ? "scale-110 border-white bg-white text-black shadow-md"
                              : "border-white bg-transparent text-white hover:scale-105"
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                    <span className="text-sm">Very Confident</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Navigation buttons */}
      <div className="mt-12 flex justify-between">
        {step > 1 ? (
          <button
            onClick={handleBack}
            className="rounded-md bg-white px-6 py-2 font-semibold text-black transition hover:bg-gray-200"
          >
            Back
          </button>
        ) : (
          <div />
        )}

        {step < 3 ? (
          <button
            onClick={handleNext}
            className="rounded-md bg-white px-6 py-2 font-semibold text-black transition hover:bg-gray-200"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="rounded-md bg-white px-6 py-2 font-semibold text-black transition hover:bg-gray-200"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
}
