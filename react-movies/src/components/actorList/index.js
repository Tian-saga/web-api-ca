import React from "react";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2"; // 导入 Grid2
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const ActorList = ({ actors }) => {
  return (
    <Grid container spacing={3}>
      {actors.map((actor) => (
        <Grid item key={actor.id} xs={12} sm={6} md={4} lg={3}>
          <Paper style={{ padding: "10px" }}>
            <Typography variant="h6">
              <Link to={`/actors/${actor.id}`}>{actor.name}</Link>
            </Typography>
            <Typography variant="body2">as {actor.character}</Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default ActorList;

