import React, { useState } from "react";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState( [] )
  const [myReviews, setMyReviews] = useState( {} ) 
  const [mustWatchMovies, setMustWatchMovies] = useState([]); // 添加 mustWatchMovies 状态

  const addToFavorites = (movie) => {
    let newFavorites = [];
    if (!favorites.includes(movie.id)){
      newFavorites = [...favorites, movie.id];
    }
    else{
      newFavorites = [...favorites];
    }
    setFavorites(newFavorites)
  };

  const addReview = (movie, review) => {
    setMyReviews( {...myReviews, [movie.id]: review } )
  };
  //console.log(myReviews);
  
  // We will use this function in the next step
  const removeFromFavorites = (movie) => {
    setFavorites( favorites.filter(
      (mId) => mId !== movie.id
    ) )
  };

  const addToMustWatch = (movieId) => {
    setMustWatchMovies((prevMustWatch) => {
      if (!prevMustWatch.includes(movieId)) {
        console.log([...prevMustWatch, movieId]); // 输出更新后的数组
        return [...prevMustWatch, movieId];
      }
      return prevMustWatch;
    });
  };

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        addReview,
        mustWatchMovies,    // 2. 将 mustWatchMovies 添加到 context 中
        addToMustWatch,      // 将 addToMustWatch 函数添加到 context 中
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;