import TopicCard from "../components/topic/TopicCard";
import Header from "../components/ui/Header";
import { useState, useEffect } from "react";
import { getTopics } from "../services/TopicService";

export default function Explore() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const res = await getTopics();
        const topicsArray = res.data.data.topics;
        const updated = topicsArray.map((topic) => ({
          ...topic,
          avatar: `http://localhost:8080/api/uploads/topics/${topic.avatar}`,
          banner: `http://localhost:8080/api/uploads/topics/${topic.banner}`,
        }));

        setTopics(updated);
      } catch (err) {
        console.error("Error fetching topics:", err);
      }
    };

    fetchTopics();
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <Header title="Explore" desc="Discover and follow your interests" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {topics.map((topic) => (
          <TopicCard key={topic.id} topic={topic} />
        ))}
      </div>
    </div>
  );
}
