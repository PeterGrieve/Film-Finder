import React from 'react';

function SavedMovies({savedMovies}) {
    if (SavedMovies.Movies.length  === 0) {
        return <div>No movies saved</div>;;
    }

    return (
        <div>
            <h2>Saved Movies</h2>
            <ul>
                {savedMovies.map((movie) => (
                    <li key ={movie.id}>{movie.title}</li>
                ))}
            </ul>
        </div>
    )
}

export default SavedMovies;