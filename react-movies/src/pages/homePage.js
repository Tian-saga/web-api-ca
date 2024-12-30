import React, { useState } from "react";
import { getMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';
import FilterMoviesCard from '../components/filterMoviesCard';
import Grid from '@mui/material/Grid';

const HomePage = (props) => {
  const [filters, setFilters] = useState({ genre: [], name: "", sortBy: "", yearFrom: "", yearTo: "", ratingFrom: "", ratingTo: "", language: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 10; // Number of movies per page

  const { data, error, isLoading, isError } = useQuery('discover', getMovies);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  const movies = data.results;

  // Filtering movies based on genre, name, year, rating, and language
  const filteredMovies = movies.filter((movie) => {
    const meetsGenre = filters.genre.length === 0 || filters.genre.some((genre) => movie.genre_ids.includes(parseInt(genre)));
    const meetsSearch = movie.title.toLowerCase().includes(filters.name.toLowerCase());
    const meetsYearFrom = !filters.yearFrom || new Date(movie.release_date).getFullYear() >= parseInt(filters.yearFrom);
    const meetsYearTo = !filters.yearTo || new Date(movie.release_date).getFullYear() <= parseInt(filters.yearTo);
    const meetsRatingFrom = !filters.ratingFrom || movie.vote_average >= parseFloat(filters.ratingFrom);
    const meetsRatingTo = !filters.ratingTo || movie.vote_average <= parseFloat(filters.ratingTo);
    const meetsLanguage = !filters.language || movie.original_language === filters.language;

    return meetsGenre && meetsSearch && meetsYearFrom && meetsYearTo && meetsRatingFrom && meetsRatingTo && meetsLanguage;
  });

  // Sorting movies based on selected sort criteria
  const sortedMovies = [...filteredMovies].sort((a, b) => {
    if (filters.sortBy === "rating") {
      return b.vote_average - a.vote_average; // Descending order by rating
    } else if (filters.sortBy === "releaseDate") {
      return new Date(b.release_date) - new Date(a.release_date); // Descending order by release date
    }
    return 0;
  });

  // Pagination Logic
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = sortedMovies.slice(indexOfFirstMovie, indexOfLastMovie);

  const handleFilterChange = (type, value) => {
    setFilters({
      ...filters,
      [type]: type === "genre" ? (Array.isArray(value) ? value : [value]) : value, // Ensure genre is always an array
    });
    setCurrentPage(1); // Reset to the first page when filters change
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Redundant, but necessary to avoid app crashing.
  const favorites = movies.filter(m => m.favorite);
  localStorage.setItem('favorites', JSON.stringify(favorites));

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4} md={3} lg={2} sx={{ maxHeight: '100vh', overflowY: 'auto', padding: '10px' }}>
        <FilterMoviesCard
          onUserInput={handleFilterChange}
          titleFilter={filters.name}
          genreFilter={filters.genre.length > 0 ? filters.genre : []} // Ensure genreFilter is an array
          sortBy={filters.sortBy}
          yearFrom={filters.yearFrom}
          yearTo={filters.yearTo}
          ratingFrom={filters.ratingFrom}
          ratingTo={filters.ratingTo}
          language={filters.language}
        />
      </Grid>
      <Grid item xs={12} sm={8} md={9} lg={10}>
        <PageTemplate
          title="Discover Movies"
          movies={currentMovies}
          action={(movie) => {
            return <AddToFavoritesIcon movie={movie} />;
          }}
        />
        {/* Pagination Controls */}
        <div style={{ width: '100%', margin: "20px", textAlign: "center" }}>
          {Array.from({ length: Math.ceil(sortedMovies.length / moviesPerPage) }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              style={{
                margin: "0 5px",
                padding: "10px",
                backgroundColor: currentPage === index + 1 ? "rgb(204, 204, 0)" : "white",
                border: "1px solid #ccc",
                cursor: "pointer"
              }}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </Grid>
    </Grid>
  );
};

export default HomePage;


