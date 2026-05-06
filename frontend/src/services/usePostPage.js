import { useState, useMemo, useEffect, useCallback } from "react";
import { getPostComments, createPostComment, countAllComments } from "../services/CommentService";
import { getPostById, getPostStats, updatePostStance, getUserStance } from "../services/PostService";
import { useAuth } from "../context/AuthContext";

export const usePostPage = (postID) => {
  const { user } = useAuth(); 
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [userSide, setUserSide] = useState(null);
  const [userStanceLabel, setUserStanceLabel] = useState(null);
  const [activeTab, setActiveTab] = useState("pros");
  const [stats, setStats] = useState({ totalParticipants: 0, prosVotes: 0, consVotes: 0 });
  const [modal, setModal] = useState({ type: null, entity: null });
  const [fullscreenImageIndex, setFullscreenImageIndex] = useState(null);

  const fetchData = useCallback(async () => {
    if (!postID) return;

    try {
      const [postData, commentData, statsData] = await Promise.all([
        getPostById(postID),
        getPostComments(postID),
        getPostStats(postID)
      ]);

      if (user) {
        try {
          const stanceData = await getUserStance(postID);
          if (stanceData?.stance) {
            const normalizedSide = stanceData.stance.toLowerCase() === "cons" ? "cons" : "pros";
            setUserSide(normalizedSide);
            setActiveTab(normalizedSide);
            setUserStanceLabel(
              stanceData.stanceLabel || (normalizedSide === "pros" ? postData.proLabel : postData.conLabel)
            );
          }
        } catch (stanceErr) {
          console.warn("Could not fetch user stance:", stanceErr);
        }
      }

      const normalizeImageSource = (source) => {
        if (!source) return null;
        if (typeof source === "string") {
          return source.startsWith("http")
            ? source
            : `http://localhost:8080/api/uploads/posts/${source.replace(/^\/+/, "")}`;
        }
        if (typeof source === "object") {
          const candidate = source.url || source.path || source.imagePath || source.src || source.publicUrl;
          return normalizeImageSource(candidate);
        }
        return null;
      };

      const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return new Intl.DateTimeFormat("en-GB", {
          day: "numeric", month: "short", year: "numeric",
        }).format(date);
      };

      const normalizedPost = {
        ...postData,
        author: postData.authorName,
        date: formatDate(postData.SYSCREATEDDATE),
        topicName: postData.topicName || "General",
        proLabel: postData.proLabel || "Pros",
        conLabel: postData.conLabel || "Cons",
        images: postData.images
          ? postData.images.map(normalizeImageSource).filter(Boolean)
          : normalizeImageSource(postData.imagePath) ? [normalizeImageSource(postData.imagePath)] : undefined,
      };

      setPost(normalizedPost);
      setComments(commentData.comments ?? commentData ?? []);
      setStats(statsData);
    } catch (err) {
      console.error("Fetch failed:", err);
    }
  }, [postID, user]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleStanceChange = async (newStance) => {
    if (!user || userSide !== null) return;

    const apiStance = newStance === "cons" ? "CONS" : "PROS";

    try {
      await updatePostStance(postID, user.userID, apiStance);

      const updatedStats = await getPostStats(postID);
      setStats(updatedStats);
      setUserSide(newStance);
      setActiveTab(newStance);
      setUserStanceLabel(newStance === "cons" ? post?.conLabel : post?.proLabel);
    } catch (error) {
      console.error("Failed to save stance:", error);
    }
  };

  const handleSubmitComment = async () => {
    if (!commentText.trim() || !userSide) return;
    try {
      await createPostComment(postID, { text: commentText, side: activeTab });
      setCommentText("");
      fetchData();
    } catch (err) {
      console.error("Comment failed:", err);
    }
  };

  const handleSubmitReply = async (parentCommentID, text) => {
    if (!text?.trim() || !userSide) return;
    try {
      await createPostComment(postID, {
        text,
        side: activeTab,
        parentCommentID,
      });
      fetchData();
    } catch (err) {
      console.error("Reply failed:", err);
    }
  };

  const totalComments = useMemo(() => countAllComments(comments), [comments]);

  const openModal = useCallback((type, entity) => setModal({ type, entity }), []);
  const closeModal = useCallback(() => setModal({ type: null, entity: null }), []);
  const openFullscreenImage = useCallback((index) => setFullscreenImageIndex(index), []);
  const closeFullscreenImage = useCallback(() => setFullscreenImageIndex(null), []);

  return {
    post,
    comments,
    commentText,
    totalComments,
    totalParticipants: stats.totalParticipants,
    setCommentText,
    userSide,
    userStanceLabel,
    activeTab,
    setActiveTab,
    modal,
    stats,
    handleStanceChange,
    handleSubmitComment,
    handleSubmitReply,
    openModal,
    closeModal,
    fullscreenImageIndex,
    openFullscreenImage,
    closeFullscreenImage,
  };
};