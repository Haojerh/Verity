import { useState, useMemo, useEffect, useCallback } from "react";
import { getPostComments, createPostComment } from "../services/CommentService";
import { getPostById, mapPostData, getConsensusData, deletePost, updatePost } from "../services/PostService"; 
import { getTopics } from "../services/TopicService";
import { getPostStats, getUserStance, selectStance } from "../services/PostStanceService";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { useNavigate } from "react-router-dom";

export const usePostPage = (postID) => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Data State
  const [post, setPost] = useState(null);
  const [mvp, setMvp] = useState("Loading...");
  const [comments, setComments] = useState([]);
  const [stats, setStats] = useState({ totalParticipants: 0, prosVotes: 0, consVotes: 0 });
  const [topics, setTopics] = useState([]); 
  
  // UI State
  const [isEditing, setIsEditing] = useState(false);
  const [userSide, setUserSide] = useState(null);
  const [userStanceLabel, setUserStanceLabel] = useState(null);
  const [activeTab, setActiveTab] = useState("pros");
  const [commentText, setCommentText] = useState("");
  const [modal, setModal] = useState({ type: null, entity: null });
  const [fullscreenImageIndex, setFullscreenImageIndex] = useState(null);

  const fetchData = useCallback(async () => {
    if (!postID) return;

    try {
      // 1. Fetch all data in parallel for speed
      const [postResponse, commentResponse, statsData, topicResponse] = await Promise.all([
        getPostById(postID),
        getPostComments(postID),
        getPostStats(postID),
        getTopics() 
      ]);

      const extractedTopics = topicResponse?.topics || [];
      
      setTopics(Array.isArray(extractedTopics) ? extractedTopics : []);

      const mappedPost = mapPostData(postResponse);
      setPost(mappedPost);

      setComments(commentResponse?.comments || []);
      setStats(statsData);

      try {
        const consensusData = await getConsensusData(postID);
        setMvp(consensusData.mvp || "No MVP");
      } catch (err) {
        setMvp("None");
      }

      if (user) {
        const stanceLabel = await getUserStance(postID, user.userID);
        if (stanceLabel?.trim()) {
          const side = stanceLabel.toUpperCase() === postResponse.conLabel?.toUpperCase() ? "cons" : "pros";
          setUserSide(side);
          setActiveTab(side);
          setUserStanceLabel(stanceLabel);
        }
      }
    } catch (err) {
      console.error("Fetch failed:", err);
      showToast("Failed to load debate data");
    }
  }, [postID, user, showToast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDeletePost = async (targetID) => {
    try {
      await deletePost(targetID);
      showToast("Post deleted successfully");
      navigate("/");
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to delete post");
    }
  };

  const handleUpdatePost = async (formData) => {
    try {
      await updatePost(postID, formData);
      showToast("Post updated successfully");
      setIsEditing(false);
      await fetchData(); 
    } catch (err) {
      showToast(err.response?.data?.message || "Update failed");
    }
  };

  const handleStanceChange = async (newStance) => {
    if (!user || userSide !== null) return;
    try {
      await selectStance(postID, user.userID, newStance.toUpperCase());
      const updatedStats = await getPostStats(postID);
      setStats(updatedStats);
      setUserSide(newStance);
      setActiveTab(newStance);
      setUserStanceLabel(newStance === "cons" ? post?.conLabel : post?.proLabel);
    } catch (err) {
      console.error("Stance update failed:", err);
    }
  };

  const handleCommentSubmit = async (text, parentID = null) => {
    if (!text.trim() || !userSide) return;
    const currentTab = activeTab;

    try {
      await createPostComment(postID, { text, side: activeTab, parentCommentID: parentID });
      setCommentText("");
      await fetchData();
      setActiveTab(currentTab);
      showToast("Comment Posted");
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to comment");
    }
  };

  const totalComments = useMemo(() => {
    return comments.length > 0 ? (comments[0].totalComments || 0) : 0;
  }, [comments]);

  return {
    post, mvp, comments, setComments, commentText, stats, totalComments,
    userSide, userStanceLabel, activeTab, modal, fullscreenImageIndex,
    setCommentText, setActiveTab, fetchData,
    handleStanceChange,
    isEditing, setIsEditing,
    handleDeletePost,
    handleUpdatePost,
    topics,
    totalParticipants: stats.totalParticipants,
    handleSubmitComment: () => handleCommentSubmit(commentText),
    handleSubmitReply: (id, text) => handleCommentSubmit(text, id),
    openModal: (type, entity) => setModal({ type, entity }),
    closeModal: () => setModal({ type: null, entity: null }),
    openFullscreenImage: setFullscreenImageIndex,
    closeFullscreenImage: () => setFullscreenImageIndex(null),
  };
};