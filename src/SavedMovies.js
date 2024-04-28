import ScrollButton from "./ScrollButton";
import React, { useState } from "react";
import Movie from "./Movie";
import "./styles.css";

const SavedMovies = (props) => {
  const [startIndex, setStartIndex] = useState(0);

  const handleClick = (movie) => {
    props.handleMovieClick(movie);
  };
  const data = props.data;
  const increaseIndexes = () => {
    const newStart = (startIndex + 3) % data.length;
    setStartIndex(newStart);
  };

  const decreaseIndexes = () => {
    const newStart = (startIndex - 3 + data.length) % data.length;
    setStartIndex(newStart);
  };
  return (
    <>
      <h1>{props.genre}</h1>
      <div className="scroll">
        <ScrollButton onClick={decreaseIndexes} arrow="⬅️" />
        <Movies data={data} start={startIndex} handleClick={handleClick} />
        <ScrollButton onClick={increaseIndexes} arrow="➡️" />
      </div>
    </>
  );
};

function Movies(props) {
  // console.log(view);

  const handleClick = (movie) => {
    props.handleClick(movie);
  };

  const movies = props.data;
  const slicedMovies = Array.from({ length: 6 }, (_, index) => {
    let movieIndex = (props.start + index) % movies.length;
    return movies[movieIndex];
  });
  return (
    <div>
      <div className="savedMovies">
        {slicedMovies.map((movie, index) => (
          <Movie key={index} movie={movie} handleClick={handleClick} />
        ))}
      </div>
    </div>
  );
}


export default SavedMovies;