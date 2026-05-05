import { request } from "../services/request";
import { Http } from "../constant/http.method";

export const getPostById = async (postID) => {
  try {
    const response = await request(Http.GET, `/api/posts/${postID}`);
    return response.post ?? response;
  } catch (error) {
    console.error(`Error fetching post ${postID}:`, error);
    throw error;
  }
};

export const getAllPosts = async () => {
  try {
    return await request(Http.GET, "/api/posts");
  } catch (error) {
    console.error("Error fetching all posts:", error);
    throw error;
  }
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

    // Add image if it exists
    if (imageFile) {
      formData.append("image", imageFile);
    }

    // Must use multipart/form-data for file uploads
    return await request(Http.POST, "/api/posts", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};