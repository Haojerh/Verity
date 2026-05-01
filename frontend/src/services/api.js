import axios from "axios";

const api = axios.create({
  // baseURL: import.meta.env.VITE_API_URL
  baseURL: 'http://localhost:8080/',
  withCredentials: true, // This ensures the "Token" cookie is always sent
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized: Redirecting to login...");
    }
    return Promise.reject(error);
  }
);

export default api;