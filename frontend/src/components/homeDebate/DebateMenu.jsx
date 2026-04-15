import { MoreVertical, Bookmark, Flag } from "lucide-react";
import { useState } from "react";

export default function DebateMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="absolute top-4 right-4">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
      >
        <MoreVertical />
      </button>

      {open && (
        <div className="absolute right-0 top-8 mt-2 w-40 bg-white border rounded-lg shadow-lg">
          <button className="flex gap-2 p-3 w-full hover:bg-muted/50 items-center">
            <Bookmark className="w-4 h-4"/> Save
          </button>
          <button className="flex gap-2 p-3 w-full text-red-500 hover:bg-muted/50 items-center">
            <Flag className="w-4 h-4"/> Report
          </button>
        </div>
      )}
    </div>
  );
}