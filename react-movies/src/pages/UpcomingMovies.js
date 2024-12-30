import React, { useContext } from "react";
import { getUpcomingMovies } from "../api/tmdb-api";  // 引入getUpcomingMovies
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';
import AddToWatchlistIcon from '../components/cardIcons/addToWatchlistIcon';
import { MoviesContext } from "../contexts/moviesContext";  // 导入 MoviesContext
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";



const UpcomingMoviesPage = () => {
  // 使用 getUpcomingMovies 通过 useQuery 获取即将上映的电影数据
  const { data, error, isLoading, isError } = useQuery('upcoming', getUpcomingMovies);
  
  // 从 MoviesContext 中获取 addToMustWatch 函数
  const { addToMustWatch } = useContext(MoviesContext);

  if (isLoading) {
    return <Spinner />;  // 显示加载动画
  }

  if (isError) {
    return <h1>{error.message}</h1>;  // 显示错误信息
  }

  const movies = data.results;  // 获取电影列表

  const favorites = movies.filter(m => m.favorite);  // 过滤出收藏的电影
  localStorage.setItem('favorites', JSON.stringify(favorites));  // 将收藏的电影存储到本地

  const addToFavorites = (movieId) => true;  // 添加到收藏的功能

  return (
    <PageTemplate
      title="Upcoming Movies"  // 设置页面标题
      movies={movies}  // 将获取的电影数据传递给 PageTemplate 组件
      action={(movie) => (
        <PlaylistAddIcon
          color="primary"
          fontSize="large"
          onClick={() => addToMustWatch(movie.id)} // 传递 movie.id
          style={{ cursor: "pointer" }}
        />
      )}
      
    />
  );
};

export default UpcomingMoviesPage;

