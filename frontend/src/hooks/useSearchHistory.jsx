import { useState, useEffect } from "react";

const HISTORY_KEY = "search_history";
const MAX_HISTORY = 8;

export default function useSearchHistory() {
  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
    } catch {
      return [];
    }
  });

  const addToHistory = (query) => {
    if (!query.trim()) return;
    setHistory((prev) => {
      const filtered = prev.filter((q) => q !== query); // remove duplicate
      const updated = [query, ...filtered].slice(0, MAX_HISTORY);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromHistory = (query) => {
    setHistory((prev) => {
      const updated = prev.filter((q) => q !== query);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const clearHistory = () => {
    localStorage.removeItem(HISTORY_KEY);
    setHistory([]);
  };

  return { history, addToHistory, removeFromHistory, clearHistory };
}