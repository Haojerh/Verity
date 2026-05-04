import { useState, useCallback, useEffect } from "react";
import TopicCard from "../components/topic/TopicCard";
import SearchBar from "../components/ui/SearchBar";
import Header from "../components/ui/Header";
import TopicActions from "../components/topic/TopicActions";
import NewTopicModal from "../components/topic/NewTopicModal";
import EditTopicModal from "../components/topic/EditTopicModal";
import DeleteTopicModal from "../components/topic/DeleteTopicModal";
import { getTopics } from "../services/TopicService";

export default function TopicManagement() {
  const [topics, setTopics] = useState([]);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState({
      type: null,
      topic: null
  });

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const res = await getTopics();
        const topicsArray = res.topics;
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

  const openModal = useCallback((type, topic) => {
    setModal({ type, topic });
  }, []);

  const closeModal = useCallback(() => {
    setModal({ type: null, topic: null });
  }, []);

  const filteredTopics = topics.filter((topic) =>
    topic?.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto">
      <Header title="Topic Management" desc="Add, edit or delete topics in the system" />

      <div className="flex flex-row justify-between gap-4 flex-wrap mb-8">
        <SearchBar 
        value={search}
        onChange={setSearch}
        placeholder="Find topics by name..." />
        <button 
        onClick={() => openModal("new", null)}
        className="px-4 py-1.5 text-white bg-primary hover:bg-secondary rounded-md transition-all" >+ New Topic</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredTopics.map((topic) => (
          <TopicCard
            key={topic.topicID}
            topic={topic}
            onAction={openModal}
          />
        ))}
      </div>

      {/* Overlay */}
      {modal.type === "new" && (
        <NewTopicModal
          setTopics={setTopics}
          onClose={closeModal}
        />
      )}

      {modal.type === "edit" && (
        <EditTopicModal
          topic={modal.topic}
          onClose={closeModal}
          setTopics={setTopics}
        />
      )}

      {modal.type === "delete" && (
        <DeleteTopicModal
          topic={modal.topic}
          setTopics={setTopics}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
