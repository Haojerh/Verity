import axios from "axios";

const API_URL = "http://localhost:8080/api/topics";

export const createTopic = async (formData) => {
  const form = new FormData();

  form.append("title", formData.title);
  form.append("description", formData.description);
  form.append("avatar", formData.avatar);
  form.append("cover", formData.banner);

  const res = await axios.post(API_URL, form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};