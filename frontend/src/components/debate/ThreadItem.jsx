import Avatar from "../ui/Avatar";

export default function ThreadItem({ side, user, text, votes = 0, replies = [], depth = 0 }) {
  const isPros = side === 'pros';

  return (
    <div className={`relative flex flex-col ${depth > 0 ? "ml-6 mt-4 pl-3" : "mt-4"}`}>
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
        <div className="flex items-center gap-2 mb-3">
          <Avatar name={user} size="sm" />
          <span className="font-bold text-sm text-secondary">@{user}</span>
          <span className={`text-xxs font-bold uppercase px-2 py-0.5 rounded-full ${
            isPros ? 'bg-primary/10 text-primary' : 'bg-destructive/10 text-destructive'
          }`}>
            {isPros ? 'Pro' : 'Con'}
          </span>
        </div>
        
        <p className="text-foreground/90 text-sm leading-relaxed mb-4">
          {text}
        </p>
        
        {/* Simplified Interaction Bar */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1">
            <button className="text-muted-foreground hover:text-primary transition-colors p-1">
              <span className="text-sm">▲</span>
            </button>
            <span className="text-xs font-bold text-foreground w-4 text-center">{votes}</span>
            <button className="text-muted-foreground hover:text-destructive transition-colors p-1">
              <span className="text-sm">▼</span>
            </button>
          </div>
          
          <button className="text-xxs font-bold text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest">
            Reply
          </button>
        </div>
      </div>

      {/* Recursive Render */}
      {replies.length > 0 && (
        <div className="flex flex-col">
          {replies.map((reply) => (
            <ThreadItem 
              key={reply.id} 
              {...reply} 
              depth={depth + 1} 
            />
          ))}
        </div>
      )}
    </div>
  );
}