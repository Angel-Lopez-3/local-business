import { useState } from "react";
import { IconStar } from "./icons";

export default function StarRating({ value = 0, onChange, size = "h-5 w-5", readOnly = false }) {
  const [hover, setHover] = useState(0);
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="flex items-center gap-0.5">
      {stars.map((star) => {
        const filled = star <= (hover || value);
        return (
          <button
            key={star}
            type="button"
            disabled={readOnly}
            onClick={() => onChange?.(star)}
            onMouseEnter={() => !readOnly && setHover(star)}
            onMouseLeave={() => !readOnly && setHover(0)}
            className={readOnly ? "cursor-default" : "cursor-pointer"}
            aria-label={`${star} estrellas`}
          >
            <IconStar
              filled={filled}
              className={`${size} ${filled ? "text-amber-glow" : "text-ink-300"} transition-colors`}
            />
          </button>
        );
      })}
    </div>
  );
}
