import api from './api';

export const getProducts = async (params) => {
    try {
        const response = await api.get('/products', { params });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const getProductDetail = async (id) => {
    try {
        const response = await api.get(`/products/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const getCategories = async () => {
    try {
        const response = await api.get('/categories');
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const getProductReviews = async (productId) => {
    try {
        const response = await api.get(`/products/${productId}/reviews`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};