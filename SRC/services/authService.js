import api, { setAuthToken } from './api';

export const register = async ({ name, email, password, phone }) => {
    try {
        const response = await api.post('/register', {
            name,
            email,
            password,
            password_confirmation: password,
            phone,
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const login = async (email, password) => {
    try {
        const response = await api.post('/login', {
            email,
            password,
        });
        if (response.data.token) {
            setAuthToken(response.data.token);
        }
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const logout = async () => {
    try {
        const response = await api.post('/logout');
        setAuthToken(null);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const getProfile = async () => {
    try {
        const response = await api.get('/me');
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};