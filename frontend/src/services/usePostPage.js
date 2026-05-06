import { useState, useMemo, useEffect, useCallback } from "react";
import { getPostComments, createPostComment, countAllComments } from "../services/CommentService";
import { getPostById, mapPostData } from "../services/PostService";
import { getPostStats, getUserStance, selectStance } from "../services/PostStanceService";
import { useAuth } from "../context/AuthContext";

export const usePostPage = (postID) => {
  const { user } = useAuth();
  
  // Data State
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [stats, setStats] = useState({ totalParticipants: 0, prosVotes: 0, consVotes: 0 });
  
  // User Stance State
  const [userSide, setUserSide] = useState(null);
  const [userStanceLabel, setUserStanceLabel] = useState(null);
  
  // UI State
  const [activeTab, setActiveTab] = useState("pros");
  const [commentText, setCommentText] = useState("");
  const [modal, setModal] = useState({ type: null, entity: null });
  const [fullscreenImageIndex, setFullscreenImageIndex] = useState(null);

  /**
   * Orchestrates the initial data load and user synchronization
   */
  const fetchData = useCallback(async () => {
    if (!postID) return;

    try {
      const [postData, commentData, statsData] = await Promise.all([
        getPostById(postID),
        getPostComments(postID),
        getPostStats(postID)
      ]);

      // Handle user-specific participation status
      if (user) {
        const stanceLabel = await getUserStance(postID, user.userID);
        if (stanceLabel?.trim()) {
          const side = stanceLabel.toUpperCase() === postData.conLabel?.toUpperCase() ? "cons" : "pros";
          setUserSide(side);
          setActiveTab(side);
          setUserStanceLabel(stanceLabel);
        }
      }

      setPost(mapPostData(postData));
      setComments(commentData.comments ?? commentData ?? []);
      setStats(statsData);
    } catch (err) {
      console.error("Fetch failed:", err);
    }
  }, [postID, user]);

  useEffect(() => { fetchData(); }, [fetchData]);

  /**
   * Action Handlers
   */
  const handleStanceChange = async (newStance) => {
    if (!user || userSide !== null) return;

    try {
      await selectStance(postID, user.userID, newStance.toUpperCase());
      
      // Update local state without a full page re-fetch
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
    try {
      await createPostComment(postID, { text, side: activeTab, parentCommentID: parentID });
      setCommentText("");
      fetchData(); 
    } catch (err) {
      console.error("Comment submission failed:", err);
    }
  };

  // Memoized derived data
  const totalComments = useMemo(() => countAllComments(comments), [comments]);

  return {
    post, comments, commentText, stats, totalComments,
    userSide, userStanceLabel, activeTab, modal, fullscreenImageIndex,
    setCommentText, setActiveTab,
    handleStanceChange,
    totalParticipants: stats.totalParticipants,
    handleSubmitComment: () => handleCommentSubmit(commentText),
    handleSubmitReply: (id, text) => handleCommentSubmit(text, id),
    openModal: (type, entity) => setModal({ type, entity }),
    closeModal: () => setModal({ type: null, entity: null }),
    openFullscreenImage: setFullscreenImageIndex,
    closeFullscreenImage: () => setFullscreenImageIndex(null),
  };
};