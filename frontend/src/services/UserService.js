import { request } from './request';

export const getUsers = async () => {
    return await request('GET', '/api/users'); 
};

export const getCurrentUser = async () => {
    return await request('GET', '/api/user'); 
};

export const getUserById = async (id) => {
  return await request("GET", `/api/user/${id}`);
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

export const updateAvatar = async (file) => {
  const formData = new FormData();

  formData.append("avatar", file);

  const res = await request("PUT", "/api/user/avatar", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res;
};

export const deleteAccount = async () => {
  return await request("DELETE", "/api/user");
};