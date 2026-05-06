import { useParams } from "react-router-dom";
import VotingSection from "../components/debate/VotingSection";
import StatsRow from "../components/debate/StatsRow";
import PostHeader from "../components/debate/PostHeader";
import CommentSection from "../components/debate/CommentSection";
import ReportModal from "../components/debate/ReportModal";
import ShareModal from "../components/debate/ShareModal";
import { usePostPage } from "../services/usePostPage";
import { countAllComments } from "../services/CommentService";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

export default function PostPage() {
  const { id: postID } = useParams();
  const {
    post, comments, commentText, totalComments, totalParticipants, setCommentText,
    userSide, userStanceLabel, activeTab, setActiveTab, modal, stats,
    handleStanceChange, handleSubmitComment, handleSubmitReply, openModal, closeModal,
    fullscreenImageIndex, openFullscreenImage, closeFullscreenImage
  } = usePostPage(postID);

  if (!post) return <div className="text-center py-10">Loading debate...</div>;

  console.log("Post Data:", post);

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
        userStanceLabel={userStanceLabel}
        handleStanceChange={handleStanceChange} 
        stats={stats}
      />

      {/* <section className="bg-card border border-border rounded-lg p-6 mb-6">
        <h3 className="mb-3">Debate Summary</h3>
        <p className="text-muted-foreground">{post.description}</p>
      </section> */}

      <StatsRow
        counts={{ totalParticipants, totalComments }}
        mvp={post?.mvp || "you_self12"}
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