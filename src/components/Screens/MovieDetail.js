import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function MovieDetail() {
  const { id } = useParams();
  console.log("cemil - imdbID:", id);
  const [movieDetail, setMovieDetail] = useState({});
  console.log("cemil - movieDetail:", movieDetail);

  useEffect(() => {
    getMovieDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getMovieDetails = async () => {
    try {
      const response = await axios.get(
        `http://www.omdbapi.com/?i=${id}&plot=full&apikey=${process.env.REACT_APP_MOVIE_API_KEY}`
      );
      console.log("cemil - response:", response);
      const movieSearchResponse = response.data;
      if (movieSearchResponse.Response === "false") {
        setMovieDetail({});
        return;
      }
      setMovieDetail(movieSearchResponse);
    } catch (error) {
      console.error("axios error", error);
    }
  };
  return (
    <div class="detailContainer" >
      <img class="movieDetailPoster" src={movieDetail?.Poster} />
      <h1 class="movieDetailTitle" >{movieDetail?.Title}</h1>
      <h3>Length: {movieDetail?.Runtime}</h3>
      <h3>IMDB Score: {movieDetail?.Ratings?.[0]?.Value}</h3>
      <h3>Genre: {movieDetail?.Genre}</h3>
      <h3>Actors: {movieDetail?.Actors}</h3>
      <h3>Director: {movieDetail?.Director}</h3>
      <p>{movieDetail?.Plot}</p>
    </div>
  );
}

export default MovieDetail;
