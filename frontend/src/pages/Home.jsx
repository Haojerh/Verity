import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DebateCard from "../components/homeDebate/DebateCard";
import Header from "../components/ui/Header";
import { Http } from "../constant/http.method";
import { request } from "../request/request";


export default function Home() {
  const [debates, setDebates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();

  const [data, setData] = useState([]);

  async function getData() {
        request(
            Http.GET,
            "/profile",
            {
            }
        ).then((response) => {
            console.log("Response :", JSON.stringify(response))

            //setData(response.data[0]);
            // setAuditLog(response.data[1]);
            // console.log(response.data[1]);
            // window.localStorage.setItem("display_name", response.username)
        }).catch((error) => {
            console.log(error);
        })
    }

    getData();
  
  // // Sanitize the search query
  // const getSafeQuery = () => {
  //   const rawQuery = new URLSearchParams(location.search).get("q");
  //   if (!rawQuery) return null;
    
  //   // Decode the double-encoded query
  //   let decodedQuery;
  //   try {
  //     decodedQuery = decodeURIComponent(decodeURIComponent(rawQuery));
  //   } catch (e) {
  //     decodedQuery = rawQuery;
  //   }
    
  //   // Sanitize
  //   let safe = decodedQuery
  //     .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
  //     .replace(/[<>{}()]/g, '')
  //     .replace(/javascript:/gi, '')
  //     .trim()
  //     .slice(0, 100);
    
  //   return safe || null;
  // };
  
  // const query = getSafeQuery();


  // useEffect(() => {
     
  //   getData();
  // },[]);

  // useEffect(() => {
  //   const fetchDebates = async () => {
  //     setLoading(true);
  //     try {
  //       let url;
  //       if (query && query.trim()) {
  //         url = `http://localhost:8080/api/debates/search?q=${encodeURIComponent(query)}`;
  //       } else {
  //         url = `http://localhost:8080/api/debates`;
  //       }
        
  //       console.log("Fetching:", url);
        
  //       const response = await fetch(url);
        
  //       if (!response.ok) {
  //         const errorText = await response.text();
  //         console.error("Response error:", response.status, errorText);
  //         throw new Error(`Search failed: ${response.status}`);
  //       }
        
  //       const data = await response.json();
  //       setDebates(Array.isArray(data) ? data : []);
  //     } catch (err) {
  //       console.error("Search error:", err);
  //       setDebates([]);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchDebates();
  // }, [query]);

  return (
    <div className="max-w-4xl mx-auto">
      <Header 
      // title={query ? `Search Results for "${query}"` : "Recommended Debates"} 
      // desc={query ? "Showing results based on your search" : "Discover debates based on ur interests"} 
      />

      {error && (
        <div className="bg-red-100 text-destructive p-3 rounded mb-4">
          Error: {error}
        </div>
      )}

      <div className="space-y-4">
        {loading ? (<p>Loading...</p>) : 
        debates.length > 0 ? (
          debates.map((debate) => (
            <DebateCard key={debate.id} debate={debate} />
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
}