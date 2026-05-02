import { useState, useCallback } from "react";
import TopicCard from "../components/topic/TopicCard";
import SearchBar from "../components/ui/SearchBar";
import Header from "../components/ui/Header";
import TopicActions from "../components/topic/TopicActions";
import NewTopicModal from "../components/topic/NewTopicModal";
import EditTopicModal from "../components/topic/EditTopicModal";
import DeleteTopicModal from "../components/topic/DeleteTopicModal";

export default function TopicManagement() {
  // const [topics, setTopics] = useState(null);

  // const handleAddTopic = (newTopic) => {
  //   setTopics((prev) => [
  //     ...prev,
  //     {
  //       ...newTopic
  //     },
  //   ]);
  // };

  const topics = [
    {
      id: 1,
      title: "Technology",
      description:
        "Discuss the future of AI, robotics, and digital infrastructure in modern society.",
      cover:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCZBP0yl_RXVQpzssaA1PLAuDKvx3nyddLU3N7r7eDP0cE9B7ZDMo9VfQvVIMI23oVmxXfKBheA14nUq81tU2-HliViVQ6WjAJlChCCxo9arcYRvmPBUmWCgsRb0lRRfpaTYYXmEDIaDgmeyLyXmTWXJtcQLc6WsnYKu-uMqUKJJmnuG5deAIOxTVBtzv-WxI6cqImu7spToWydQEawx5zjJKM3BnuI2K3_34N4NKLsn-xfOBu5zNPxoZtFQ3XScJSgXBW52Hubhek",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDTwsJjpS_QrjYKaUIKEPZbJZOa_nre-Hci0fwVbIAN4NfZESmmOxoPLhl4Ij_ShlXFccojR_chFfdlmtLvLc8XunpNushoYC6n0ip5g-u5KuvXWUYvgzXiep8P5QLh9fvB_TdUxhatVwDKgwbxZ60UF37cV4fWE9y03FULFJNtzHOXTAcmyU68IonUud_s5ggJLdbRONtDMLbgwAms-izQbH8wDlKJjwwkU9ZkdjldhOoMFMy7yS7UOt8yS6f6vFw-Ajn0gv5AeNM",
    },
    {
      id: 2,
      title: "Philosophy",
      description:
        "Timeless debates about ethics, metaphysics, and the fundamental nature of existence.",
      cover:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBXny-V4IW8zHAxtrMNIzAz-QKo9zmfbhUPz9sgQMQfgbyd2hZbwIASRpjT6wZr7cffSCaV4sFb4KElijCVS3MmN__1QDD34vUuvki3yMlx_GNwBhKlSJN7Ww9pdxEhmkYAkeEJzGFBGTBPP-w-1urRTQBgl3JfUDD21TIBLmqcvrZCqPBeS-vuGmCwfE75U_5qQG50KoZUXpTHiecVhquv1HxsZvYjg9QJNPiBdnPy79dwhW7km8O4QZWpfi6iCi5zYrjWbhqB6z4",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuC4r4qOrTtCVsC0M93TJ5oCPM0j5sRbikgsWpNw196kOuj7oLAbZJzwQuOUQWmxvogz__RMywnTdWsDIK599ANA8hX59SG1cvhMgUOB_Td-nbTOdq40Xw6dfDNlINi1fSZ0FhlKVcw-RACZE03oDWqkAeP0iti2fUo9K14D-IXXwkXAYo0d0P6ZHR86WC3mYgakVLEyu2x-iPCqhaxMBTLig3Dm8vN2NLlk7Tb-Y9xVwSB3jxc52gI3NDMeJZMBHEJPwuUe_jPEH1Q",
    },
    {
      id: 3,
      title: "Science",
      description:
        "From quantum physics to biodiversity, explore evidence-based truths about our world.",
      cover:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCMmEkD8IkBaAJwuepE5gRjsX7440lXNDwM8sjWrQvPsd78iMA-MteVJxKTiA0c31X61HlzJ97DoVqbonXJfjsFW_7fUGAP5uKo1xIbPJIyhYipIjusQEd9XnrBpV2uQVKsjP1N2gbHj_CBA5L6EuSnWmoJ5MrfOA3nh7N86ylhgFnRbXndNl20ijLV5F7EgB5ivM065r5QAsNzfxKQqTRHGV8-RwcMIy9lJTPTj0UqdkV3JWfHJy5UewTVbcdHsGlAWkotlinOeuc",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDNeVC5V8n8qY4EwymLAfNkKtSrOmiKlLuMjbWy12H2CfvrY26rzm_8Nwdu41ygTOFfby6Cj1TWJ3GQWwvVOxtLa934OBlE1scZI29_iQjWC5QoBlsxnoYZ3Z3sf5W1vDgEKKKR6mUfasxAbNOVlXmTEtyP2N52j05yHqz5UCJem3U_NHt3pnCYqm4lJBWT41as25OXSrNHOY833G6FknbsVAJUlAo_eZGpsz-q_19-qTS0JKLl47iCUnPgYZDQkJzz_e-xuIjkva8",
    },
    {
      id: 4,
      title: "Arts & Design",
      description:
        "Analyze the evolution of aesthetics, architecture, and visual communication.",
      cover:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAfoGYD4aFbkRMw2S6wtEZ0weHzPWZHW5TuNyW66eLIUQV4SscXHXZNlfSanc2-0-e-Xo-5E-3T4D0y_EgfGojpW_xFwOgdMO5i28vH2Lr0wyaowxBe4COArF6E-FlwztHfmgvGU26cvceDkviVa8KQvIZCnAfKY0z5_QqI1Ot8Y2L6V_3z19KY487OPfBJp0KGByo3yWhAqg1mUQY30lHt2sTM5lXpKxeIAnrDoEJuCAIeAZKNL1bsyg-NVYBzYQ9eDsRIeT5yrwA",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuC5Nn5ERumYsQ8pBKS2gMGAMwaXPQnotRhxO1Shr_7jS20xrvIDJtgCsoTeD7t_23YbizaYSzEvH5BNPycqpAgZVpjLnSL1ONaVivj9F8WSnzhqc32A1t7qH2za6NqN_TsCPzfCb6Gko7RxMQXPd0JeKWrUixH12YYTNF24_EUibXZ2sPbrWuT3sKrq1BDqd7Mm2ysLzBt09W0Gvx8ULTbkcSGfVNOIwVNClLUAdZe0YYlZJ8Mfa6inyd4Wpi9I2DK0SpSllLie6s8",
    },
  ];

  const [search, setSearch] = useState("");
  const [modal, setModal] = useState({
      type: null,
      topic: null
  });

  const openModal = useCallback((type, topic) => {
    setModal({ type, topic });
  }, []);

  const closeModal = useCallback(() => {
    setModal({ type: null, topic: null });
  }, []);

  const filteredTopics = topics.filter((topic) =>
    topic.title.toLowerCase().includes(search.toLowerCase())
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
            key={topic.id}
            topic={topic}
            onAction={openModal}
          />
        ))}
      </div>

      {/* Overlay */}
      {modal.type === "new" && (
        <NewTopicModal
          onClose={closeModal}
        />
      )}

      {modal.type === "edit" && (
        <EditTopicModal
          topic={modal.topic}
          onClose={closeModal}
        />
      )}

      {modal.type === "delete" && (
        <DeleteTopicModal
          topic={modal.topic}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
