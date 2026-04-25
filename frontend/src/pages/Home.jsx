import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DebateCard from "../components/debate/DebateCard";


export default function Home() {
  const [debates, setDebates] = useState([]);
  const [loading, setLoading] = useState(false); // Optional: add loading state
  const location = useLocation();


  // Get query from URL
  const query = new URLSearchParams(location.search).get("q");
  
  // Sanitize query for display (remove < > characters)
  const sanitizeForDisplay = (str) => {
    if (!str) return '';
    return str.replace(/[<>]/g, '');
  };


  // Escape HTML for safety (though React does this automatically for text)
  const escapeHtml = (str) => {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
  };


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
      
        const response = await fetch(url);
      
      // Check if response is ok
        if (!response.ok) {
          const errorData = await response.text();
          console.error("Search error:", errorData);
          setDebates([]);
          return;
        }
      
        const data = await response.json();
        setDebates(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Fetch error:", err);
        setDebates([]);
      } finally {
        setLoading(false);
      }
    };


    fetchDebates();
}, [query]);


  // Get safe version for display
  const displayQuery = sanitizeForDisplay(query);


  return (
    <div className="p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Title - React auto-escapes, so no need for escapeHtml here */}
        <h2 className="mb-6 text-xl font-semibold">
          {query && query.trim() ? `Search Results for "${displayQuery}"` : "Recommended Debates"}
        </h2>


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
