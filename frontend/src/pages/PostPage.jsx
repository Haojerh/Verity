import { useParams, useNavigate } from "react-router-dom";
import VotingSection from "../components/debate/VotingSection";
import StatsRow from "../components/debate/StatsRow";
import PostHeader from "../components/debate/PostHeader";
import CommentSection from "../components/debate/CommentSection";
import ReportModal from "../components/debate/ReportModal";
import ShareModal from "../components/debate/ShareModal";
import TakedownModal from "../components/debate/TakedownModal";
import UpdatePostForm from "../components/createPost/UpdatePostForm"; 
import DebateSummary from "../components/debate/DebateSummary";
import { usePostPage } from "../hooks/usePostPage";
import { useAuth } from "../context/AuthContext";
import { ArrowLeft } from "lucide-react";
import DelelePostModal from "../components/debate/DeletePostModal";
import { Helmet } from "react-helmet-async";

export default function PostPage() {
  const navigate = useNavigate();
  const { id: postID } = useParams();
  const { user } = useAuth(); 

  const {
    post, comments, mvp, totalComments, totalParticipants, commentText,
    userSide, userStanceLabel, activeTab, stats, modal, isEditing,
    setCommentText, fetchData, setActiveTab, handleStanceChange, topics, 
    handleDeletePost, handleSubmitComment, handleSubmitReply, 
    openModal, closeModal, setIsEditing, handleUpdatePost,
    fullscreenImageIndex, openFullscreenImage, closeFullscreenImage
  } = usePostPage(postID);

  if (!post) return <div className="text-center py-10 text-muted-foreground">Loading debate...</div>;

  return (
    <div className="max-w-4xl mx-auto w-full px-4 sm:px-0">
      <Helmet>
        <title>{post.title}</title>
        <meta name="description" content={post.description?.slice(0, 155)} />
        <meta name="author" content={post.authorName} />
      </Helmet>

      {isEditing ? (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <button 
            onClick={() => setIsEditing(false)}
            className="mb-6 text-sm font-bold text-muted-foreground hover:text-primary transition-all flex items-center gap-2"
          >
            <ArrowLeft size={16} /> Back to Debate
          </button>
          <UpdatePostForm 
            post={post} 
            topics={topics} 
            onSubmit={handleUpdatePost} 
          />
        </div>
      ) : (
        <>
          <PostHeader 
            post={post} 
            openModal={openModal}
            setIsEditing={setIsEditing} 
            handleDeletePost={handleDeletePost} 
            fullscreenImageIndex={fullscreenImageIndex}
            openFullscreenImage={openFullscreenImage}
            closeFullscreenImage={closeFullscreenImage}
          />
          
          <VotingSection 
            post={post} 
            userSide={userSide} 
            userStanceLabel={userStanceLabel}
            handleStanceChange={handleStanceChange} 
            stats={stats}
          />

          <DebateSummary postID={post.postID} />

          <StatsRow
            counts={{ totalParticipants, totalComments }}
            mvp={mvp}
          />

          <CommentSection
            post={post}
            userSide={userSide}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            comments={comments}
            commentText={commentText}
            setCommentText={setCommentText}
            onSubmitComment={handleSubmitComment}
            onSubmitReply={handleSubmitReply}
            openModal={openModal}
          />
        </>
      )}

      {/* --- Overlay Section --- */}

      {/* Handles both reporting for visitors and management for owners */}
      {modal.type === "postReport" && (
      <ReportModal
        entity={modal.entity}
        type="postReport"
        onClose={closeModal}
        onEdit={() => setIsEditing(true)}
        onDelete={
          (user?.userID === modal.entity.authorID || user?.role === "ADMIN") 
            ? handleDeletePost 
            : null
        }
      />
    )}

      {modal.type === "commentReport" && (
        <ReportModal
          entity={modal.entity}
          type="commentReport"
          onClose={closeModal}
        />
      )}

      {modal.type === "commentTakedown" && (
        <TakedownModal
          entity={modal.entity}
          type="comment"
          onClose={closeModal}
          onSuccess={() => {
            fetchData();
            closeModal();
          }}
        />
      )}

      {modal.type === "postTakedown" && (
        <TakedownModal
          entity={modal.entity}
          type="post"
          onClose={closeModal}
          onSuccess={() => navigate("/")}
        />
      )}

      {modal.type === "delete" && (
        <DelelePostModal
          entity={modal.entity}
          onClose={closeModal}
          onSuccess={() => navigate("/")}
        />
      )}

      {modal.type === "share" && (
        <ShareModal
          post={modal.entity}
          onClose={closeModal}
        />
      )}
    </div>
  );
}