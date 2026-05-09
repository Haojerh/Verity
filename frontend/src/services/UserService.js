import { request } from './request';
import { Http } from '../constant/http.method';

export const getUsers = async () => {
    return await request('GET', '/api/users'); 
};

export const getCurrentUser = async () => {
    const response = await request(Http.GET, '/api/user');
    return response.user; // Returns the UserDTO object
};

export const getCurrentUserID = async () => {
    const user = await getCurrentUser();
    return user.userID; // Returns just the userID
};

export const getUserById = async (id) => {
  return await request("GET", `/api/user/${id}`);
};

export const getModerators = async () => {
    return await request(Http.GET, '/api/moderators'); 
}

export const changePassword = async (data) => {
  return await request(Http.PUT, "/api/change-password", data);
};

export const updateProfile = async (data) => {
  const res = await request(Http.PUT, "/api/user", data);
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

export const getUserReputation = async (userID) => {
  return await request("GET", `/api/reputation/${userID}`)
}
