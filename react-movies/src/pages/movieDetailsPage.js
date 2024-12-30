import React from "react";
import { useParams, Link } from 'react-router-dom';
import MovieDetails from "../components/movieDetails/";
import PageTemplate from "../components/templateMoviePage";
import { getMovie, getMovieRecommendations, getMovieCredits } from '../api/tmdb-api';
import { useQuery } from "react-query";
import Spinner from '../components/spinner';
import MovieList from "../components/movieList";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const MoviePage = () => {
  const { id } = useParams();

  // 获取电影详情
  const { data: movie, error, isLoading, isError } = useQuery(
    ["movie", { id: id }],
    getMovie
  );

  // 获取推荐电影
  const { data: recommendations, error: recommendationsError, isLoading: recommendationsLoading, isError: isRecommendationsError } = useQuery(
    ["recommendations", { id: id }],
    getMovieRecommendations
  );

  // 获取电影演员信息
  const { data: credits, error: creditsError, isLoading: creditsLoading, isError: isCreditsError } = useQuery(
    ["credits", { id: id }],
    getMovieCredits
  );

  if (isLoading || recommendationsLoading || creditsLoading) {
    return <Spinner />;
  }

  if (isError) return <h1>{error.message}</h1>;
  if (isRecommendationsError) return <h1>{recommendationsError.message}</h1>;
  if (isCreditsError) return <h1>{creditsError.message}</h1>;

  return (
    <>
      {movie ? (
        <>
          <PageTemplate movie={movie}>
            <MovieDetails movie={movie} />
          </PageTemplate>
          
          {/* 显示演员信息 */}
          <div style={{ marginTop: "20px" }}>
            <h2>Cast</h2>
            <Grid container spacing={3}>
              {credits.cast.slice(0, 12).map((actor, index) => (
                <Grid item key={actor.id || index} xs={12} sm={6} md={4} lg={3}>
                  <Paper style={{ padding: "10px" }}>
                    <Link to={`/actors/${actor.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <Typography variant="h6">{actor.name}</Typography>
                    </Link>
                    <Typography variant="body2">as {actor.character}</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </div>

          {/* 显示推荐电影 */}
          <div style={{ marginTop: "20px" }}>
            <h2>Recommended Movies</h2>
            {recommendations && recommendations.results.length ? (
             <MovieList
             movies={recommendations.results}
             action={(movie) => console.log(`Action triggered for movie: ${movie.title}`)}
           />
           
            ) : (
              <p>No recommendations available for this movie.</p>
            )}
          </div>
        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default MoviePage;
