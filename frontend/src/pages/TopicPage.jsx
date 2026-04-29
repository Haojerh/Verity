import { useState } from "react";
import ThreadItem from "../components/debate/ThreadItem";
import CommentInput from "../components/debate/CommentInput";

export default function TopicPage() {
  const [userSide, setUserSide] = useState(null); // 'pros', 'cons', or null

  const topic = {
    author: "debate_pioneer",
    title: "Is AI Art Real Art?",
    content: "With the rise of generative models, the definition of creativity is shifting. Does art require human intent, or is the final aesthetic result all that matters?",
    prosLabel: "It's Art",
    consLabel: "Not Art"
  };

  const discussionData = [
    {
      id: 1,
      side: "pros",
      user: "art_lover",
      text: "Creativity is about the tool used, and AI is just a complex brush.",
      replies: [
        {
          id: 2,
          side: "cons",
          user: "purist_99",
          text: "A brush doesn't decide the composition for you based on a prompt.",
          replies: [
            {
              id: 3,
              side: "pros",
              user: "tech_optimist",
              text: "The prompt IS the composition. It's just a new form of direction.",
              replies: []
            }
          ]
        }
      ]
    },
    {
      id: 4,
      side: "cons",
      user: "traditionalist",
      text: "Art is a human-to-human connection that AI simply cannot replicate.",
      replies: []
    }
  ];

  return (
      <div className="max-w-4xl mx-auto">
        <section className="space-y-8">
          {/* Category and Date Label */}
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
            <span className="text-primary">Philosophy</span>
            <span>•</span>
            <span>April 29, 2026</span>
          </div>

          {/* Giant Heading */}
          <h1 className="text-6xl font-bold text-foreground tracking-tight leading-[1.1]">
            {topic.title}
          </h1>

          {/* Author and Content Section */}
          <div className="space-y-3 pt-4">
            <span className="text-xs font-bold text-secondary uppercase tracking-tighter">
              By @{topic.author}
            </span>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
              {topic.content}
            </p>
          </div>
        </section>

        <section className="flex flex-col sm:flex-row gap-4 justify-center py-6 border-y border-border">
          <button 
            onClick={() => setUserSide('pros')}
            className={`flex-1 py-4 px-6 rounded-xl font-bold transition-all border-2 ${
              userSide === 'pros' 
              ? 'bg-primary text-white border-primary shadow-lg scale-105' 
              : 'bg-card text-foreground border-border hover:border-primary/50'
            }`}
          >
            {topic.prosLabel}
          </button>
          <button 
            onClick={() => setUserSide('cons')}
            className={`flex-1 py-4 px-6 rounded-xl font-bold transition-all border-2 ${
              userSide === 'cons' 
              ? 'bg-destructive text-white border-destructive shadow-lg scale-105' 
              : 'bg-card text-foreground border-border hover:border-destructive/50'
            }`}
          >
            {topic.consLabel}
          </button>
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase text-muted-foreground">Discussion Thread</h3>
            <span className="text-xs text-muted-foreground">Sorted by Recent</span>
          </div>
          
          <CommentInput userSide={userSide} />

          <div className="space-y-4">
            {discussionData.map((comment) => (
              <ThreadItem key={comment.id} {...comment} />
            ))}
          </div>
        </section>
      </div>
    );
}