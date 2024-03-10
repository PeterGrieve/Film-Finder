const Movie = (props) => {
    const handleClick = () => {
      props.handleClick(props.movie);
    };
  
    return (
      <div className="movie" onClick={handleClick}>
        <img
          src={`https://image.tmdb.org/t/p/original${props.movie.poster_path}`}
          alt="poster"
          height={100}
          width={75}
        />
      </div>
    );
  };
  
  export default Movie;
  