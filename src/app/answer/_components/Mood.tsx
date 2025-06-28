"use client";

import { MoodSelect } from "@/types/answer";
import { useState } from "react";
import Image from "next/image";

const modeImogiPath: Record<string, string> = {
  EXCITED: "excited_imogi",
  HAPPY: "happy_imogi",
  ANGRY: "angry_imogi",
  SAD: "sad_imogi",
  NEUTRAL: "neutral_imogi",
};

export default function Mood({ mood, onMoodSelect }: MoodSelect) {
  const [showSelect, setShowSelect] = useState(false);

  const handleEmojiClick = () => {
    setShowSelect(!showSelect);
  };

  const handleMoodSelect = (selectedMood: string) => {
    if (onMoodSelect) {
      onMoodSelect(selectedMood);
    }
    setShowSelect(false);
  };

  return (
    <div className="relative flex flex-col items-center justify-start w-full p-2 mt-5 mb-1 text-2xl">
      <span onClick={handleEmojiClick} className="cursor-pointer">
        {mood ? (
          <Image
            src={`/image/imogi/${modeImogiPath[mood]}.png`}
            alt={mood}
            width={50}
            height={50}
          />
        ) : (
          <div className="flex items-center justify-center w-12 h-12 text-2xl bg-gray-200 rounded-full">
            ?
          </div>
        )}
      </span>

      {showSelect && (
        <div className="absolute z-10 flex flex-col items-center justify-center w-full p-4 mt-16 -translate-x-1/2 shadow-lg left-1/2 bg-yellow-50 rounded-xl">
          <span className="py-2 text-base font-bold">오늘의 기분은?</span>
          <div className="flex flex-wrap items-center justify-center max-w-xs gap-4">
            {Object.keys(modeImogiPath).map((moodKey) => (
              <button
                key={moodKey}
                className="p-2 transition-colors rounded-lg cursor-pointer hover:bg-yellow-100"
                onClick={() => handleMoodSelect(moodKey)}
              >
                <Image
                  src={`/image/imogi/${modeImogiPath[moodKey]}.png`}
                  alt={moodKey}
                  width={60}
                  height={60}
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
