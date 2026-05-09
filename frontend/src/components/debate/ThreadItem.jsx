import { ArrowDown, ArrowUp, CornerUpLeft, Flag, MoreVertical, Clock } from "lucide-react";
import Avatar from "../ui/Avatar";
import { useState } from "react";
import TextBox from "../ui/TextBox";
import { useAuth } from "../../context/AuthContext";
import { formatDistanceToNow } from "date-fns";
import { isModerator, isAdmin } from "../../utils/Utils.js";
import VoteControl from "./VoteControl";

export default function ThreadItem({ 
  comment, 
  depth = 0, 
  openModal, 
  proLabel, 
  conLabel,
  onSubmitReply,
  minimal = false 
}) {
  const { user: currentUser } = useAuth();
  
  const { 
    id, 
    side, 
    user, 
    userAvatar, 
    text, 
    replies = [], 
    SYSCREATEDDATE 
  } = comment;

 
  const normalizedSide = side?.toUpperCase();
  const normalizedProLabel = proLabel?.toUpperCase();
  const isPros = normalizedSide === normalizedProLabel;
  
  const hasReplies = replies && replies.length > 0;
  const [menuOpen, setMenuOpen] = useState(false);
  const [reply, setReply] = useState({ state: false, message: "" });
  const [collapsed, setCollapsed] = useState(false);
  const [vote, setVote] = useState(null);
  const [voteCount, setVoteCount] = useState(comment.votes || 0);

  const isDeep = depth > 3;
  const marginClass = depth === 0 ? "mt-6" : isDeep ? "ml-2 mt-2" : "ml-4 md:ml-10 mt-2";

  const handlePostReply = () => {
    if (!reply.message.trim()) return;
    if (onSubmitReply) onSubmitReply(id, reply.message);
    setReply({ state: false, message: "" });
  };

  return (
    <div className={`relative flex flex-col ${marginClass}`}>
      {depth > 0 && !isDeep && (
        <div className="absolute -left-4 top-0 bottom-0 w-px bg-border">
          <div className="absolute top-8 left-0 w-4 border-t border-border rounded-bl-lg" />
        </div>
      )}

      {/* Card styling with dynamic left border color */}
      <div className={`group p-5 transition-all duration-200 rounded-lg border shadow-dark-sm ${
        depth > 0 
          ? "bg-card/40 border-border/60" 
          : "bg-card border-border shadow-dark-md"
      } ${isPros ? "border-l-4 border-l-primary" : "border-l-4 border-l-destructive"}`}>
        
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3 mb-3">
            <Avatar
              name={user}
              size="sm"
              imageUrl={userAvatar ? `http://localhost:8080/api/uploads/users/${userAvatar}` : null}
            />            
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm text-foreground">@{user || "Anonymous"}</span>
                
                {/* Dynamic Badge: Colors and Label change based on stance */}
                <span className={`text-xxs font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-sm ${
                  isPros 
                    ? 'bg-primary/10 text-primary' 
                    : 'bg-destructive/10 text-destructive'
                }`}>
                  {isPros ? proLabel : conLabel}
                </span>
              </div>
              
              <div className="flex items-center gap-1 text-muted-foreground/50 text-xxs">
                <Clock className="w-2.5 h-2.5" />
                <span>
                  {SYSCREATEDDATE ? formatDistanceToNow(new Date(SYSCREATEDDATE), { addSuffix: true }) : "Just now"}
                </span>
              </div>
            </div>
          </div>

          {!minimal && (
            <div className="relative">
              <button 
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-1.5 hover:bg-muted rounded-md transition-colors text-muted-foreground"
              >
                <MoreVertical className="w-4 h-4" />
            </button>
            {menuOpen && (
              <div className="absolute right-0 top-9 z-20 w-36 bg-popover border border-border rounded-md shadow-dark-lg animate-in fade-in zoom-in duration-100">
                <button 
                  onClick={() => { 
                    openModal((isModerator(currentUser) || isAdmin(currentUser)) ? "commentTakedown" : "commentReport", comment); 
                    setMenuOpen(false); 
                  }}
                  className="flex gap-2 p-2.5 w-full text-sm font-medium text-destructive hover:bg-muted/50 items-center transition-colors"
                >
                  <Flag className="w-3.5 h-3.5"/> 
                  {(isModerator(currentUser) || isAdmin(currentUser)) ? "Takedown" : "Report"}
                </button>
              </div>
            )}
          </div>
          )}
        </div>
        
        <p className="text-foreground text-sm leading-relaxed mb-4 whitespace-pre-wrap">
          {text}
        </p>

        {!minimal && (
          <div className="flex items-center gap-5">
            <VoteControl 
              commentID={id} 
              initialVotes={comment.votes} 
              userVoteStatus={comment.userVote}
            />
            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setReply(prev => ({ ...prev, state: !prev.state }))}
                className={`flex items-center gap-2 text-xxs font-medium uppercase tracking-widest ${reply.state ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
              >
                <CornerUpLeft className="w-3.5 h-3.5" />
                {reply.state ? "Cancel" : "Reply"}
              </button>

              {hasReplies && (
                <button
                  onClick={() => setCollapsed((prev) => !prev)}
                  className="text-xxs font-medium uppercase tracking-widest text-muted-foreground hover:text-foreground"
                >
                  {collapsed ? `Show ${replies.length} replies` : `Hide ${replies.length} replies`}
                </button>
              )}
            </div>
          </div>
        )}

        {reply.state && (
          <div className="mt-4 flex flex-col gap-2 p-3 bg-input-background rounded-md border border-border">
            <TextBox 
              placeholder={`Replying as @${currentUser?.name}...`}
              value={reply.message}
              onChange={(e) => setReply(prev => ({ ...prev, message: e.target.value }))}
              autoFocus
            />
            <div className="flex justify-end">
              <button 
                onClick={handlePostReply}
                disabled={!reply.message.trim()}
                className="bg-primary text-primary-foreground px-5 py-2 rounded-md text-sm font-medium disabled:opacity-50"
              >
                Post Reply
              </button>
            </div>
          </div>
        )}
      </div>

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