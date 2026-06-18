import axios from 'axios';

const SERVER_URL = 'http://10.88.107.115:8000';
const BASE_URL = `${SERVER_URL}/api`;

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

export const setAuthToken = (token) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};

export const getImageUrl = (path) => {
    if (!path) return null;
    if (/^https?:\/\//i.test(path)) return path;
    const cleanPath = path.replace(/^\/+/, '');
    return `${SERVER_URL}/storage/${cleanPath}`;
};

export default api;