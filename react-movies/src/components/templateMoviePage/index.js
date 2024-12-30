import React from "react";
import MovieHeader from "../headerMovie";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { getMovieImages } from "../../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from '../spinner';

const TemplateMoviePage = ({ movie, children }) => {
  const { data, error, isLoading, isError } = useQuery(
    ["images", { id: movie.id }],
    getMovieImages
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  // 获取电影的主海报，避免重复图片
  const images = data.posters.length > 0 ? [data.posters[0]] : [];

  return (
    <>
      <MovieHeader movie={movie} />
      <Grid container spacing={3} style={{ padding: "15px" }}>
        
        {/* 左侧图片区域，仅显示一张主海报 */}
        <Grid item xs={12} sm={4}>
          <ImageList cols={1}>
            {images.map((image, index) => (
              <ImageListItem key={`${image.file_path}-${index}`} cols={1}>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                  alt={movie.title}
                  style={{ width: "100%", height: "auto" }}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Grid>

        {/* 右侧电影详情区域 */}
        <Grid item xs={12} sm={8}>
          {children}
        </Grid>
      </Grid>
    </>
  );
};

export default TemplateMoviePage;

