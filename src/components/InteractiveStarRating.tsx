"use client";

import { useState } from "react";
import { Star } from "lucide-react";

const InteractiveStarRating = ({
  onRate,
}: {
  onRate: (rating: number) => void;
}) => {
  const [hovered, setHovered] = useState(0);
  const [selected, setSelected] = useState(0);

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star, index) => {
        const isActive = star <= (hovered || selected);

        return (
          <button
            key={star}
            onClick={() => {
              setSelected(star);
              onRate(star);
            }}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            type="button"
            className="p-1"
          >
            <Star
              size={24}
              fill={isActive ? "currentColor" : "none"}
              stroke="currentColor"
              className={`${isActive ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} size-8 transition-colors`}
            />
          </button>
        );
      })}
    </div>
  );
};

export default InteractiveStarRating;
