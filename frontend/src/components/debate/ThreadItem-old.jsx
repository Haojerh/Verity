import { ArrowDown, ArrowUp, CornerUpLeft, Flag, MoreVertical } from "lucide-react";
import Avatar from "../ui/Avatar";
import { useState } from "react";
import TextBox from "../ui/TextBox";

export default function ThreadItem({ comment, depth = 0, openModal, proLabel, conLabel }) {
  const { side, user, text, replies = [] } = comment;
  const isPros = side === 'pros';
  const [menuOpen, setMenuOpen] = useState(false);
  const [reply, setReply] = useState({
    state: false,
    message: ""
  });
  const [vote, setVote] = useState(null);
  const [voteCount, setVoteCount] = useState(comment.votes || 0);
  const marginClass = depth === 0 ? "mt-4" : 
                    depth > 3 ? "ml-2 mt-2" : "ml-4 md:ml-10 mt-2";

  const handleUpvote = () => {
    if (vote === "upvote") {
      setVote(null);
      setVoteCount((prev) => prev - 1);
    } else {
      setVote("upvote");
      setVoteCount((prev) => prev + (vote === "downvote" ? 2 : 1));
    }
  };

  const handleDownvote = () => {
    if (vote === "downvote") {
      setVote(null);
      setVoteCount((prev) => prev + 1);
    } else {
      setVote("downvote");
      setVoteCount((prev) => prev - (vote === "upvote" ? 2 : 1));
    }
  };

  return (
    // <div className={`relative flex flex-col ${depth > 0 ? "ml-6 mt-4 pl-3" : "mt-4"}`}>
    <div className={`relative flex flex-col ${marginClass}`}>
      {depth > 0 && (
          <div className="absolute -left-4 top-0 bottom-0 w-0.5 bg-border">
            {/* The horizontal "branch" line */}
            <div className="absolute top-8 left-0 w-7 border-t-2 border-border" />
          </div>
      )}

      {/* Discussion Card */}
      <div className={`bg-card p-5 shadow-dark-sm transition-all ${
        depth > 0 ? "border-l-4 border-muted-foreground/20 hover:border-muted-foreground/10" : 
        "bg-muted/30 border-l-4 border-muted-foreground hover:bg-muted/20 hover:border-muted-foreground/50"
      }`}>
        <div className="flex justify-between">
          <div className="flex items-center gap-2 mb-3">
            <Avatar name={user} size="sm" />
            <span className="font-bold text-sm text-secondary">@{user}</span>
            <span className={`text-xxs font-bold uppercase px-2 py-0.5 rounded-full ${
              isPros ? 'bg-primary/10 text-primary' : 'bg-destructive/10 text-destructive'
            }`}>
              {/* {isPros ? 'Pro' : 'Con'} */}
              {isPros ? proLabel : conLabel}
            </span>
          </div>
          <div className="relative">
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <MoreVertical className="w-4 h-4 text-muted-foreground" />
            </button>
            {menuOpen && (
              <div className="absolute right-0 top-8 mt-2 w-40 bg-background border rounded-lg shadow-lg dark:shadow-dark-lg">
                <button 
                  onClick={() => openModal("commentReport", comment)}
                  className="flex gap-2 p-3 w-full text-destructive hover:bg-muted/50 items-center">
                  <Flag className="w-4 h-4"/> Report
                </button>
              </div>
            )}
          </div>
        </div>
        
        <p className="text-foreground/90 text-sm leading-relaxed mb-4">
          {text}
        </p>
        
        {/* Simplified Interaction Bar */}
        <div className="flex items-center gap-6 mb-2">
          <div className="flex items-center gap-1">
            <button 
            onClick={handleUpvote}
            className={`transition-colors p-1 ${
              vote === "upvote" ? "text-primary" : "text-muted-foreground hover:text-primary"
            }`}>
              <ArrowUp className="w-4 h-4" />
            </button>
            <span className="text-xs font-bold text-foreground w-4 text-center">{voteCount}</span>
            <button 
              onClick={handleDownvote}
              className={`transition-colors p-1 ${
                vote === "downvote" ? "text-destructive" : "text-muted-foreground hover:text-destructive"
              }`}>
              <ArrowDown className="w-4 h-4" />
            </button>
          </div>
          
          <button 
            onClick={() =>
              setReply((prev) => ({
                ...prev,
                state: !prev.state
              }))
            }
            className="flex flex-row items-center gap-2 text-xxs font-bold text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest">
              <CornerUpLeft className="w-4 h-4" />
              Reply
          </button>
        </div>
        {reply.state && (
          <div className="flex flex-row gap-2 w-full">
            <div className="flex-1">
              <TextBox 
                placeholder="Enter your comment..."
                value={reply.message}
                py="2" 
                onChange={(val) =>
                  setReply((prev) => ({
                    ...prev,
                    message: val
                  }))
                }
              />
            </div>
            <button 
              onClick={() =>
                setReply({
                  state: false,
                  message: ""
                })
              }
              className="bg-primary text-primary-foreground px-6 py-2 rounded-lg not-only:hover:bg-secondary transition-colors">
              Post
            </button>
          </div>
        )}
      </div>

      {/* Recursive Render */}
      {replies.length > 0 && (
        <div className="flex flex-col">
          {replies.map((reply) => (
            <ThreadItem 
              key={reply.id} 
              comment={reply}
              depth={depth + 1} 
              openModal={openModal}
            />
          ))}
        </div>
      )}
    </div>
  );
}