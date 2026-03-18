import axios from 'axios';

const rawBaseURL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
const baseURL = rawBaseURL.endsWith('/') ? rawBaseURL.slice(0, -1) : rawBaseURL;

const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
             // Opcjonalnie: można tu obsłużyć wygaśnięcie sesji, np. window.location.href = '/login'
             // Ale lepiej to robić w Context/Komponentach, żeby nie odświeżać strony brutalnie
        }
        return Promise.reject(error);
    }
);

export default api;
