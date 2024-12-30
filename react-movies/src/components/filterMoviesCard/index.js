import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button"; // New Button component
import img from '../../images/pexels-dziana-hasanbekava-5480827.jpg';
import { getGenres } from "../../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from '../spinner';

const formControl = {
  margin: 1,
  minWidth: "90%",
  backgroundColor: "rgb(255, 255, 255)"
};

export default function FilterMoviesCard(props) {
  const { data, error, isLoading, isError } = useQuery("genres", getGenres);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const genres = data.genres;
  if (genres[0].name !== "All") {
    genres.unshift({ id: "0", name: "All" });
  }

  const handleChange = (e, type, value) => {
    e.preventDefault();
    props.onUserInput(type, value);
  };

  const handleTextChange = (e) => {
    handleChange(e, "name", e.target.value);
  };

  const handleGenreChange = (e) => {
    handleChange(e, "genre", Array.isArray(e.target.value) ? e.target.value : []);
  };

  const handleSortChange = (e) => {
    handleChange(e, "sortBy", e.target.value);
  };

  const handleYearFromChange = (e) => {
    handleChange(e, "yearFrom", e.target.value);
  };

  const handleYearToChange = (e) => {
    handleChange(e, "yearTo", e.target.value);
  };

  const handleRatingFromChange = (e) => {
    handleChange(e, "ratingFrom", e.target.value);
  };

  const handleRatingToChange = (e) => {
    handleChange(e, "ratingTo", e.target.value);
  };

  const handleLanguageChange = (e) => {
    handleChange(e, "language", e.target.value);
  };

  const handleResetFilters = () => {
    props.onUserInput("name", "");
    props.onUserInput("genre", []);
    props.onUserInput("sortBy", "");
    props.onUserInput("yearFrom", "");
    props.onUserInput("yearTo", "");
    props.onUserInput("ratingFrom", "");
    props.onUserInput("ratingTo", "");
    props.onUserInput("language", "");
  };

  return (
    <Card
      sx={{
        backgroundColor: "rgb(204, 204, 0)"
      }}
      variant="outlined"
    >
      <CardContent>
        <Typography variant="h5" component="h1">
          <SearchIcon fontSize="large" />
          Filter the movies.
        </Typography>
        <TextField
          sx={{ ...formControl }}
          id="filled-search"
          label="Search field"
          type="search"
          variant="filled"
          value={props.titleFilter}
          onChange={handleTextChange}
        />
        <FormControl sx={{ ...formControl }}>
          <InputLabel id="genre-label">Genre</InputLabel>
          <Select
            labelId="genre-label"
            id="genre-select"
            multiple
            value={Array.isArray(props.genreFilter) ? props.genreFilter : []} // Ensure value is an array
            onChange={handleGenreChange}
            renderValue={(selected) =>
              genres
                .filter((genre) => selected.includes(genre.id))
                .map((genre) => genre.name)
                .join(", ")
            }
          >
            {genres.map((genre) => {
              return (
                <MenuItem key={genre.id} value={genre.id}>
                  {genre.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl sx={{ ...formControl }}>
          <InputLabel id="sort-label">Sort By</InputLabel>
          <Select
            labelId="sort-label"
            id="sort-select"
            value={props.sortBy}
            onChange={handleSortChange}
          >
            <MenuItem value="rating">Rating</MenuItem>
            <MenuItem value="releaseDate">Release Date</MenuItem>
          </Select>
        </FormControl>
        <TextField
          sx={{ ...formControl }}
          id="year-from"
          label="Year From"
          type="number"
          variant="filled"
          value={props.yearFrom}
          onChange={handleYearFromChange}
        />
        <TextField
          sx={{ ...formControl }}
          id="year-to"
          label="Year To"
          type="number"
          variant="filled"
          value={props.yearTo}
          onChange={handleYearToChange}
        />
        <TextField
          sx={{ ...formControl }}
          id="rating-from"
          label="Rating From"
          type="number"
          variant="filled"
          value={props.ratingFrom}
          onChange={handleRatingFromChange}
        />
        <TextField
          sx={{ ...formControl }}
          id="rating-to"
          label="Rating To"
          type="number"
          variant="filled"
          value={props.ratingTo}
          onChange={handleRatingToChange}
        />
        <FormControl sx={{ ...formControl }}>
          <InputLabel id="language-label">Language</InputLabel>
          <Select
            labelId="language-label"
            id="language-select"
            value={props.language}
            onChange={handleLanguageChange}
          >
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="es">Spanish</MenuItem>
            <MenuItem value="fr">French</MenuItem>
            {/* Add more languages as needed */}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleResetFilters}
          sx={{ marginTop: 2 }}
        >
          Clear Filters
        </Button>
      </CardContent>
      <CardMedia
        sx={{ height: 300 }}
        image={img}
        title="Filter"
      />
    </Card>
  );
}

