import { Sparkles, RefreshCw, AlertCircle } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

export default function DebateSummary({ postID }) {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSummarize = useCallback(async () => {
    if (!postID) return;

    setLoading(true);
    setError(false);

    try {
      const response = await fetch(`/api/ai/summary/${postID}`);
      if (!response.ok) throw new Error("Failed to fetch");
      const text = await response.text();
      setSummary(text);
    } catch (err) {
      console.error("AI Summary Error:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [postID]);

  useEffect(() => {
    if (postID && !summary) {
      handleSummarize();
    }
  }, [postID, handleSummarize, summary]);

  if (!postID) return null;

  return (
    <div className="bg-card border border-border rounded-xl p-5 mb-8 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className={`w-5 h-5 text-yellow-500 ${loading ? 'animate-pulse' : ''}`} />
          <h3 className="font-bold text-xs tracking-widest uppercase">Post Summary</h3>
        </div>
        
        {!summary && !loading && (
          <button 
            onClick={handleSummarize}
            className="bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-xs font-bold hover:opacity-90 transition-all"
          >
            GENERATE SUMMARY
          </button>
        )}
      </div>

      {loading && (
        <div className="space-y-2 animate-pulse">
          <div className="h-3 bg-muted rounded w-full"></div>
          <div className="h-3 bg-muted rounded w-5/6"></div>
          <div className="h-3 bg-muted rounded w-4/6"></div>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 text-destructive text-sm italic">
          <AlertCircle className="w-4 h-4" />
          The AI is currently busy. Try again in a minute.
        </div>
      )}

      {summary && !loading && (
        <div className="relative">
          <p className="text-sm leading-relaxed text-muted-foreground italic border-l-2 border-yellow-500/50 pl-4">
            {summary}
          </p>
          <button 
            onClick={handleSummarize}
            className="mt-3 text-[10px] text-muted-foreground hover:text-primary flex items-center gap-1 uppercase font-bold"
          >
            <RefreshCw className="w-3 h-3" /> Regenerate
          </button>
        </div>
      )}
    </div>
  );
}