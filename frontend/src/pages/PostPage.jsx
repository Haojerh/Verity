import { useParams } from "react-router-dom";
import VotingSection from "../components/debate/VotingSection";
import StatsRow from "../components/debate/StatsRow";
import PostHeader from "../components/debate/PostHeader";
import CommentSection from "../components/debate/CommentSection";
import ReportModal from "../components/debate/ReportModal";
import ShareModal from "../components/debate/ShareModal";
import { usePostPage } from "../hooks/usePostPage";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import TakedownModal from "../components/debate/TakedownModal";
import { useNavigate } from "react-router-dom";

export default function PostPage() {
  const navigate = useNavigate();
  const { id: postID } = useParams();
  const {
    post, comments, setComments, commentText, totalComments, totalParticipants, setCommentText,
    userSide, userStanceLabel, activeTab, fetchData, setActiveTab, modal, stats,
    handleStanceChange, handleSubmitComment, handleSubmitReply, openModal, closeModal,
    fullscreenImageIndex, openFullscreenImage, closeFullscreenImage
  } = usePostPage(postID);

  if (!post) return <div className="text-center py-10">Loading debate...</div>;

  const removeCommentById = (list, id) => {
    return list
      .filter(c => c.id !== id)
      .map(c => ({
        ...c,
        replies: c.replies ? removeCommentById(c.replies, id) : []
      }));
  };

  const [mvp, setMvp] = useState("Loading...");

  useEffect(() => {
    const loadData = async () => {
      const data = await getConsensusData(postID, post.proLabel, post.conLabel);
      setMvp(data.mvp); 
      setHighlights(data.highlights);
    };
    loadData();
  }, [postID]);

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
          entity={modal.entity}
          type="postReport"
          onClose={closeModal}
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
            // setComments(prev => removeCommentById(prev, modal.entity.id));
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
          onSuccess={() => {
            navigate("/");
          }}
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
