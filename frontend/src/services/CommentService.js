import { request } from "./request";

const BASE = "/api/posts";

export const getPostComments = (postID) => {
  return request("GET", `${BASE}/${postID}/comments`);
};

export const createPostComment = (postID, payload) => {
  return request("POST", `${BASE}/${postID}/comments`, payload);
};
