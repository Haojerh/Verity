import axios from 'axios';

const client = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true,
});

export const request = (method, url, data, config = {}) => {
  return client({
    method,
    url,
    data,
    ...config,
  });
};

export const logout = async () => {
    try {
        await request('POST', '/logout'); 
    } finally {
        localStorage.removeItem("user_id");
        localStorage.removeItem("display_name");
        window.location.href = '/login'; 
    }
};

client.interceptors.response.use(
    (response) => {
        return response.data.data ? response.data.data : response.data;
    },
    (error) => {
        const status = error.response?.status;
        const requestUrl = error.config?.url;

        if (status === 401) {
            console.log("Unauthorized - token invalid or missing");

            if (requestUrl !== '/logout' && window.location.pathname !== '/login') {
                logout();
            }
        }

        return Promise.reject(error);
    }
);
