import { useState } from "react";
import VotingSection from "../components/debate/VotingSection";
import StatsRow from "../components/debate/StatsRow";
import ThreadHeader from "../components/debate/ThreadHeader";
import CommentSection from "../components/debate/CommentSection";

export default function TopicPage() {
  const [userSide, setUserSide] = useState(null);
  const [activeTab, setActiveTab] = useState("pros");
  const [fullscreenImage, setFullscreenImage] = useState(null);

  const topic = {
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
      prosVotes: 1247,
      consVotes: 1589,
      totalParticipants: 2836,
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

  const handleSelectSide = (side) => {
    if (userSide) return;
    setUserSide(side);
    setActiveTab(side);
  };

  return (
    <div className="max-w-4xl mx-auto w-full">
      <ThreadHeader
        topic={topic}
        onImageClick={(i) => setSelectedImgIndex(i)}
      />
      
      <VotingSection 
        topic={topic} 
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
        statistics={topic.statistics} 
        commentCount={discussionData.length} 
      />

      <CommentSection
        topic={topic}
        userSide={userSide}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        discussionData={discussionData}
      />
    </div>
  );
}