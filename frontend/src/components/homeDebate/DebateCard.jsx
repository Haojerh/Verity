import DebateHeader from "./DebateHeader";
import DebateImages from "../ui/DebateImages";
import VoteBar from "./VoteBar";
import ActionBar from "./ActionBar";
import ImageModal from "../ui/ImageModal";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function DebateCard({ debate }) {
  const navigate = useNavigate();

  const [fullscreenImage, setFullscreenImage] = useState(null);

  return (
    <div
      onClick={() => navigate(`/post/${debate.postID}`)}
      className="relative bg-card border rounded-lg p-4 cursor-pointer hover:shadow dark:hover:shadow-dark"
    >
      <DebateHeader debate={debate} />

      <h3 className="text-lg font-medium mb-1">{debate.title}</h3>
      <p className="text-muted-foreground text-sm mb-6">
        {debate.description}
      </p>

      <DebateImages images={debate.imagePath} onImageClick={(i) => setFullscreenImage(i)}/>

      <VoteBar debate={debate} />

      <ActionBar debate={debate} />

      <ImageModal
        images={debate.imagePath}
        index={fullscreenImage}
        setIndex={setFullscreenImage}
        onClose={() => setFullscreenImage(null)}
      />
    </div>
  );
}