import React from "react";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import IconButton from "@mui/material/IconButton";

const AddToWatchlistIcon = ({ movie }) => {
  return (
    <IconButton aria-label="add to watchlist">
      <PlaylistAddIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToWatchlistIcon;