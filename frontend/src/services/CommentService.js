import { request } from "./request";

const BASE = "/api/posts";

export const getPostComments = (postID) => {
  return request("GET", `${BASE}/${postID}/comments`);
};

export const createPostComment = (postID, payload) => {
  return request("POST", `${BASE}/${postID}/comments`, payload);
};

export const countAllComments = (comments) => {
  if (!comments) return 0;
  
  return comments.reduce((acc, comment) => {
    return acc + 1 + countAllComments(comment.replies);
  }, 0);
};
