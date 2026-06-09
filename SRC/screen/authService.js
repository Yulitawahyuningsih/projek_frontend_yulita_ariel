import api, { setAuthToken } from './api';
import { saveToken, saveUser, removeToken, removeUser } from './storageService';

export const register = async (name, email, password, passwordConfirmation) => {
  try {
    const response = await api.post('/register', {
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
    });
    
    // Tidak melakukan auto-login (simpan token) agar user harus login manual setelah daftar
    return { success: true, data: response.data.data.user, message: response.data.message };
  } catch (error) {
    console.error('Registration error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || error.message || 'Registration failed');
  }
};

export const login = async (email, password) => {
  try {
    const response = await api.post('/login', { email, password });
    const { token, user } = response.data.data;
    await saveToken(token);
    await saveUser(user);
    await setAuthToken(token); // Set token di instance axios
    return { success: true, data: user, message: response.data.message };
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || error.message || 'Login failed');
  }
};

export const logout = async () => {
  await removeToken();
  await removeUser();
  await setAuthToken(null); // Hapus token dari instance axios
};

export const getProfile = async () => {
  try {
    const response = await api.get('/user'); // Asumsi endpoint untuk profil pengguna adalah /user
    return { success: true, data: response.data.data, message: response.data.message };
  } catch (error) {
    console.error('Get profile error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || error.message || 'Failed to fetch profile');
  }
};