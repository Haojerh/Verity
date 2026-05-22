import { Search, Clock, X, TrendingUp } from "lucide-react";

export default function SearchDropdown({
  query,
  suggestions,
  history,
  onSelect,
  onRemoveHistory,
  onClearHistory,
  visible,
}) {
  if (!visible) return null;

  const showSuggestions = query.trim().length >= 2 && suggestions.length > 0;
  const showHistory = !showSuggestions && history.length > 0;

  if (!showSuggestions && !showHistory) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-50 overflow-hidden">
      
      {/* Suggestions */}
      {showSuggestions && (
        <div>
          <div className="px-3 pt-2 pb-2 text-xs text-muted-foreground font-medium uppercase tracking-wide">
            Suggestions
          </div>
          {suggestions.map((s) => (
            <button
              key={s}
              onMouseDown={() => onSelect(s)} // mouseDown fires before input blur
              className="w-full flex items-center gap-3 px-3 py-2 hover:bg-muted/50 text-sm text-left"
            >
              <TrendingUp size={14} className="text-muted-foreground shrink-0" />
              <span className="truncate">{s}</span>
            </button>
          ))}
        </div>
      )}

      {/* History */}
      {showHistory && (
        <div>
          <div className="px-3 pt-2 pb-2 flex items-center justify-between">
            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
              Recent
            </span>
            <button
              onMouseDown={onClearHistory}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Clear all
            </button>
          </div>
          {history.map((h) => (
            <div
              key={h}
              className="flex items-center gap-3 px-3 py-2 hover:bg-muted/50 group"
            >
              <Clock size={14} className="text-muted-foreground shrink-0" />
              <button
                onMouseDown={() => onSelect(h)}
                className="flex-1 text-sm text-left truncate"
              >
                {h}
              </button>
              <button
                onMouseDown={() => onRemoveHistory(h)}
                className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-foreground"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}