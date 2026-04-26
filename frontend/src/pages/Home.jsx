import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DebateCard from "../components/homeDebate/DebateCard";

export default function Home() {
  const [debates, setDebates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();

  // Sanitize the search query
  const getSafeQuery = () => {
    const rawQuery = new URLSearchParams(location.search).get("q");
    if (!rawQuery) return null;
    
    // Decode the double-encoded query
    let decodedQuery;
    try {
      decodedQuery = decodeURIComponent(decodeURIComponent(rawQuery));
    } catch (e) {
      decodedQuery = rawQuery;
    }
    
    // Sanitize
    let safe = decodedQuery
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/[<>{}()]/g, '')
      .replace(/javascript:/gi, '')
      .trim()
      .slice(0, 100);
    
    return safe || null;
  };
  
  const query = getSafeQuery();

  useEffect(() => {
    const fetchDebates = async () => {
      setLoading(true);
      try {
        let url;
        if (query && query.trim()) {
          url = `http://localhost:8080/api/debates/search?q=${encodeURIComponent(query)}`;
        } else {
          url = `http://localhost:8080/api/debates`;
        }
        
        console.log("Fetching:", url);
        
        const response = await fetch(url);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error("Response error:", response.status, errorText);
          throw new Error(`Search failed: ${response.status}`);
        }
        
        const data = await response.json();
        setDebates(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Search error:", err);
        setDebates([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDebates();
  }, [query]);

  return (
    <div className="p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        
        <h2 className="mb-6 text-xl font-semibold">
          {query ? `Search Results for "${query}"` : "Recommended Debates"}
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            Error: {error}
          </div>
        )}

        <div className="space-y-4">
          {loading ? (
            <p>Loading...</p>
          ) : debates.length > 0 ? (
            debates.map((debate) => (
              <DebateCard key={debate.id} debate={debate} />
            ))
          ) : (
            <p>No results found</p>
          )}
        </div>

      </div>
    </div>
  );
}