import { Sparkles, RefreshCw } from "lucide-react";
import { useState } from "react";

export default function DebateSummary({ postID }) {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/ai/summary/${postID}`);
      const text = await response.text();
      setSummary(text);
    } catch (err) {
      console.error("AI summary failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-primary/5 to-destructive/5 border border-border rounded-xl p-5 mb-8 shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary animate-pulse" />
          <h3 className="font-bold text-xs tracking-widest text-foreground">VERITY AI SUMMARY</h3>
        </div>
        <button 
          onClick={handleSummarize} 
          disabled={loading}
          className="bg-secondary hover:bg-secondary/80 text-secondary-foreground px-3 py-1 rounded text-[10px] font-bold transition-colors"
        >
          {loading ? <RefreshCw className="w-3 h-3 animate-spin" /> : "GENERATE"}
        </button>
      </div>

      {summary ? (
        <p className="text-sm leading-relaxed text-muted-foreground italic border-l-2 border-primary/30 pl-3">
          {summary}
        </p>
      ) : (
        <p className="text-xs text-muted-foreground/60">
          Click generate to synthesize a consensus-based overview of this discussion.
        </p>
      )}
    </div>
  );
}