import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API error:', error.response?.status, error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default api;
