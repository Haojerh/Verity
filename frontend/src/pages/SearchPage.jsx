import Header from "../components/ui/Header";
import { useNavigate } from "react-router-dom";
import { getSearchPosts } from "../services/PostService";
import PostSkeleton from "../components/ui/PostSkeleton";
import DebateCard from "../components/homeDebate/DebateCard";
import useInfinitePostsById from "../hooks/useInfinitePostsById.jsx";

export default function SearchPage() {
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get("q") || "";
  const { posts, loading } = useInfinitePostsById(getSearchPosts, query, 6);

  if (!query) navigate("/");

  return (
    <div className="max-w-4xl mx-auto">
      <Header 
      title={`Search Results for "${query}"`}
      desc="Find Posts By Searching"
      />

      <div className="space-y-4">
        {posts.map((p) => (
            <DebateCard key={p.postID} debate={p} />
        ))}
      </div>

      {posts.length === 0 && !loading && (
        <div className="text-sm text-muted-foreground">No Posts Found.</div>
      )}

      {loading && <PostSkeleton count={2} />}
    </div>
  );
}
