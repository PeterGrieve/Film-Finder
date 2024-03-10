import React from "react";
import "./styles.css";

const ClickedMovie = ({ movie, onClose }) => {
  return (
    <div className="clickedContent">
      <button className="closeButton" onClick={onClose}>
        Close
      </button>
      <h1>
        <u>{movie.title}</u>
      </h1>
      <div className="movieInfo">
        <p>
          <strong>Overview: </strong>
          {movie.overview}
        </p>
        <p>
          <strong>Release Date: </strong>
          {movie.release_date}
        </p>
        <p>
          <strong>Average Rating: </strong>
          {movie.vote_average} / 10
        </p>
      </div>
      <img
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt={movie.title}
      />
    </div>
  );
};

export default ClickedMovie;
