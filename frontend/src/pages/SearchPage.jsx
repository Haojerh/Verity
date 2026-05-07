import Header from "../components/ui/Header";
import useInfinitePosts from "../hooks/useInfinitePosts.jsx";
import { getPopularPosts } from "../services/PostService";
import PostSkeleton from "../components/ui/PostSkeleton";
import DebateCard from "../components/homeDebate/DebateCard";

export default function SearchPage() {
  const { posts, loading } = useInfinitePosts(getPopularPosts, 6);
  const query = new URLSearchParams(location.search).get("q") || "";

  if (!query) window.location.href="/";

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
