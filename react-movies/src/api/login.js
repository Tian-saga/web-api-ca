import axios from 'axios';

export const login = async (username, password) => {
  try {
    const response = await axios.post('/api/users', { username, password });
    return response.data;
  } catch (error) {
    console.error('Error during login:', error.response?.data || error.message);
    throw error;
  }
};
