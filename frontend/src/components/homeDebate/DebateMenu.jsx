import { MoreVertical, Bookmark, Flag, LucideShare } from "lucide-react";
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
        <div className="absolute right-0 top-8 mt-2 w-40 bg-background border rounded-lg shadow-lg dark:shadow-dark-lg">
          <button className="flex gap-2 p-3 w-full hover:bg-muted/50 items-center">
            <Bookmark className="w-4 h-4"/> Save
          </button>
          <button className="flex gap-2 p-3 w-full hover:bg-muted/50 items-center">
            <LucideShare className="w-4 h-4"/> Share
          </button>
          <button className="flex gap-2 p-3 w-full text-destructive hover:bg-muted/50 items-center">
            <Flag className="w-4 h-4"/> Report
          </button>
        </div>
      )}
    </div>
  );
}