// src/components/Flashcard.jsx
import { useState } from "react";

export default function Flashcard({ term, definition, onReview }) {
  const [flipped, setFlipped] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(false);

  const handleFlip = () => {
    const nextFlipped = !flipped;
    setFlipped(nextFlipped);

    // if flipping to show definition and not reviewed earlier -> count it
    if (nextFlipped && !hasReviewed) {
      setHasReviewed(true);
      if (typeof onReview === "function") onReview();
    }
  };

  return (
    <div
      onClick={handleFlip}
      className="w-80 h-48 perspective cursor-pointer"
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 transform preserve-3d ${flipped ? "rotate-y-180" : ""
          }`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div className="absolute inset-0 flex items-center justify-center p-4 rounded-2xl bg-white border shadow backface-hidden">
          <div className="text-lg font-semibold">{term}</div>
        </div>

        {/* Back */}
        <div className="absolute inset-0 flex items-center justify-center p-4 rounded-2xl bg-blue-50 border shadow backface-hidden rotate-y-180">
          <div className="text-sm">{definition}</div>
        </div>
      </div>
    </div>
  );
}
