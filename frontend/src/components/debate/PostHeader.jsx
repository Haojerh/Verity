import { useState } from "react";
import Avatar from "../ui/Avatar";
import { Flag, LucideShare, MoreVertical, Trash2, Edit3 } from "lucide-react";
import DebateImages from "../ui/DebateImages";
import ImageModal from "../ui/ImageModal";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { isModerator, isAdmin } from "../../utils/Utils";
import { deletePost } from "../../services/PostService";

export default function PostHeader({ 
  post, 
  openModal,
  setIsEditing,
  handleDeletePost,
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
    description, 
    images, 
    date, 
    topicName, 
    title,
    authorImageUrl
  } = post;
  
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
            <div className="absolute right-0 top-8 mt-2 w-52 bg-background border border-border rounded-xl shadow-xl z-50 overflow-hidden animate-in zoom-in-95 duration-200">
              
              {/* SHARE*/}
              <button 
                onClick={() => { openModal("share", post); setMenuOpen(false); }}
                className="flex gap-3 p-4 w-full hover:bg-muted text-sm font-semibold items-center transition-all"
              >
                <LucideShare className="w-4 h-4 text-primary" /> Share 
              </button>

              {/* OWNER/ADMIN MANAGEMENT SECTION */}
              {(authUser?.userID === authorID || isAdmin(authUser)) ? (
                <>
                  <div className="h-[1px] bg-border mx-2" />
                  <div className="px-4 py-2 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                    Management
                  </div>
                  
                  <button 
                    onClick={() => { setIsEditing(true); setMenuOpen(false); }}
                    className="flex gap-3 p-4 w-full hover:bg-muted text-sm font-semibold items-center transition-all"
                  >
                    <Edit3 className="w-4 h-4 text-blue-500" /> Edit Details
                  </button>

                  <button 
                    onClick={() => {
                      if (window.confirm("Permanently delete this debate?")) {
                        handleDeletePost(post.postID);
                      }
                      setMenuOpen(false);
                    }}
                    className="flex gap-3 p-4 w-full hover:bg-red-50 text-red-600 text-sm font-bold items-center transition-all"
                  >
                    <Trash2 className="w-4 h-4" /> Delete Post
                  </button>
                </>
              ) : (
                /* 3. VISITOR REPORT SECTION */
                <>
                  <div className="h-[1px] bg-border mx-2" />
                  <button 
                    onClick={() => { openModal("postReport", post); setMenuOpen(false); }}
                    className="flex gap-3 p-4 w-full text-destructive hover:bg-destructive/5 text-sm font-bold items-center transition-all"
                  >
                    <Flag className="w-4 h-4" /> Report Violation
                  </button>
                </>
              )}
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
          {description}
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
