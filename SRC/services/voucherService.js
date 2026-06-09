import api from './api';

export const getVouchers = async () => {
    try {
        const response = await api.get('/vouchers');
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const checkVoucher = async (code, subtotal) => {
    try {
        const response = await api.post('/vouchers/check', {
            code,
            subtotal,
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};