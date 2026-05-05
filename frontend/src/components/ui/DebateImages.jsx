import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function DebateImages({ images = [], onImageClick, type="home" }) {
  const [index, setIndex] = useState(0);

  if (!images || images.length === 0) return null;

  if (images.length === 1) {
    return (
      <img
        src={images[0]}
        className="w-full h-48 object-cover rounded-lg mb-4"
        onClick={() => onImageClick?.(0)} // Pass index 0
      />
    );
  }

  return (
    <div className="relative mb-4">
      <img
        src={images[index]}
        className={`w-full h-60 object-cover rounded-lg ${
          type === "thread" && "border border-border"
        }`}
        onClick={(e) => {
          e.stopPropagation();
          onImageClick?.(index);
        }}
      />

      <button
        onClick={(e) => {
          e.stopPropagation();
          setIndex(index === 0 ? images.length - 1 : index - 1);
        }}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
      >
        <ChevronLeft />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          setIndex(index === images.length - 1 ? 0 : index + 1);
        }}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
      >
        <ChevronRight />
      </button>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`w-2 h-2 rounded-full transition ${
              idx === index ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}