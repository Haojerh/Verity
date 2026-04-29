import Avatar from "../ui/Avatar";
import { MoreVertical } from "lucide-react";

export default function ThreadHeader({ topic }) {
  return (
    <section className="space-y-3 mb-10">
      <div className="flex justify-between gap-2">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
          <button className="text-primary border border-secondary px-3 py-1 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-primary/5 hover:scale-105 transition-all">
            Philosophy
          </button>
          <span>•</span>
          <span>{topic.date}</span>
        </div>
        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
          <MoreVertical className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      <h1 className="text-5xl sm:text-6xl font-bold text-foreground tracking-tight leading-[1.1] pb-8 border-b-2 border-muted">
        {topic.title}
      </h1>

      <div className="space-y-2 pt-4">
        <div className="flex gap-2 items-center text-xs">
          <Avatar name={topic.author} size="sm" />
          <span className="text-xs font-bold text-secondary uppercase tracking-tighter">
            @{topic.author}
          </span>
        </div>
        <p className="text-xl text-muted-foreground leading-relaxed italic">
          {topic.content}
        </p>
      </div>
    </section>
  );
}