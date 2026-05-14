import { Trophy } from "lucide-react";
import ThreadItem from "./ThreadItem";

export default function ConsensusCard({ comment, label, type, openModal, onSubmitReply, proLabel, conLabel }) {
  if (!comment) return null;

  const isPro = type === 'pros';

  return (
    <div className="mb-10 animate-in fade-in slide-in-from-top-4 duration-700">
      <div 
        className={`rounded-2xl border-2 overflow-hidden transition-all shadow-lg
          ${isPro ? 'border-primary/20 bg-primary/5' : 'border-destructive/20 bg-destructive/5'}`}
      >
        <div className={`flex items-center gap-2 px-4 py-2 border-b 
          ${isPro ? 'border-primary/10 bg-primary/10' : 'border-destructive/10 bg-destructive/10'}`}>
          <Trophy className={`w-4 h-4 ${isPro ? 'text-primary' : 'text-destructive'} animate-bounce`} />
          <span className={`text-[10px] font-black uppercase tracking-[0.2em] 
            ${isPro ? 'text-primary' : 'text-destructive'}`}>
            Top {label} Argument
          </span>
        </div>

        <div className="w-full p-2 pt-0 flex flex-col">
          <ThreadItem 
            comment={comment} 
            openModal={openModal} 
            proLabel={proLabel} 
            conLabel={conLabel} 
            onSubmitReply={onSubmitReply}
            minimal={true}
            highlight={true} 
          />
        </div>
      </div>
    </div>
  );
}