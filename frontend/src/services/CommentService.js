import { request } from "./request";

const BASE = "/api/comment";

export const getPostComments = (postID) => {
  return request("GET", `${BASE}/post/${postID}`);
};

/**
 * Sends a CommentRequest to the backend.
 * @param {string} postID 
 * @param {object} payload 
 */
export const createPostComment = (postID, payload) => {
  return request("POST", `${BASE}/post/${postID}`, payload);
};

export const getTotalCommentCount = (comments) => {
  if (!comments || comments.length === 0) return 0;
  return comments[0].totalComments;
};

export const getCommentByID = (id) => {
  return request("GET", `${BASE}/${id}`);
};