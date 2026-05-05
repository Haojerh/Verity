import { useState, useMemo, useEffect, useCallback } from "react";
import { getPostComments, createPostComment, countAllComments } from "../services/CommentService";
import { getPostById, getPostStats, updatePostStance, getUserStance } from "../services/PostService";
import { getCurrentUserID } from "../services/UserService";

export const usePostPage = (postID) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [userSide, setUserSide] = useState(null);
  const [activeTab, setActiveTab] = useState("pros");
  const [modal, setModal] = useState({ type: null, entity: null });
  const [fullscreenImageIndex, setFullscreenImageIndex] = useState(null);
  const [stats, setStats] = useState({ totalParticipants: 0, prosVotes: 0, consVotes: 0 });
  const [user, setUser] = useState(null); 


  const fetchData = useCallback(async () => {
    if (!postID) return;

    try {
      const [postData, commentData, statsData] = await Promise.all([
        getPostById(postID),
        getPostComments(postID),
        getPostStats(postID)
      ]);

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

      const normalizeArraySources = (sources) => {
        if (!Array.isArray(sources)) return [];
        return sources
          .map(normalizeImageSource)
          .filter(Boolean);
      };

      const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return new Intl.DateTimeFormat("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }).format(date);
      };

      const normalizedPost = {
        ...postData,
        title: postData.title,
        description: postData.description,
        content: postData.description,
        author: postData.authorName,
        date: formatDate(postData.SYSCREATEDDATE),
        topicName: postData.topicName || "General",
        proLabel: postData.proLabel || "Pros",
        conLabel: postData.conLabel || "Cons",
        images: postData.images
          ? normalizeArraySources(postData.images)
          : normalizeImageSource(postData.imagePath)
          ? [normalizeImageSource(postData.imagePath)]
          : undefined,
      };

      setPost(normalizedPost);
      setComments(commentData.comments ?? commentData ?? []);
      setStats(statsData);
    } catch (err) {
      console.error("Fetch failed:", err);
    }
  }, [postID]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const [userID, userStance] = await Promise.all([
          getCurrentUserID(),
          getUserStance(postID)
        ]);
        setUser(userID);
        setUserSide(userStance.stance || null);
        setActiveTab(userStance.stance || "pros");
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    if (postID) fetchUser();
  }, [postID]);

  const handleStanceChange = async (newStance) => {
    if (!user) {
      console.error("User ID not available");
      return;
    }

    try {
      // Check if user has already voted
      const currentStance = await getUserStance(postID);
      if (currentStance.stance) {
        console.log("User has already voted and cannot change stance");
        setUserSide(currentStance.stance);
        setActiveTab(currentStance.stance);
        return;
      }

      await updatePostStance(postID, user, newStance);

      const updatedStats = await getPostStats(postID);
      setStats(updatedStats);
      setUserSide(newStance);
      setActiveTab(newStance);
    } catch (error) {
      console.error("Failed to save stance:", error);
    }
  };

  const totalComments = useMemo(() => {
    return countAllComments(comments);
  }, [comments]);

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