import { useLocation, useParams } from "react-router-dom";
import TopicHeader from "../components/topic/TopicHeader";
import DebateCard from "../components/homeDebate/DebateCard";
import { getTopicById } from "../services/TopicService";
import { useState, useEffect } from "react";
import { getFavorites, deleteFavorite, createFavorite } from "../services/FavoriteService";

export default function ExploreDetail() {
    const { id } = useParams();
    const [topic, setTopic] = useState(null);
    const [isFollowed, setIsFollowed] = useState(false);

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
        <div>
            <TopicHeader 
              topic={topic}
              isFollowed={isFollowed}
              onFollowToggle={handleFollowToggle}
            />
        </div>
    );
}