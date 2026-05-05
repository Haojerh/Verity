import { useParams } from "react-router-dom";
import VotingSection from "../components/debate/VotingSection";
import StatsRow from "../components/debate/StatsRow";
import PostHeader from "../components/debate/PostHeader";
import CommentSection from "../components/debate/CommentSection";
import ReportModal from "../components/debate/ReportModal";
import ShareModal from "../components/debate/ShareModal";
import { usePostPage } from "../services/usePostPage";

export default function PostPage() {
  const { id: postID } = useParams();
  const {
    post, comments, commentText, setCommentText,
    userSide, activeTab, setActiveTab, modal,
    handleSelectSide, handleSubmitComment, handleSubmitReply, openModal, closeModal,
    fullscreenImageIndex, openFullscreenImage, closeFullscreenImage
  } = usePostPage(postID);

  console.log("Post data:", post);

  if (!post) return <div className="text-center py-10">Loading debate...</div>;

  return (
    <div className="max-w-4xl mx-auto w-full">
      <PostHeader 
        post={post} 
        openModal={openModal}
        fullscreenImageIndex={fullscreenImageIndex}
        openFullscreenImage={openFullscreenImage}
        closeFullscreenImage={closeFullscreenImage}
      />
      
      <VotingSection 
        post={post} 
        userSide={userSide} 
        handleSelectSide={handleSelectSide} 
      />

      {/* <section className="bg-card border border-border rounded-lg p-6 mb-6">
        <h3 className="mb-3">Debate Summary</h3>
        <p className="text-muted-foreground">{post.description}</p>
      </section> */}

      <StatsRow
        statistics={post.statistics}
        commentCount={comments.length}
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

      {modal.type === "share" && (
        <ShareModal
          post={modal.entity}
          onClose={closeModal}
        />
      )}
    </div>
  );
}