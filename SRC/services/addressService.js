import api from './api';

export const getAddresses = async () => {
    try {
        const response = await api.get('/addresses');
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const addAddress = async (addressData) => {
    try {
        const response = await api.post('/addresses', addressData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const updateAddress = async (id, addressData) => {
    try {
        const response = await api.put(`/addresses/${id}`, addressData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const deleteAddress = async (id) => {
    try {
        const response = await api.delete(`/addresses/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};