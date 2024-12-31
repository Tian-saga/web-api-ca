import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { MoviesContext } from "../../contexts/moviesContext";

const RemoveFromFavoritesIcon = ({ movie }) => {
  const context = useContext(MoviesContext);

  const handleRemoveFromFavorites = async (e) => {
    e.preventDefault(); // 防止事件冒泡
    try {
      await context.removeFromFavorites(movie); // 调用上下文中的删除方法
    } catch (error) {
      console.error("Failed to remove movie from favorites:", error.message);
    }
  };

  return (
    <IconButton
      aria-label="remove from favorites"
      onClick={handleRemoveFromFavorites} // 点击事件绑定
    >
      <DeleteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromFavoritesIcon;
