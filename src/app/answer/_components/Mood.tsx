"use client";

import { MoodSelect } from "@/types/answer";
import { useState } from "react";

const moodToUnicode: Record<string, string> = {
  EXCITED: "\u{1F60D}",
  HAPPY: "\u{1F604}",
  ANGRY: "\u{1F621}",
  SAD: "\u{1F62D}",
  NEUTRAL: "\u{1F610}",
};

export default function Mood({ mood, onMoodSelect }: MoodSelect) {
  const [showSelect, setShowSelect] = useState(false);
  const emoji = (mood && moodToUnicode[mood]) || "\u2753";

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
    <div className="w-full flex flex-col items-center justify-start p-2 mt-5 mb-1 text-xl relative">
      <span onClick={handleEmojiClick} className="cursor-pointer">
        {emoji}
      </span>

      {showSelect && (
        <div className="absolute left-1/2 -translate-x-1/2 mt-7 z-10 bg-white rounded shadow-lg p-2">
          <div className="flex items-center justify-center gap-2">
            {Object.keys(moodToUnicode).map((moodKey) => (
              <button
                key={moodKey}
                className="cursor-pointer text-2xl"
                onClick={() => handleMoodSelect(moodKey)}
              >
                {moodToUnicode[moodKey]}
              </button>
            ))}
          </div>
        </div>
      )}
      <div />
    </div>
  );
}
