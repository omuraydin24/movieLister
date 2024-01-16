import React, { useEffect, useState } from "react";
import axios from "axios";
import Dropdown from "../Dropdown";
import { useNavigate } from "react-router-dom";

function MovieList() {
  const navigate = useNavigate();

  const [movieList, setMovieList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("pokemon");
  const [searchYear, setSearchYear] = useState("");
  const [selectedType, setSelectedType] = useState("Movie");
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    getMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber]);

  const getMovies = async () => {
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?s=${searchTerm}&page=${pageNumber}&y=${searchYear}&type=${selectedType}&apikey=${process.env.REACT_APP_MOVIE_API_KEY}`
      );
      const movieSearchResponse = response.data;
      if (movieSearchResponse.Response === "false") {
        setMovieList([]);
        return;
      }
      setMovieList(movieSearchResponse);
    } catch (error) {
      console.error("axios error", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?s=${searchTerm}&page=${pageNumber}&y=${searchYear}&type=${selectedType}&apikey=${process.env.REACT_APP_MOVIE_API_KEY}`
      );
      const movieSearchResponse = response.data;

      if (movieSearchResponse.Response === "False") {
        setMovieList([]);
        return;
      }
      setMovieList(movieSearchResponse);
    } catch (error) {
      console.error("axios error", error);
    }
  };

  const handleNameChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleYearChange = (event) => {
    setSearchYear(event.target.value);
  };
  const handleMovieClick = (movieId) => {
    navigate(`/movies/${movieId}`);
  };
  const handlePreviousPage = () => {
    setPageNumber(pageNumber - 1);
  };
  const handleNextPage = () => {
    setPageNumber(pageNumber + 1);
  };

  return (
    <div>
      <header>
        <div>
          <form onSubmit={handleSubmit} className="headerContainer">
            <div>
              <p class="icon">Movie Lister</p>
            </div>
            <div class="inputContainer">
              <label className="fieldLabel">Title</label>
              <input
                className="inputField"
                type="text"
                id="searchTerm"
                value={searchTerm}
                onChange={handleNameChange}
              />
            </div>
            <div class="inputContainer">
              <label className="fieldLabel">Year</label>
              <input
                type="number"
                className="inputField"
                value={searchYear}
                onChange={handleYearChange}
              />
            </div>
            <div class="dropdownContainer">
              <label className="fieldLabel">Type</label>
              <Dropdown
                selectedType={selectedType}
                setSelectedType={setSelectedType}
              />
            </div>
            <button class="submitButton" type="submit">
              Search
            </button>
          </form>
        </div>
      </header>
      {movieList?.Search?.length > 0 ? (
        <div class="gridContainer">
          {movieList?.Search?.map((movie) => (
            <div
              key={movie.imdbID}
              class="gridElementContainer"
              onClick={() => handleMovieClick(movie.imdbID)}
            >
              <div class="gridElement">
                <img
                  class="moviePoster"
                  alt="movie poster"
                  src={movie.Poster}
                />
              </div>
              <div class="gridElement">
                <p class="movieInfoText">{movie.Title}</p>
              </div>
              <div class="gridElement">
                <p class="movieInfoText">{movie.Year}</p>
              </div>
              <div class="gridElement">
                <p class="movieInfoText">{movie.imdbID}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No Result Found</p>
      )}
      <div class="buttonsContainer">
        {pageNumber !== 1 && (
          <div class="changePageButton" onClick={handlePreviousPage}>
            Previous Page
          </div>
        )}
        <div class="changePageButton" onClick={handleNextPage}>
          <p>Next Page</p>
        </div>
      </div>
    </div>
  );
}

export default MovieList;
