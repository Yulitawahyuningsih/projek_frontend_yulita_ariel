import api from './api';

export const getWishlists = async () => {
    try {
        const response = await api.get('/wishlists');
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const toggleWishlist = async (productId) => {
    try {
        const response = await api.post('/wishlists/toggle', {
            product_id: productId,
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};