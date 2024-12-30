import React from "react";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import PageTemplate from "../components/templateMovieListPage";
import { getTrendingMovies } from "../api/tmdb-api";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { MoviesContext } from "../contexts/moviesContext";
import { useContext } from "react";

const TrendingMoviesPage = () => {
  const { data, error, isLoading, isError } = useQuery("trending", getTrendingMovies);
  const { addToMustWatch } = useContext(MoviesContext);

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const movies = data.results;

  return (
    <PageTemplate
      title="Trending Movies"
      movies={movies}
      action={(movie) => (
        <PlaylistAddIcon
          color="primary"
          fontSize="large"
          onClick={() => addToMustWatch(movie.id)}
          style={{ cursor: "pointer" }}
        />
      )}
    />
  );
};

export default TrendingMoviesPage;
