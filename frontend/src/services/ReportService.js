import { request } from './request';

export const createReport = async (data) => {
  return await request("POST", "/api/reports", data);
};

export const getAllReports = async () => {
  return await request("GET", "/api/reports");
};

export const takedownPost = async (id) => {
  return await request("DELETE", `/api/posts/takedown/${id}`);
};

export const takedownComment = async (id) => {
  return await request("DELETE", `/api/comment/takedown/${id}`);
};
