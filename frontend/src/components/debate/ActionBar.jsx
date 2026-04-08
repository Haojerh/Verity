import { TrendingUp, MessageSquare, Share2 } from "lucide-react";

export default function ActionBar({ debate }) {
  const totalVotes = debate.prosVotes + debate.consVotes;

  return (
    <div className="flex gap-4 text-sm text-muted-foreground mt-3">
      
      <div className="flex items-center gap-1">
        <TrendingUp className="w-4 h-4" />
        <span>{totalVotes}</span>
      </div>

      <div className="flex items-center gap-1">
        <MessageSquare className="w-4 h-4" />
        <span>{debate.commentCount}</span>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="flex items-center gap-1 hover:text-foreground"
      >
        <Share2 className="w-4 h-4" />
        <span>Share</span>
      </button>
    </div>
  );
}