import { request } from './request';

export const toggleFollow = async (userId) => {
  return await request("POST", `/api/follow/${userId}`);
};

export const getFollowStatus = async (userId) => {
  return await request("GET", `/api/follow/${userId}`);
};

export const getFollowerCount = async (userId) => {
  return await request("GET", `/api/follow/count/${userId}`);
};
