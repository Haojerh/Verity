import React from 'react';

export default function EditorialLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#f9f9f7] text-[#1a1c1b] font-serif">
      {/* Navigation */}
      <nav className="bg-white border-b-2 border-[#000101] sticky top-0 z-50">
        <div className="flex justify-between items-center px-8 py-6 w-full max-w-7xl mx-auto">
          <div className="text-3xl font-black uppercase tracking-tighter text-[#000101]">
            The Editorial Discourse
          </div>
          <div className="hidden md:flex items-center gap-10">
            <button className="text-[#000101] border-b-4 border-[#000101] pb-1 font-bold text-xs uppercase tracking-widest">
              Discussion
            </button>
            <button className="text-[#75777a] hover:text-[#000101] transition-colors text-xs uppercase tracking-widest font-bold">
              Summary
            </button>
          </div>
          <button className="px-6 py-2 text-xs font-bold bg-[#000101] text-white uppercase tracking-widest hover:opacity-90 transition-all">
            Join Debate
          </button>
        </div>
      </nav>

      <main className="flex-grow w-full max-w-5xl mx-auto px-12 py-16 md:py-24">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t-2 border-[#000101] w-full py-16 mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center px-12 w-full max-w-7xl mx-auto gap-8 text-[10px] font-bold uppercase tracking-widest">
          <div className="text-xl">The Editorial Discourse</div>
          <div className="flex gap-10">
            <a href="#policy" className="hover:underline">Editorial Policy</a>
            <a href="#ethics" className="hover:underline">Ethics</a>
          </div>
          <div className="text-[#75777a] italic">© 2026 Verity. Built for Rigor.</div>
        </div>
      </footer>
    </div>
  );
}
