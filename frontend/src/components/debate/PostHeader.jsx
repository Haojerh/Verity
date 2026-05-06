import { useState } from "react";
import Avatar from "../ui/Avatar";
import { Flag, LucideShare, MoreVertical } from "lucide-react";
import DebateImages from "../ui/DebateImages";
import ImageModal from "../ui/ImageModal";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function PostHeader({ 
  post, 
  openModal,
  fullscreenImageIndex,
  openFullscreenImage,
  closeFullscreenImage
}) {
  const navigate = useNavigate();
  const { user: authUser } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const { 
    authorID,
    author, 
    content, 
    images, 
    date, 
    topicName, 
    title,
    authorImageUrl
  } = post;

  const isModerator = authUser?.userRole?.toUpperCase() === "MODERATOR";
  const isAdmin = authUser?.userRole?.toUpperCase() === "ADMINISTRATOR";
  
  return (
    <section className="space-y-3 mb-10">
      <div className="flex justify-between gap-2">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
          <button className="text-primary border border-secondary px-3 py-1 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-primary/5 hover:scale-105 transition-all">
            {topicName}
          </button>
          <span>•</span>
          <span>{date}</span>
        </div>

        <div className="relative">
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <MoreVertical className="w-5 h-5 text-muted-foreground" />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-8 mt-2 w-40 bg-background border rounded-lg shadow-lg dark:shadow-dark-lg">
              <button 
                onClick={() => openModal("share", post)}
                className="flex gap-2 p-3 w-full hover:bg-muted/50 items-center">
                <LucideShare className="w-4 h-4"/> Share
              </button>
              <button 
                onClick={() => openModal((isModerator || isAdmin) ? "postTakedown" : "postReport", post)}
                className="flex gap-2 p-3 w-full text-destructive hover:bg-muted/50 items-center"
              >
                <Flag className="w-4 h-4"/> 
                {(isModerator || isAdmin) ? "Takedown" : "Report"}
              </button>
            </div>
          )}
        </div>
      </div>

      <h1 className="text-5xl sm:text-6xl font-serif font-bold text-foreground tracking-tight leading-[1.1] pb-8 border-b-2 border-muted">
        {title}
      </h1>

      <div className="space-y-2 pt-4">
        <div 
        onClick={() => navigate(`/profile/${authorID}`)}
        className="flex gap-2 items-center text-xs cursor-pointer w-fit">
          <Avatar name={author} size="sm" imageUrl={authorImageUrl} />
          <span className="text-xs font-bold text-secondary uppercase tracking-tighter">
            @{author}
          </span>
        </div>

        <p className="text-xl font-serif text-muted-foreground leading-relaxed italic">
          {content}
        </p>

        {images && (
          <>
            <DebateImages 
              images={images} 
              onImageClick={(i) => openFullscreenImage(i)} 
              type="thread"
            />

            <ImageModal
              images={images}
              index={fullscreenImageIndex}
              setIndex={openFullscreenImage}
              onClose={closeFullscreenImage}
            />
          </>
        )}

      </div>
    </section>
  );
}
