import { Pencil } from "lucide-react";
import { Trash2 } from "lucide-react";

export default function TopicActions({ onEdit, onDelete }) {
  return (
    <div className="border-t pt-4 flex flex-col sm:flex-row gap-4">
      <button
        onClick={onEdit}
        className="flex gap-2 items-center justify-center rounded-3xl w-full py-1.5 text-white bg-primary hover:bg-secondary transition-all">
        <Pencil className="h-4 w-4"/>
        Edit
      </button>

      <button
        onClick={onDelete}
        className="flex gap-2 items-center justify-center rounded-3xl w-full py-1.5 text-white bg-destructive hover:bg-destructive-hover transition-all">
        <Trash2 className="h-4 w-4"/>
        Delete
      </button>
    </div>
  );
}