"use client";

import { useState } from "react";

export default function TrackFlow() {
  const [step, setStep] = useState(1);
  const [selectedTrack, setSelectedTrack] = useState<number | null>(null);
  const [selectedTopics, setSelectedTopics] = useState<number[]>([]);
  const [confidence, setConfidence] = useState<number[]>(Array(10).fill(0));

  const tracks = [1, 2, 3, 4];
  const topics = [1, 2, 3, 4, 5, 6, 7, 8];

  const handleTrackSelect = (track: number) => setSelectedTrack(track);

  const handleTopicToggle = (topic: number) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic],
    );
  };

  const handleConfidenceChange = (index: number, value: number) => {
    const updated = [...confidence];
    updated[index] = value;
    setConfidence(updated);
  };

  const handleNext = () => {
    if (step === 1 && selectedTrack === null) {
      alert("Please select a track.");
      return;
    }
    setStep(step + 1);
  };

  const handleBack = () => setStep(step - 1);

  const handleSubmit = () => {
    console.log("Track:", selectedTrack);
    console.log("Topics:", selectedTopics);
    console.log("Confidence:", confidence);
    // Future: send to backend or redirect
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-black via-blue-900 to-cyan-400 px-8 py-16 text-white">
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center gap-6">
        {step === 1 && (
          <>
            <p className="text-3xl font-semibold">1/3</p>
            <h1 className="text-5xl font-bold">Choose your track.</h1>
            <p className="text-gray-300">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
              {tracks.map((num) => (
                <button
                  key={num}
                  onClick={() => handleTrackSelect(num)}
                  className={`rounded-md border px-6 py-3 text-lg font-semibold transition hover:bg-white hover:text-black ${
                    selectedTrack === num
                      ? "bg-white text-black"
                      : "bg-transparent"
                  }`}
                >
                  Track {num}
                </button>
              ))}
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <p className="text-3xl font-semibold">2/3</p>
            <h1 className="text-5xl font-bold">
              Select your topics of interest.
            </h1>
            <p className="text-gray-300">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
              {topics.map((topic) => (
                <button
                  key={topic}
                  onClick={() => handleTopicToggle(topic)}
                  className={`rounded-md border px-6 py-3 text-lg font-semibold transition hover:bg-white hover:text-black ${
                    selectedTopics.includes(topic)
                      ? "bg-white text-black"
                      : "bg-transparent"
                  }`}
                >
                  Topic {topic}
                </button>
              ))}
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <p className="text-3xl font-semibold">3/3</p>
            <h1 className="text-5xl font-bold">How confident are you in...</h1>
            <p className="text-gray-300">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <div className="mt-6 flex flex-col gap-4">
              {confidence.map((val, i) => (
                <div key={i} className="rounded-md border p-4">
                  <p className="mb-2">Question {i + 1}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Not confident</span>
                    <div className="flex gap-4">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <label key={num} className="flex flex-col items-center">
                          <button
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
                        </label>
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
