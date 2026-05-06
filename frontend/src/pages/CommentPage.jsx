import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Flag } from "lucide-react";
import Avatar from "../components/ui/Avatar";
import { useAuth } from "../context/AuthContext";
import TakedownModal from "../components/debate/TakedownModal";

export default function CommentPage() {
  const { id } = useParams();
  const { user } = useAuth();

  const [comment, setComment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      const mock = {
        id,
        user: "john_doe",
        side: "pros",
        text: "This is a standalone comment page view loaded by ID.",
        createdAt: "2026-05-06 10:15"
      };

      setComment(mock);
      setLoading(false);
    }, 300);
  }, [id]);

  if (loading) return <div className="p-6 text-center">Loading comment...</div>;

  if (!comment) return <div className="p-6 text-center text-destructive">Comment not found</div>;

  const isModerator = user?.userRole?.toUpperCase() === "MODERATOR";
  if (!isModerator) window.location.href = "/";

  const isPros = comment.side === "pros";

  return (
    <div className="max-w-4xl mx-auto">
      {/* Card */}
      <div
        className={`p-5 rounded-lg border shadow-md bg-card border-border ${
          isPros ? "border-l-4 border-l-primary" : "border-l-4 border-l-destructive"
        }`}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          <Avatar name={comment.user} size="sm" />
          <div className="flex flex-col">
            <div className="flex flex-row gap-2 items-center">
                <span className="font-medium">@{comment.user}</span>
                <span className="text-muted-foreground/30 text-xs">•</span>
                <span
                className={`text-xxs font-bold uppercase tracking-wider ${
                    isPros ? "text-primary" : "text-destructive"
                }`}
                >
                {isPros ? "PROS" : "CONS"}
                </span>
            </div>

            <p className="text-xs text-muted-foreground">
              {comment.createdAt}
            </p>
          </div>
        </div>

        {/* Text */}
        <p className="text-sm leading-relaxed whitespace-pre-wrap mb-4">
          {comment.text}
        </p>

        {/* Actions */}
        <div className="flex justify-end">
          <button 
          onClick={() => setModal(true)}
          className="flex items-center gap-2 text-sm text-destructive hover:opacity-80">
            <Flag className="w-4 h-4" />
            Takedown
          </button>
        </div>
      </div>

      {modal &&
        <TakedownModal
        comment={comment} 
        onClose={() => setModal(false)}
        />
      }
    </div>
  );
}