import { ArrowUp, ArrowDown } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { voteOnComment } from "../../services/PostService";

export default function VoteControl({ commentID, initialVotes, userVoteStatus }) {
  const { user } = useAuth();
  
  const [vote, setVote] = useState(
    userVoteStatus === 1 ? "upvote" : userVoteStatus === -1 ? "downvote" : null
  );
  const [voteCount, setVoteCount] = useState(initialVotes);

  const handleVote = async (type) => {
    if (!user) return alert("Please login to vote");

    const previousVote = vote;
    const previousCount = voteCount;

    let nextVote = type === vote ? null : type;
    let numericValue = nextVote === "upvote" ? 1 : nextVote === "downvote" ? -1 : 0;

    setVote(nextVote);
    
    try {
      const newTotal = await voteOnComment(commentID, user.userID, numericValue);
      setVoteCount(newTotal);
    } catch (err) {
      setVote(previousVote);
      setVoteCount(previousCount);
    }
  };

  return (
    <div className="flex items-center gap-1 bg-muted/50 rounded-md p-0.5 border border-border/50">
      <button
        onClick={() => handleVote("upvote")}
        className={`p-1.5 rounded-md transition-all ${
          vote === "upvote" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-primary"
        }`}
      >
        <ArrowUp className="w-3.5 h-3.5" />
      </button>

      <span className="text-xs font-bold px-1 min-w-6 text-center">{voteCount}</span>

      <button
        onClick={() => handleVote("downvote")}
        className={`p-1.5 rounded-md transition-all ${
          vote === "downvote" ? "bg-destructive text-destructive-foreground" : "text-muted-foreground hover:text-destructive"
        }`}
      >
        <ArrowDown className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}