import { useState, useEffect, useCallback } from "react";
import { getPostComments, createPostComment } from "../services/CommentService";
import { getPostById } from "../services/PostService";

export const usePostPage = (postID) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [userSide, setUserSide] = useState(null);
  const [activeTab, setActiveTab] = useState("pros");
  const [modal, setModal] = useState({ type: null, entity: null });
  const [fullscreenImageIndex, setFullscreenImageIndex] = useState(null);

  const fetchData = useCallback(async () => {
    if (!postID) return;

    try {
      const [postData, commentData] = await Promise.all([
        getPostById(postID),
        getPostComments(postID)
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
    } catch (err) {
      console.error("Fetch failed:", err);
    }
  }, [postID]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSelectSide = (side) => {
    if (userSide) return;

    setUserSide(side);
    setActiveTab(side);

    setPost((prev) => {
      const updated = { ...prev };
      const stats = { ...updated.statistics };

      if (side === "pros") {
        stats.prosVotes += 1;
      } else {
        stats.consVotes += 1;
      }

      stats.totalParticipants += 1;
      updated.statistics = stats;
      return updated;
    });
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

  const openModal = useCallback((type, entity) => setModal({ type, entity }), []);
  const closeModal = useCallback(() => setModal({ type: null, entity: null }), []);
  const openFullscreenImage = useCallback((index) => setFullscreenImageIndex(index), []);
  const closeFullscreenImage = useCallback(() => setFullscreenImageIndex(null), []);

  return {
    post, comments, commentText, setCommentText,
    userSide, activeTab, setActiveTab, modal,
    handleSelectSide, handleSubmitComment, handleSubmitReply, openModal, closeModal,
    fullscreenImageIndex, openFullscreenImage, closeFullscreenImage
  };
};