import { request } from "../services/request";
import { Http } from "../constant/http.method";

// export const getPostById = async (postID) => {
//   try {
//     const response = await request(Http.GET, `/api/posts/${postID}`);
//     return response.post ?? response;
//   } catch (error) {
//     console.error(`Error fetching post ${postID}:`, error);
//     throw error;
//   }
// };

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