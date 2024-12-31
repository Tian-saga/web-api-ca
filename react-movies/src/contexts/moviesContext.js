import React, { useState, useEffect } from "react";
import { addToFavourites, getFavourites, removeFromFavourites } from "../api/favourites";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState([]); // 收藏夹
  const [myReviews, setMyReviews] = useState({}); // 用户的电影评论
  const [mustWatchMovies, setMustWatchMovies] = useState([]); // "必看电影" 列表
  const navigate = useNavigate(); // 用于跳转页面

  const token = localStorage.getItem("token");
  const userId = token ? jwtDecode(token)._id : null; // 从 token 中解码出用户 ID
  

  // 检查用户是否已登录
  useEffect(() => {
    if (!token || !userId) {
      console.warn("User not logged in. Redirecting to login page...");
      navigate("/login"); // 跳转到登录页
    }
  }, [token, userId, navigate]);

  // 初始化收藏夹数据
  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        if (!userId) return; // 如果用户未登录，直接返回
        const data = await getFavourites(userId); // 从后端获取收藏夹数据
        setFavorites(data.favourites.map((fav) => fav.movieId)); // 更新收藏夹状态
      } catch (error) {
        console.error("Failed to fetch favourites:", error.message);
      }
    };

    fetchFavourites();
  }, [userId]);

  // 添加到收藏夹
  const addToFavorites = async (movie) => {
    try {
      if (!userId) {
        console.error("User not logged in. Cannot add to favourites.");
        return;
      }
      await addToFavourites(userId, movie.id); // 同步到后端
      setFavorites([...favorites, movie.id]); // 更新前端状态
    } catch (error) {
      console.error("Failed to add to favourites:", error.message);
    }
  };

  // 从收藏夹中移除
  const removeFromFavorites = async (movie) => {
    try {
      await removeFromFavourites(userId, movie.id); // 调用后端 API 接口删除数据
      setFavorites((prevFavorites) =>
        prevFavorites.filter((mId) => mId !== movie.id) // 更新前端状态
      );
    } catch (error) {
      console.error("Failed to remove from favorites:", error.message);
    }
  };
  

  // 添加 "必看电影"
  const addToMustWatch = (movieId) => {
    setMustWatchMovies((prevMustWatch) => {
      if (!prevMustWatch.includes(movieId)) {
        console.log([...prevMustWatch, movieId]); // 输出更新后的数组
        return [...prevMustWatch, movieId];
      }
      return prevMustWatch;
    });
  };

  // 添加评论
  const addReview = (movie, review) => {
    setMyReviews({ ...myReviews, [movie.id]: review });
  };

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        setFavorites,
        addToFavorites,
        removeFromFavorites,
        addReview,
        mustWatchMovies,
        addToMustWatch,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
