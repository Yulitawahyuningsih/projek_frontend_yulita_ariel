import api from './api';

export const getOrders = async (status) => {
    try {
        const response = await api.get('/orders', { params: { status } });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const getOrderDetail = async (id) => {
    try {
        const response = await api.get(`/orders/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const createOrder = async (orderData) => {
    try {
        const response = await api.post('/orders', orderData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const cancelOrder = async (id) => {
    try {
        const response = await api.post(`/orders/${id}/cancel`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};