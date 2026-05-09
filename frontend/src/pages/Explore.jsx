import TopicCard from "../components/topic/TopicCard";
import Header from "../components/ui/Header";
import { useState, useEffect } from "react";
import { getTopics } from "../services/TopicService";
import { getFavorites, createFavorite, deleteFavorite } from "../services/FavoriteService";

export default function Explore() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [topicRes, favRes] = await Promise.all([
          getTopics(),
          getFavorites(),
        ]);

        const topicsArray = topicRes.topics;

        // Extract favorite topic IDs
        const favArray = favRes.favorites;
        const favIds = new Set(favArray.map(f => f.topicID));

        const updated = topicsArray.map((topic) => ({
          ...topic,
          avatar: `http://localhost:8080/api/uploads/topics/${topic.avatar}`,
          banner: `http://localhost:8080/api/uploads/topics/${topic.banner}`,
          isFollowed: favIds.has(topic.topicID),
        }));

        setTopics(updated);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  const handleFollowToggle = async (topicID) => {
    setTopics((prev) =>
      prev.map((t) =>
        t.topicID === topicID
          ? { ...t, isFollowed: !t.isFollowed }
          : t
      )
    );

    try {
      const topic = topics.find(t => t.topicID === topicID);

      if (topic.isFollowed) {
        await deleteFavorite(topicID);
      } else {
        await createFavorite(topicID);
      }
    } catch (err) {
      console.error("Follow toggle failed:", err);
      // Rollback UI if fail
      setTopics((prev) =>
        prev.map((t) =>
          t.topicID === topicID
            ? { ...t, isFollowed: !t.isFollowed }
            : t
        )
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Header title="Explore" desc="Discover and follow your interests" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {topics.map((topic) => (
          <TopicCard key={topic.topicID} topic={topic} onFollowToggle={handleFollowToggle} />
        ))}

        {topics.length === 0 && (
            <div className="text-sm text-center text-muted-foreground">No Topic Yet.</div>
        )}
      </div>
    </div>
  );
}
