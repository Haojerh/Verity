import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Flag } from "lucide-react";
import Avatar from "../components/ui/Avatar";
import { useAuth } from "../context/AuthContext";
import TakedownModal from "../components/debate/TakedownModal";
import { getCommentByID } from "../services/CommentService.js";
import { formatDateTime } from "../utils/Format.js";

export default function CommentPage() {
  const { id } = useParams();
  const { user } = useAuth();

  const [comment, setComment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const fetchComment = async () => {
      try {
        setLoading(true);
        const res = await getCommentByID(id);
        console.log(res);
        setComment(res.comment);
      } catch (err) {
        console.error("Failed to fetch comment:", err);
        setComment(null);
      } finally {
        setLoading(false);
      }
    };

    fetchComment();
  }, [id]);

  console.log(comment);

  if (loading) return <div className="p-6 text-center">Loading comment...</div>;

  if (!comment) return <div className="p-6 text-center">Comment not found</div>;

  const isModerator = user?.userRole?.toUpperCase() === "MODERATOR";
  const isAdmin = user?.userRole?.toUpperCase() === "ADMINISTRATOR";
  if (!isModerator && !isAdmin) window.location.href = "/";

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
          <Avatar
            name={comment.user}
            size="sm"
            imageUrl={
              comment.userAvatar
                ? `http://localhost:8080/api/uploads/users/${comment.userAvatar}`
                : null
            }
          /> 
          <div className="flex flex-col">
            <div className="flex flex-row gap-2 items-center">
                <span className="font-medium">@{comment.user}</span>
                <span className="text-muted-foreground/30 text-xs pt-0.5">•</span>
                <span
                className={`text-xxs font-bold uppercase tracking-wider pt-0.5 ${
                    isPros ? "text-primary" : "text-destructive"
                }`}
                >
                {isPros ? "PROS" : "CONS"}
                </span>
            </div>

            <p className="text-xs text-muted-foreground">
              {formatDateTime(comment.SYSCREATEDDATE)}
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
        entity={comment} 
        type="comment"
        onClose={() => setModal(false)}
        onSuccess={() => setComment(null)}
        />
      }
    </div>
  );
}