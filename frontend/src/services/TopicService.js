import axios from "axios";
import { request } from './Request';

const API_URL = "http://localhost:8080/api/topics";

export const createTopic = async (formData) => {
  const form = new FormData();

  form.append("name", formData.name);
  form.append("description", formData.description);
  form.append("avatar", formData.avatar);
  form.append("banner", formData.banner);

  return await request("POST", "/api/topics", form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateTopic = async (id, formData) => {
  const form = new FormData();

  form.append("name", formData.name);
  form.append("description", formData.description);
  form.append("avatar", formData.avatar);
  form.append("banner", formData.banner);

  return await request("PUT", `/api/topics/${id}`, form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getTopics = async () => {
  return await request('GET', `/api/topics`);
};

export const deleteTopic = async (id) => {
  return await request('DELETE', `/api/topics/${id}`);
};

export const getTopicById = async (id) => {
  return await request('GET', `/api/topics/${id}`);
};