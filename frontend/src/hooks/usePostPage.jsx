import { useState, useMemo, useEffect, useCallback } from "react";
import { getPostComments, createPostComment } from "../services/CommentService";
import { getPostById, mapPostData } from "../services/PostService";
import { getPostStats, getUserStance, selectStance } from "../services/PostStanceService";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { getConsensusData } from "../services/PostService";

export const usePostPage = (postID) => {
  const { user } = useAuth();
  const { showToast } = useToast();
  
  // Data State
  const [post, setPost] = useState(null);
  const [mvp, setMvp] = useState("Loading...")
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
   * Manage the initial data load and user synchronization
   */
  const fetchData = useCallback(async () => {
    if (!postID) return;

    try {
      const [postData, commentResponse, statsData] = await Promise.all([
        getPostById(postID),
        getPostComments(postID),
        getPostStats(postID)
      ]);


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

      const actualComments = commentResponse?.comments || [];
      setComments(actualComments);

      setStats(statsData);
    } catch (err) {
      console.error("Fetch failed:", err);
    }
  }, [postID, user]);

  useEffect(() => { fetchData(); }, [fetchData]);

  useEffect(() => {
        const fetchInitialData = async () => {
            const postData = await getPostById(postID); 
            setPost(postData);

            if (postData) {
                try {
                    const consensusData = await getConsensusData(
                        postID, 
                        postData.proLabel, 
                        postData.conLabel
                    );
                    setMvp(consensusData.mvp || "No MVP");
                } catch (err) {
                    console.error("Error fetching MVP:", err);
                    setMvp("None");
                }
            }
        };

        fetchInitialData();
    }, [postID]);

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
      console.error("Comment submission failed:", err);
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
    totalParticipants: stats.totalParticipants,
    handleSubmitComment: () => handleCommentSubmit(commentText),
    handleSubmitReply: (id, text) => handleCommentSubmit(text, id),
    openModal: (type, entity) => setModal({ type, entity }),
    closeModal: () => setModal({ type: null, entity: null }),
    openFullscreenImage: setFullscreenImageIndex,
    closeFullscreenImage: () => setFullscreenImageIndex(null),
  };
};