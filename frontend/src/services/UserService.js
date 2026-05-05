import { request } from './Request';

export const getUsers = async () => {
    return await request('GET', '/api/users'); 
};

export const getCurrentUser = async () => {
    return await request('GET', '/api/user'); 
};

export const getModerators = async () => {
    return await request('GET', '/api/moderators'); 
}

export const changePassword = async (data) => {
  return await request("PUT", "/api/change-password", data);
};

export const updateProfile = async (data) => {
  const res = await request("PUT", "/api/user", data);
  window.localStorage.setItem("display_name", data.name);
  return res;
};
