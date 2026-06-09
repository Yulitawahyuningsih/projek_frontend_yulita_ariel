import api from './api';

export const getCarts = async () => {
    try {
        const response = await api.get('/carts');
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const addToCart = async (productId, variantId, quantity) => {
    try {
        const response = await api.post('/carts', {
            product_id: productId,
            product_variant_id: variantId,
            quantity,
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const updateCart = async (cartId, quantity) => {
    try {
        const response = await api.put(`/carts/${cartId}`, { quantity });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const removeFromCart = async (cartId) => {
    try {
        const response = await api.delete(`/carts/${cartId}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const clearCart = async () => {
    try {
        const response = await api.delete('/carts');
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};