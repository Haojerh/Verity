import { useCallback, useState } from "react";
import VotingSection from "../components/debate/VotingSection";
import StatsRow from "../components/debate/StatsRow";
import PostHeader from "../components/debate/PostHeader";
import CommentSection from "../components/debate/CommentSection";
import DebateMenu from "../components/homeDebate/DebateMenu";
import { Bookmark, Flag, LucideShare } from "lucide-react";
import ReportModal from "../components/debate/ReportModal";

const initialPost = {
  author: "debate_pioneer",
  title: "Is AI Art Real Art?",
  content: "With the rise of generative models, the definition of creativity is shifting. Does art require human intent, or is the final aesthetic result all that matters?",
  prosLabel: "It's Art",
  consLabel: "Not Art",
  date: "2024-04-26",
  images: [
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800",
    "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=800"
  ],
  statistics: {
    prosVotes: 5,
    consVotes: 3,
    totalParticipants: 8,
  },
};

const discussionData = [
  {
    id: 1, side: "pros", user: "art_lover", text: "Creativity is about the tool used, and AI is just a complex brush.", date: "2024-04-27",
    replies: [
      { id: 2, side: "cons", user: "purist_99", text: "A brush doesn't decide the composition for you based on a prompt.", date: "2024-04-29",
        replies: [{ id: 3, side: "pros", user: "tech_optimist", text: "The prompt IS the composition.", date: "2024-04-29", replies: [] }],
      },
    ],
  },
  { id: 4, side: "cons", user: "traditionalist", text: "Art is a human-to-human connection that AI simply cannot replicate.", replies: [] },
];

export default function PostPage() {
  const [userSide, setUserSide] = useState(null);
  const [activeTab, setActiveTab] = useState("pros");
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modal, setModal] = useState({
      type: null,
      entity: null
  });
  const [post, setPost] = useState(initialPost);

  const openModal = useCallback((type, entity) => {
    setModal({ type, entity });
  }, []);

  const closeModal = useCallback(() => {
    setModal({ type: null, entity: null });
  }, []);

  const handleSelectSide = (side) => {
    if (userSide) return;

    setUserSide(side);
    setActiveTab(side);

    setPost((prev) => {
      const updated = { ...prev };
      const stats = { ...updated.statistics };

      if (side === "pros") {
        stats.prosVotes += 1;
      } else {
        stats.consVotes += 1;
      }

      stats.totalParticipants += 1;
      updated.statistics = stats;
      return updated;
    });
  };

  return (
    <div className="max-w-4xl mx-auto w-full">
      <PostHeader
        post={post}
        fullscreenImage={fullscreenImage}
        setFullscreenImage={setFullscreenImage}
        setMenuOpen={setMenuOpen}
        menuOpen={menuOpen}
        openModal={openModal}
      />
      
      <VotingSection 
        post={post} 
        userSide={userSide} 
        handleSelectSide={handleSelectSide} 
      />

      <section className="bg-card border border-border rounded-lg p-6 mb-6">
        <h3 className="mb-3">Debate Summary</h3>
        <p className="text-muted-foreground">
          A heated debate about whether AI-generated imagery can be classified
          as true art. Both sides present compelling arguments about user
          experience, customization, ecosystem, and overall value.
        </p>
      </section>

      <StatsRow
        statistics={post.statistics} 
        commentCount={discussionData.length} 
      />

      <CommentSection
        post={post}
        userSide={userSide}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        discussionData={discussionData}
        openModal={openModal}
      />

      {/* Overlay */}
      {modal.type === "postReport" && (
        <ReportModal
          post={modal.entity}
          type="postReport"
          onClose={closeModal}
        />
      )}

      {modal.type === "commentReport" && (
        <ReportModal
          post={modal.entity}
          type="commentReport"
          onClose={closeModal}
        />
      )}
    </div>
  );
}