import React, { useContext, useEffect, useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import RemoveFromFavorites from "../components/cardIcons/removeFromFavorites";
import WriteReview from "../components/cardIcons/writeReview";
import { MoviesContext } from "../contexts/moviesContext";
import { getFavourites } from "../api/favourites";
import { getMovie } from "../api/tmdb-api";
import { jwtDecode } from "jwt-decode";

import { useNavigate } from "react-router-dom";

const FavoriteMoviesPage = () => {
  const { favorites, setFavorites } = useContext(MoviesContext); // 引入 context
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate(); // 用于跳转页面

  // 从 localStorage 获取 token 并解码用户 ID
  const token = localStorage.getItem("token");
  const userId = token ? jwtDecode(token)._id : null;

  // 检查用户是否已登录
  useEffect(() => {
    if (!token || !userId) {
      console.warn("User not logged in. Redirecting to login page...");
      navigate("/login"); // 跳转到登录页
    }
  }, [token, userId, navigate]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        if (!userId) return; // 如果用户未登录，直接返回
        const response = await getFavourites(userId); // 从后端获取收藏夹数据
        setFavorites(response.favourites.map((fav) => fav.movieId)); // 更新 context
        const movieData = await Promise.all(
          response.favourites.map(async (fav) => {
            return await getMovie({ queryKey: ["movie", { id: fav.movieId }] });
          })
        );
        setMovies(movieData); // 保存到状态中
      } catch (error) {
        console.error("Failed to load favorites:", error.message);
      } finally {
        setIsLoading(false); // 关闭加载状态
      }
    };

    fetchFavorites();
  }, [userId, setFavorites]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <PageTemplate
      title="Favorite Movies"
      movies={movies}
      action={(movie) => (
        <>
          <RemoveFromFavorites movie={movie} />
          <WriteReview movie={movie} />
        </>
      )}
    />
  );
};

export default FavoriteMoviesPage;
