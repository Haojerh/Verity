import React, { useState } from 'react';
import EditorialLayout from '../components/debate/EditorialLayout';
import ArgumentCard from '../components/debate/ArgumentCard';

export default function VerityTest() {
  const [position, setPosition] = useState('bridge');

  const discourseData = [
    {
      id: 1,
      author: "Dr. Julian Vane",
      time: "3h ago",
      stance: "PRO",
      upvotes: "412",
      content: "We must acknowledge that the 'agency' we defend is often merely a series of suboptimal habits. Smart systems don't remove choice; they remove the friction of logistical failures. When a city breathes through data, we regain time—the ultimate unit of agency."
    },
    {
      id: 2,
      author: "Sarah Chen",
      time: "2h ago",
      stance: "CON",
      upvotes: "89",
      isReply: true,
      content: "Dr. Vane ignores the inherent bias in what 'optimization' looks like. If an algorithm prioritizes flow, it inevitably de-prioritizes the wanderer and the unpredictable."
    }
  ];

  return (
    <EditorialLayout>
      {/* Article Header */}
      <header className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <span className="border border-[#c5c6ca] px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-[#1a1c1b]">Urban Theory</span>
          <span className="text-[#75777a] text-[10px] uppercase font-bold tracking-widest">May 14, 2026</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold text-[#000101] mb-8 leading-[1.1] tracking-tight">
          The Paradox of Urban Autonomy: Efficiency vs. Agency
        </h1>
        <p className="text-2xl md:text-3xl text-[#44474a] leading-relaxed italic max-w-4xl border-t border-[#c5c6ca] pt-8 font-serif">
          As smart cities transition from concept to infrastructure, the friction between algorithmic optimization and individual human choice defines the new civic frontier.
        </p>
      </header>

      {/* Stance Selection Section */}
      <section className="mb-20 border-t-2 border-[#000101] pt-12">
        <h3 className="font-bold text-2xl mb-2 text-[#000101]">Enter the Discourse</h3>
        <p className="text-base mb-8 text-[#44474a]">Choose your philosophical position before contributing your argument.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <button 
            onClick={() => setPosition('pro')}
            className={`p-6 border transition-all ${position === 'pro' ? 'border-2 border-[#000101] shadow-[4px_4px_0px_#091426]' : 'border-[#c5c6ca] bg-white'}`}
          >
            <span className="font-bold text-[#545f73] text-xs uppercase tracking-widest mb-1 block">Position: Pro</span>
            <span className="font-extrabold text-[#000101] text-xl">Efficiency First</span>
          </button>

          <button 
            onClick={() => setPosition('bridge')}
            className={`p-6 border transition-all ${position === 'bridge' ? 'border-2 border-[#000101] shadow-[4px_4px_0px_#091426]' : 'border-[#c5c6ca] bg-white'}`}
          >
            <span className="font-bold text-[#000101] text-xs uppercase tracking-widest mb-1 block">Position: Bridge</span>
            <span className="font-extrabold text-[#000101] text-xl">Synthesis Focus</span>
          </button>

          <button 
            onClick={() => setPosition('con')}
            className={`p-6 border transition-all ${position === 'con' ? 'border-2 border-[#000101] shadow-[4px_4px_0px_#091426]' : 'border-[#c5c6ca] bg-white'}`}
          >
            <span className="font-bold text-[#75777d] text-xs uppercase tracking-widest mb-1 block">Position: Con</span>
            <span className="font-extrabold text-[#000101] text-xl">Agency First</span>
          </button>
        </div>

        <div className="bg-white border border-[#c5c6ca] p-1">
          <textarea 
            className="w-full bg-transparent border-none focus:ring-0 text-base p-6 min-h-[120px]" 
            placeholder="Structure your argument..."
          />
          <div className="flex justify-end p-4 border-t border-[#c5c6ca]/30">
            <button className="bg-[#000101] text-white px-8 py-3 font-bold text-xs uppercase tracking-widest hover:opacity-90">Publish Argument</button>
          </div>
        </div>
      </section>

      {/* Discussion Feed */}
      <div className="space-y-12">
        <div className="flex justify-between items-end border-b-2 border-[#000101] pb-4">
          <h2 className="font-extrabold text-3xl text-[#000101]">Forum Discourse</h2>
          <div className="flex gap-6 text-[10px] font-bold uppercase tracking-widest text-[#75777a]">
            <button className="text-[#000101] underline underline-offset-8">Most Rigorous</button>
            <button>Recent</button>
          </div>
        </div>

        <div className="space-y-12">
          {discourseData.map(arg => (
            <ArgumentCard key={arg.id} {...arg} />
          ))}
        </div>
      </div>
    </EditorialLayout>
  );
}