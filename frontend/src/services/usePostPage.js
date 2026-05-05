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

  const fetchData = useCallback(async () => {
    if (!postID) return;
    try {
      const [postData, commentData] = await Promise.all([
        getPostById(postID),
        getPostComments(postID)
      ]);

      const normalizeImagePath = (imagePath) => {
        if (!imagePath) return null;
        if (typeof imagePath !== "string") return imagePath;
        return imagePath.startsWith("http")
          ? imagePath
          : `http://localhost:8080/uploads/posts/${imagePath}`;
      };

      const normalizedPost = {
        ...postData,
        author: postData.author || postData.authorName,
        content: postData.content || postData.description,
        date: postData.date || postData.SYSCREATEDDATE,
        prosLabel: postData.prosLabel || postData.proLabel,
        consLabel: postData.consLabel || postData.conLabel,
        images: postData.images
          ? postData.images.map(normalizeImagePath)
          : postData.imagePath
          ? [normalizeImagePath(postData.imagePath)]
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

  const openModal = useCallback((type, entity) => setModal({ type, entity }), []);
  const closeModal = useCallback(() => setModal({ type: null, entity: null }), []);

  return {
    post, comments, commentText, setCommentText,
    userSide, activeTab, setActiveTab, modal,
    handleSelectSide, handleSubmitComment, openModal, closeModal
  };
};