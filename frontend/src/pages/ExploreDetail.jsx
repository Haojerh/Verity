import { useParams } from "react-router-dom";
import TopicHeader from "../components/topic/TopicHeader";
import { getTopicById } from "../services/TopicService";
import { getTopicPosts } from "../services/PostService.js";
import { useState, useEffect } from "react";
import { getFavorites, deleteFavorite, createFavorite } from "../services/FavoriteService";
import useInfinitePostsById from "../hooks/useInfinitePostsById.jsx";
import DebateCard from "../components/homeDebate/DebateCard";
import PostSkeleton from "../components/ui/PostSkeleton";

export default function ExploreDetail() {
    const { id } = useParams();
    const [topic, setTopic] = useState(null);
    const [isFollowed, setIsFollowed] = useState(false);
    const { posts, loading } = useInfinitePostsById(getTopicPosts, id);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
            const [topicRes, favRes] = await Promise.all([
                getTopicById(id),
                getFavorites(),
            ]);

            const topicData = {
                ...topicRes.topic,
                avatar: `http://localhost:8080/api/uploads/topics/${topicRes.topic.avatar}`,
                banner: `http://localhost:8080/api/uploads/topics/${topicRes.topic.banner}`,
            };

            setTopic(topicData);
    
            const favIds = new Set(favRes.favorites.map(f => f.topicID));
            setIsFollowed(favIds.has(id));
            } catch (err) {
            console.error("Error fetching data:", err);
            }
        };
    
        fetchData();
    }, [id]);

    const handleFollowToggle = async () => {
        const previous = isFollowed;

        setIsFollowed(!previous);

        try {
            if (previous) {
                await deleteFavorite(id);
            } else {
                await createFavorite(id);
            }
        } catch (err) {
            console.error("Follow toggle failed:", err);
            setIsFollowed(previous); // rollback
        }
    };

    if (!topic) return <div>Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <TopicHeader 
              topic={topic}
              isFollowed={isFollowed}
              onFollowToggle={handleFollowToggle}
            />

            <div className="space-y-4">
                {posts.map((p) => (
                    <DebateCard key={p.postID} debate={p} />
                ))}
            </div>

            {posts.length === 0 && !loading && (
                <div className="text-sm text-center text-muted-foreground">No Post Yet.</div>
            )}

            {loading && <PostSkeleton count={2} />}
        </div>
    );
}