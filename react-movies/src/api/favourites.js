import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080"; // 设置后端基础路径

// 添加电影到收藏夹
export const addToFavourites = async (userId, movieId, token) => {
  try {
    const response = await axios.post(
      `/api/users/${userId}/favourites`,
      { movieId },
      {
        headers: {
          Authorization: token, // 添加 Token
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding to favourites:", error.response?.data || error.message);
    throw error;
  }
};

// 获取用户的收藏夹
export const getFavourites = async (userId, token) => {
  try {
    const response = await axios.get(`/api/users/${userId}/favourites`, {
      headers: {
        Authorization: token, // 添加 Token
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching favourites:", error.response?.data || error.message);
    throw error;
  }
};

// 从收藏夹中移除电影
export const removeFromFavourites = async (userId, movieId, token) => {
  try {
    const response = await axios.delete(`/api/users/${userId}/favourites/${movieId}`, {
      headers: {
        Authorization: token, // 添加 Token
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error removing from favourites:", error.response?.data || error.message);
    throw error;
  }
};
