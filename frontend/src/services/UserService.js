import { Http } from '../constant/http.method';
import { request } from './Request';

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
