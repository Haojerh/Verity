import axios from "axios";

const API_URL = "http://localhost:8080/api/topics";

export const createTopic = async (formData) => {
  const form = new FormData();

  form.append("name", formData.name);
  form.append("description", formData.description);
  form.append("avatar", formData.avatar);
  form.append("banner", formData.banner);

  const res = await axios.post(API_URL, form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

export const updateTopic = async (id, formData) => {
  const form = new FormData();

  form.append("name", formData.name);
  form.append("description", formData.description);
  form.append("avatar", formData.avatar);
  form.append("banner", formData.banner);

  const res = await axios.put(`${API_URL}/${id}`, form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

export const getTopics = async () => {
  return await axios.get(API_URL);
};

export const deleteTopic = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};