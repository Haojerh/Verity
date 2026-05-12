import { Trophy } from "lucide-react";
import ThreadItem from "./ThreadItem";

export default function ConsensusCard({ comment, label, type, openModal, onSubmitReply, proLabel, conLabel }) {
  if (!comment) return null;

  return (
    <div className="mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="flex items-center gap-2 mb-2 ml-1">
        <Trophy className={`w-4 h-4 ${type === 'pros' ? 'text-primary' : 'text-destructive'}`} />
        <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
          Top {label} Argument
        </span>
      </div>
      <div className="ring-2 ring-offset-2 ring-offset-background rounded-lg transition-all"
           style={{ '--tw-ring-color': type === 'pros' ? 'var(--primary)' : 'var(--destructive)' }}>
        <ThreadItem 
          comment={comment} 
          openModal={openModal} 
          proLabel={proLabel} 
          conLabel={conLabel} 
          onSubmitReply={onSubmitReply}
          minimal={true}
        />
      </div>
    </div>
  );
}
