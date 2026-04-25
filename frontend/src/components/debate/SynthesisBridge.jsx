const SynthesisBridge = ({ author, title, content }) => {
  return (
    <div className="relative py-8">
      <div className="bg-white border-2 border-[#091426] shadow-[12px_12px_0px_#091426] p-10 relative">
        <div className="absolute -top-4 left-6 bg-[#000101] text-white font-bold text-[10px] uppercase tracking-[0.2em] px-4 py-2">
          Synthesis Bridge
        </div>
        <div className="mb-4">
          <span className="font-bold text-xs uppercase tracking-widest">{author}</span>
        </div>
        <h3 className="text-2xl font-extrabold mb-4">{title}</h3>
        <p className="text-xl italic leading-relaxed">"{content}"</p>
      </div>
    </div>
  );
};