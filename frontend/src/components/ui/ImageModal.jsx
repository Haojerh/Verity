import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function ImageModal({
  images = [],
  index,
  setIndex,
  onClose
}) {
  if (!images || images.length === 0 || index === null) return null;

  const prev = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const next = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div
      className="fixed inset-0 bg-black/95 z-100 flex items-center justify-center"
      onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClose();
        }}
    >
      {/* Close button */}
      <button
        onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClose();
        }}
        className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Navigation */}
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-colors"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-colors"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </>
      )}

      {/* Image */}
      <img
        src={images[index]}
        alt={`Fullscreen ${index + 1}`}
        className="max-w-[90vw] max-h-[90vh] object-contain"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}