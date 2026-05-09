import Header from "../components/ui/Header";
import { getRecommendedPosts } from "../services/PostService";
import PostSkeleton from "../components/ui/PostSkeleton";
import DebateCard from "../components/homeDebate/DebateCard";
import useInfinitePostsById from "../hooks/useInfinitePostsById.jsx";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

export default function Home() {
  const { user } = useAuth();
  const { posts, loading } = useInfinitePostsById(getRecommendedPosts, user?.userID, 6);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <Header 
      title="Recommended Debates"
      desc="Discover debates based on personalization"
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
