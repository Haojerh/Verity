import { request } from "../services/request";
import { Http } from "../constant/http.method";

export const getPostById = async (postID) => {
  try {
    const response = await request(Http.GET, `/api/posts/${postID}`);
    // Check if it's wrapped in 'data', then check for 'post'
    const postData = response.data ? response.data.post || response.data : response.post || response;
    return postData;
  } catch (error) {
    console.error(`Error fetching post ${postID}:`, error);
    throw error;
  }
};

export const getUserPosts = async (userID, page = 0, size = 6) => {
  return await request(
    "GET",
    `/api/posts/user/${userID}?page=${page}&size=${size}`
  );
};

export const getFollowedUsersPosts = async (userID, page = 0, size = 6) => {
  return await request(
    "GET",
    `/api/posts/followedUsers/${userID}?page=${page}&size=${size}`
  );
};

export const getFollowedTopicsPosts = async (userID, page = 0, size = 6) => {
  return await request(
    "GET",
    `/api/posts/followedTopics/${userID}?page=${page}&size=${size}`
  );
};

export const getTopicPosts = async (topicID, page = 0, size = 6) => {
  return await request(
    "GET",
    `/api/posts/topic/${topicID}?page=${page}&size=${size}`
  );
};

export const getAllPosts = async () => {
  try {
    return await request(Http.GET, "/api/posts");
  } catch (error) {
    console.error("Error fetching all posts:", error);
    throw error;
  }
};

export const getRecommendedPosts = async (userID, page = 0, size = 6) => {
  return await request(
    "GET",
    `/api/posts/recommended/${userID}?page=${page}&size=${size}`
  );
};

export const getRecentPosts = async (page = 0, size = 6) => {
    return await request(
    "GET",
    `/api/posts/recent?page=${page}&size=${size}`
  );
};

export const getPopularPosts = async (page = 0, size = 6) => {
    return await request(
    "GET",
    `/api/posts/popular?page=${page}&size=${size}`
  );
};

export const getSearchPosts = async (q, page = 0, size = 6) => {
    return await request(
    "GET",
    `/api/posts/search?q=${q}&page=${page}&size=${size}`
  );
};

export const getSearchSuggestions = async (q) => {
  if (!q || q.trim().length < 2) return [];
  return await request("GET", `/api/posts/suggestions?q=${encodeURIComponent(q)}&limit=5`)
};

export const createPost = async (postData, imageFile) => {
  try {
    const formData = new FormData();
    
    formData.append("title", postData.title);
    formData.append("description", postData.description);
    formData.append("topicID", postData.topicID);
    formData.append("authorID", postData.authorID);
    formData.append("proLabel", postData.proLabel || "Pro");
    formData.append("conLabel", postData.conLabel || "Con");

    if (imageFile) {
      formData.append("image", imageFile);
    }

    return await request(Http.POST, "/api/posts", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export const normalizeImageSource = (source) => {
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

export const formatDate = (dateString) => {
  if (!dateString) return "";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric", month: "short", year: "numeric",
  }).format(new Date(dateString));
};

export const mapPostData = (postData) => ({
  ...postData,
  author: postData.authorName,
  date: formatDate(postData.SYSCREATEDDATE),
  topicName: postData.topicName || "General",
  proLabel: postData.proLabel || "Pros",
  conLabel: postData.conLabel || "Cons",
  images: postData.images
    ? postData.images.map(normalizeImageSource).filter(Boolean)
    : normalizeImageSource(postData.imagePath) ? [normalizeImageSource(postData.imagePath)] : [],
});

export const voteOnComment = async (commentID, voterID, voteValue) => {
  try {
    const response = await request(Http.POST, `/api/comments/${commentID}/vote`, {
      voterID,
      voteValue
    });
    return response; 
  } catch (error) {
    console.error("Voting failed:", error);
    throw error;
  }
};

export const deletePost = async (postID) => {
  try {
    return await request(Http.DELETE, `/api/posts/${postID}`);
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};

export const getConsensusData = async (postID) => {
  return await request(Http.GET, `/api/consensus/post/${postID}`);
};

export const updatePost = async (postID, postData) => {
  try {
    const formData = new FormData();

    const jsonBlob = new Blob([JSON.stringify({
      title: postData.title,
      description: postData.description,
      topicID: postData.topicID,
      proLabel: postData.proLabel,
      conLabel: postData.conLabel
    })], { type: 'application/json' });

    formData.append("request", jsonBlob);

    if (postData.image instanceof File) {
      formData.append("image", postData.image);
    }

    return await request(Http.PUT, `/api/posts/${postID}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
};