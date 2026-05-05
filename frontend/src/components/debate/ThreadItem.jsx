import { ArrowDown, ArrowUp, CornerUpLeft, Flag, MoreVertical } from "lucide-react";
import Avatar from "../ui/Avatar";
import { useState } from "react";
import TextBox from "../ui/TextBox";

export default function ThreadItem({ 
  comment, 
  depth = 0, 
  openModal, 
  proLabel, 
  conLabel,
  onSubmitReply 
}) {
  const { id, side, user, text, replies = [] } = comment;
  const isPros = side === 'pros';
  const hasReplies = replies.length > 0;
  
  const [menuOpen, setMenuOpen] = useState(false);
  const [reply, setReply] = useState({ state: false, message: "" });
  const [collapsed, setCollapsed] = useState(false);
  const [vote, setVote] = useState(null);
  const [voteCount, setVoteCount] = useState(comment.votes || 0);

  const isDeep = depth > 3;
  const marginClass = depth === 0 ? "mt-6" : isDeep ? "ml-2 mt-2" : "ml-4 md:ml-10 mt-2";

  const handleVote = (type) => {
    if (vote === type) {
      setVote(null);
      setVoteCount(prev => type === "upvote" ? prev - 1 : prev + 1);
    } else {
      const adjustment = vote === null ? 1 : 2;
      setVote(type);
      setVoteCount(prev => type === "upvote" ? prev + adjustment : prev - adjustment);
    }
  };

  const handlePostReply = () => {
    const message = typeof reply.message === "string" ? reply.message : "";
    if (!message.trim()) return;
    if (onSubmitReply) onSubmitReply(id, message);
    setReply({ state: false, message: "" });
  };

  return (
    <div className={`relative flex flex-col ${marginClass}`}>
      {/* Thread Lines using your --border variable */}
      {depth > 0 && !isDeep && (
        <div className="absolute -left-4 top-0 bottom-0 w-px bg-border">
          <div className="absolute top-8 left-0 w-4 border-t border-border rounded-bl-lg" />
        </div>
      )}

      {/* Discussion Card using --card, --radius, and --shadow-dark-sm */}
      <div className={`group p-5 transition-all duration-200 rounded-lg border shadow-dark-sm ${
        depth > 0 
          ? "bg-card/40 border-border/60" 
          : "bg-card border-border shadow-dark-md"
      } ${isPros ? "border-l-4 border-l-primary" : "border-l-4 border-l-destructive"}`}>
        
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3 mb-3">
            <Avatar name={user} size="sm" />
            {/* Side-by-side Layout for Username and Stance */}
            <div className="flex items-center gap-2">
              <span className="font-medium text-sm text-foreground">@{user}</span>
              <span className="text-muted-foreground/30 text-xs">•</span>
              <span className={`text-xxs font-bold uppercase tracking-wider ${
                isPros ? 'text-primary' : 'text-destructive'
              }`}>
                {isPros ? proLabel : conLabel}
              </span>
            </div>
          </div>

          <div className="relative">
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-1.5 hover:bg-muted rounded-md transition-colors text-muted-foreground"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
            {/* Popover using --popover and --shadow-dark-lg */}
            {menuOpen && (
              <div className="absolute right-0 top-9 z-20 w-36 bg-popover border border-border rounded-md shadow-dark-lg">
                <button 
                  onClick={() => { openModal("commentReport", comment); setMenuOpen(false); }}
                  className="flex gap-2 p-2.5 w-full text-sm font-medium text-destructive hover:bg-destructive/10 items-center transition-colors"
                >
                  <Flag className="w-3.5 h-3.5"/> Report
                </button>
              </div>
            )}
          </div>
        </div>
        
        <p className="text-foreground text-sm leading-relaxed mb-4 whitespace-pre-wrap">
          {text}
        </p>
        
        {/* Interaction Bar */}
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-1 bg-muted/50 rounded-md p-0.5">
            <button 
              onClick={() => handleVote("upvote")}
              className={`p-1.5 rounded-md transition-all ${
                vote === "upvote" ? "bg-primary text-primary-foreground" : "hover:text-primary text-muted-foreground"
              }`}
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs font-medium px-1 min-w-[20px] text-center">{voteCount}</span>
            <button 
              onClick={() => handleVote("downvote")}
              className={`p-1.5 rounded-md transition-all ${
                vote === "downvote" ? "bg-destructive text-destructive-foreground" : "hover:text-destructive text-muted-foreground"
              }`}
            >
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setReply(prev => ({ ...prev, state: !prev.state }))}
              className={`flex items-center gap-2 text-xxs font-medium uppercase tracking-widest transition-colors ${
                reply.state ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <CornerUpLeft className="w-3.5 h-3.5" />
              {reply.state ? "Cancel" : "Reply"}
            </button>

            {hasReplies && (
              <button
                onClick={() => setCollapsed((prev) => !prev)}
                className="text-xxs font-medium uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
              >
                {collapsed ? `Show ${replies.length} replies` : `Hide ${replies.length} replies`}
              </button>
            )}
          </div>
        </div>

        {/* Reply Area using --input-background */}
        {reply.state && (
          <div className="mt-4 flex flex-col gap-2 p-3 bg-input-background rounded-md border border-border">
            <TextBox 
              placeholder={`Write a reply...`}
              value={reply.message}
              onChange={(event) => setReply(prev => ({ ...prev, message: event.target.value }))}
              autoFocus
            />
            <div className="flex justify-end">
              <button 
                onClick={handlePostReply}
                disabled={!reply.message.trim()}
                className="bg-primary text-primary-foreground px-5 py-2 rounded-md text-sm font-medium hover:opacity-90 disabled:opacity-50 transition-all"
              >
                Post Reply
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Recursive Render */}
      {hasReplies && !collapsed && (
        <div className="flex flex-col">
          {replies.map((r) => (
            <ThreadItem 
              key={r.id} 
              comment={r}
              depth={depth + 1} 
              openModal={openModal}
              proLabel={proLabel}
              conLabel={conLabel}
              onSubmitReply={onSubmitReply}
            />
          ))}
        </div>
      )}
    </div>
  );
}