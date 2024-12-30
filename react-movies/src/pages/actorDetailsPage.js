import React from "react";
import { useParams } from 'react-router-dom';
import { useQuery } from "react-query";
import Spinner from '../components/spinner';
import { getActorDetails, getActorMovies } from '../api/tmdb-api';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import MovieList from "../components/movieList";

const ActorDetailsPage = () => {
  const { id } = useParams();

  // 获取演员的基本信息
  const { data: actor, error: actorError, isLoading: actorLoading, isError: isActorError } = useQuery(
    ["actor", { id: id }],
    getActorDetails
  );

  // 获取演员参演的电影列表
  const { data: movies, error: moviesError, isLoading: moviesLoading, isError: isMoviesError } = useQuery(
    ["actorMovies", { id: id }],
    getActorMovies
  );

  if (actorLoading || moviesLoading) {
    return <Spinner />;
  }

  if (isActorError) {
    return <h1>{actorError.message}</h1>;
  }

  if (isMoviesError) {
    return <h1>{moviesError.message}</h1>;
  }

  return (
    <>
      {actor ? (
        <div>
          <Paper style={{ padding: "20px", margin: "20px 0" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                  alt={actor.name}
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={12} sm={8}>
                <Typography variant="h4" gutterBottom>{actor.name}</Typography>
                <Typography variant="body1">{actor.biography || "No biography available."}</Typography>
                <Typography variant="subtitle1" style={{ marginTop: "10px" }}>
                  Born: {actor.birthday ? `${actor.birthday} in ${actor.place_of_birth || "N/A"}` : "N/A"}
                </Typography>
                {actor.deathday && (
                  <Typography variant="subtitle1">
                    Died: {actor.deathday}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Paper>

          <div style={{ marginTop: "20px" }}>
            <h2>Movies Featuring {actor.name}</h2>
            {movies && movies.cast.length ? (
              <MovieList movies={movies.cast} action={(movie) => null} />
            ) : (
              <p>No movies available for this actor.</p>
            )}
          </div>
        </div>
      ) : (
        <p>Waiting for actor details</p>
      )}
    </>
  );
};

export default ActorDetailsPage;
