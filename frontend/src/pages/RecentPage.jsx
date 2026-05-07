import Header from "../components/ui/Header";
import useInfinitePosts from "../hooks/useInfinitePosts.jsx";
import { getRecentPosts } from "../services/PostService";
import PostSkeleton from "../components/ui/PostSkeleton";
import DebateCard from "../components/homeDebate/DebateCard";

export default function RecentPage() {
  const { posts, loading } = useInfinitePosts(getRecentPosts, 6);

  return (
    <div className="max-w-4xl mx-auto">
      <Header 
      title="Recent Debates"
      desc="Discover debates based on date and time"
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
