import React from 'react';

// Make sure "export default" is right here
export default function ArgumentCard({ author, time, stance, content, upvotes, isReply = false }) {
  const isPro = stance === 'PRO';
  
  return (
    <div className={`${isReply ? 'ml-12 mt-8 relative' : 'relative'}`}>
      {isReply && (
        <div className="absolute -left-6 top-0 h-6 w-6 border-l border-b border-[#c5c6cd]" />
      )}
      <article className={`p-6 border-l-4 ${isPro ? 'border-slate-400 bg-slate-50' : 'border-slate-200 bg-white'}`}>
        <div className="flex items-center gap-3 mb-3">
          <span className={`${isPro ? 'bg-slate-400 text-white' : 'bg-slate-200 text-[#1a1c1b]'} px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest`}>
            {stance}
          </span>
          <span className="font-bold text-xs uppercase tracking-widest">{author}</span>
          <span className="text-[#75777a] text-[10px] font-bold uppercase tracking-widest">• {time}</span>
        </div>
        <p className="font-sans text-lg leading-relaxed text-[#1a1c1b]">{content}</p>
        <div className="mt-4 flex items-center gap-6 text-[#75777a]">
          <button className="text-[10px] font-bold uppercase tracking-widest hover:text-black">
            ↑ {upvotes}
          </button>
          <button className="text-[10px] font-bold uppercase tracking-widest hover:text-black">
            Rebut
          </button>
        </div>
      </article>
    </div>
  );
}