import Header from "../components/ui/Header";
import useInfinitePosts from "../hooks/useInfinitePosts.jsx";
import { getPopularPosts } from "../services/PostService";
import PostSkeleton from "../components/ui/PostSkeleton";
import DebateCard from "../components/homeDebate/DebateCard";
import { useEffect } from "react";

export default function PopularPage() {
  const { posts, loading } = useInfinitePosts(getPopularPosts, 6);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <Header 
      title="Popular Debates"
      desc="Discover debates based on popularity"
      />

      <div className="space-y-4">
        {posts.map((p) => (
            <DebateCard key={p.postID} debate={p} />
        ))}
      </div>

      {posts.length === 0 && !loading && (
        <div className="text-sm text-muted-foreground">No Post Yet.</div>
      )}

      {loading && <PostSkeleton count={2} />}
    </div>
  );
}
