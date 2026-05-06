import { useEffect } from "react";
import { X } from "lucide-react";

export default function Toast({ message, onClose, duration = 3000 }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center justify-between gap-6 px-6 py-3 bg-foreground text-background rounded-xl shadow-lg min-w-75">
        <span>{message}</span>

        <button onClick={onClose}>
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
