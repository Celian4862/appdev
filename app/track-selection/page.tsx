"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { saveUserPreferences, checkOnboardingStatus } from "@/actions/preferences/server";

interface Track {
  id: number;
  name: string;
  description: string | null;
}

interface Topic {
  id: number;
  name: string;
  description: string | null;
}

export default function TrackFlow() {
  const [step, setStep] = useState(1);
  const [selectedTrack, setSelectedTrack] = useState<number | null>(null);
  const [selectedTopics, setSelectedTopics] = useState<number[]>([]);
  const [confidence, setConfidence] = useState<number[]>(Array(10).fill(0));
  const [tracks, setTracks] = useState<Track[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const { update } = useSession();

  // Load tracks and topics on component mount
  useEffect(() => {
    async function loadData() {
      try {
        console.log("🔍 Starting to load onboarding data via API...");
        
        const response = await fetch("/api/onboarding-data");
        console.log("� API response status:", response.status);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("📊 Received data:", data);
        
        if (data && typeof data === 'object') {
          console.log("🎯 Tracks count:", data.tracks?.length || 0);
          console.log("📝 Topics count:", data.topics?.length || 0);
          
          setTracks(data.tracks || []);
          setTopics(data.topics || []);
        } else {
          console.error("❌ Invalid data structure");
          setTracks([]);
          setTopics([]);
        }
      } catch (error) {
        console.error("❌ Failed to load onboarding data:", error);
        setTracks([]);
        setTopics([]);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleTrackSelect = (trackId: number) => setSelectedTrack(trackId);

  const handleTopicToggle = (topicId: number) => {
    setSelectedTopics((prev) =>
      prev.includes(topicId) ? prev.filter((t) => t !== topicId) : [...prev, topicId],
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
    if (step === 2 && selectedTopics.length === 0) {
      alert("Please select at least one topic.");
      return;
    }
    if (step === 3) {
      // Check if all confidence questions are answered (not 0)
      const unansweredQuestions = confidence.filter(score => score === 0).length;
      if (unansweredQuestions > 0) {
        alert(`Please answer all ${confidence.length} questions. You have ${unansweredQuestions} unanswered question(s).`);
        return;
      }
    }
    setStep(step + 1);
  };

  const handleBack = () => setStep(step - 1);

  const handleSubmit = async () => {
    // Validate all steps are completed
    if (selectedTrack === null) {
      alert("Please select a track.");
      return;
    }
    
    if (selectedTopics.length === 0) {
      alert("Please select at least one topic.");
      return;
    }

    // Check if all confidence questions are answered (not 0)
    const unansweredQuestions = confidence.filter(score => score === 0).length;
    if (unansweredQuestions > 0) {
      alert(`Please answer all ${confidence.length} questions. You have ${unansweredQuestions} unanswered question(s).`);
      return;
    }

    setSubmitting(true);
    try {
      console.log("💾 Saving user preferences via API...");
      
      const response = await fetch("/api/complete-onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          trackId: selectedTrack,
          topicIds: selectedTopics,
          confidence: confidence,
        }),
      });

      const result = await response.json();

      if (result.success) {
        console.log("✅ Preferences saved successfully, forcing session refresh...");
        
        // Force a session update to refresh the JWT token
        await update({ forceRefresh: true });
        
        console.log("🔄 Session updated, waiting a moment for middleware to process...");
        
        // Small delay to ensure session is fully updated
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        console.log("🎯 Redirecting to dashboard...");
        
        // Use router.replace for a clean navigation
        router.replace("/dashboard");
      } else {
        alert(result.error || "Failed to save preferences. Please try again.");
        setSubmitting(false);
      }
    } catch (error) {
      console.error("Error saving preferences:", error);
      alert("An error occurred. Please try again.");
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-black via-blue-900 to-cyan-400 text-white">
        <div className="text-center">
          <div className="mb-4 text-2xl font-semibold">Loading...</div>
          <div className="text-gray-300">Setting up your onboarding experience</div>
        </div>
      </div>
    );
  }

  // Show error state if no tracks or topics loaded
  if (!loading && tracks.length === 0 && topics.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-black via-blue-900 to-cyan-400 text-white">
        <div className="text-center max-w-md">
          <div className="mb-4 text-2xl font-semibold text-red-400">No Data Available</div>
          <div className="text-gray-300 mb-6">
            Unable to load tracks and topics. This might be because the database hasn't been seeded yet or there's a connection issue.
          </div>
          <div className="space-y-4">
            <button 
              onClick={() => window.location.reload()} 
              className="w-full rounded-md bg-white px-6 py-3 font-semibold text-black transition hover:bg-gray-200"
            >
              Refresh Page
            </button>
            <div className="text-sm text-gray-400">
              If this problem persists, please contact support or try running the database seed command.
            </div>
          </div>
        </div>
      </div>
    );
  }

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
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              {tracks.map((track) => (
                <button
                  key={track.id}
                  onClick={() => handleTrackSelect(track.id)}
                  className={`rounded-md border px-6 py-4 text-left font-semibold transition hover:bg-white hover:text-black ${
                    selectedTrack === track.id
                      ? "bg-white text-black"
                      : "bg-transparent"
                  }`}
                >
                  <div className="text-lg">{track.name}</div>
                  {track.description && (
                    <div className="mt-1 text-sm font-normal opacity-75">
                      {track.description}
                    </div>
                  )}
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
            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
              {topics.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => handleTopicToggle(topic.id)}
                  className={`rounded-md border px-6 py-4 text-left font-semibold transition hover:bg-white hover:text-black ${
                    selectedTopics.includes(topic.id)
                      ? "bg-white text-black"
                      : "bg-transparent"
                  }`}
                >
                  <div className="text-lg">{topic.name}</div>
                  {topic.description && (
                    <div className="mt-1 text-sm font-normal opacity-75">
                      {topic.description}
                    </div>
                  )}
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
              Please rate your confidence level for each area. All questions are required.
            </p>
            <div className="mt-6 flex flex-col gap-4">
              {confidence.map((val, i) => (
                <div key={i} className={`rounded-md border p-4 ${val === 0 ? 'border-red-400 bg-red-900/20' : 'border-white'}`}>
                  <p className="mb-2 flex items-center gap-2">
                    <span>Question {i + 1}</span>
                    {val === 0 && <span className="text-red-400 text-sm">* Required</span>}
                    {val > 0 && <span className="text-green-400 text-sm">✓ Answered</span>}
                  </p>
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
          <div className="flex flex-col items-end gap-2">
            {confidence.filter(score => score === 0).length > 0 && (
              <p className="text-red-400 text-sm">
                Please answer all questions before submitting
              </p>
            )}
            <button
              onClick={handleSubmit}
              disabled={submitting || confidence.filter(score => score === 0).length > 0}
              className="rounded-md bg-white px-6 py-2 font-semibold text-black transition hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "Saving & Verifying..." : "Complete Setup"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
