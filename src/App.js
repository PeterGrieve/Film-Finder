import "./styles.css";
import { useState, useEffect } from "react";
import MovieList from "./MovieList";
import ClickedMovie from "./ClickedMovie";
import Reference from "./reference";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";

import {
  // Import predefined theme
  ThemeSupa,
} from "@supabase/auth-ui-shared";

const supabase = createClient(
  "https://zcxvjkiabgnvqtxzeydw.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjeHZqa2lhYmdudnF0eHpleWR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQwNzI2MjQsImV4cCI6MjAyOTY0ODYyNH0.etdUIOKD6iCblor3zg2qf1pmg7kkm-ARcWB-QZv6qYk"
);

export default function App() {
  const [popular, setPopular] = useState(undefined);
  const [action, setAction] = useState(undefined);
  const [comedy, setComedy] = useState(undefined);
  const [drama, setDrama] = useState(undefined);
  const [clickedMovie, setClickedMovie] = useState(undefined);

  const [session, setSession] = useState(null);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNjhkODFmY2YyYTQyMDBmNjNhNjc2YWY1YTYyODMxNiIsInN1YiI6IjY1ZGZjNTU5ZDM2M2U1MDE4NjgyYjA4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7c3Zgxt4r6yDgRVuC8OAfBTe3Xd1XxazVRJWldBoRNU",
    },
  };

  useEffect(() => {
    async function GetMovies() {
      fetch(
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
        options
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setPopular(data);
        })
        .catch((err) => {
          console.log(err.message);
        });

      fetch(
        "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=28",
        options
      )
        .then((response) => response.json())
        .then((data) => {
          setAction(data);
        })
        .catch((err) => {
          console.log(err.message);
        });

      fetch(
        "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=35",
        options
      )
        .then((response) => response.json())
        .then((data) => {
          setComedy(data);
        })
        .catch((err) => {
          console.log(err.message);
        });

      fetch(
        "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=18",
        options
      )
        .then((response) => response.json())
        .then((data) => {
          setDrama(data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }

    GetMovies();

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleMovieClick = (movie) => {
    setClickedMovie(movie);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCloseClicked = () => {
    setClickedMovie(undefined);
  };

  const signOutUser = async () => {
    const { error } = await supabase.auth.signOut();
  };

  return (
    <div className="App">
      {!session ? (
        <Auth
          appearance={{
            style: {
              input: { background: "white", color: "black", width: "100%" },
              container: {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "white",
                padding: "1rem",
                borderRadius: "1rem",
                width: "100%",
              },
              button: {
                width: "75%",
              },
              message: {
                width: "100%",
              },
            },
            theme: ThemeSupa,
          }}
          supabaseClient={supabase}
          providers={{}}
        />
      ) : (
        <>
          <div className="signOutContainer">
            <button onClick={signOutUser}>Sign Out</button>
          </div>
          <header>Film Finder</header>
          {clickedMovie && (
            <ClickedMovie movie={clickedMovie} onClose={handleCloseClicked} />
          )}
          <MovieList
            data={popular ? popular.results : "Loading..."}
            genre="Popular Movies"
            handleMovieClick={handleMovieClick}
          />
          <MovieList
            data={action ? action.results : "Loading..."}
            genre="Action Movies"
            handleMovieClick={handleMovieClick}
          />
          <MovieList
            data={comedy ? comedy.results : "Loading..."}
            genre="Comedies"
            handleMovieClick={handleMovieClick}
          />
          <MovieList
            data={drama ? drama.results : "Loading..."}
            genre="Dramas"
            handleMovieClick={handleMovieClick}
          />
          <Reference />
        </>
      )}
    </div>
  );
}

/* In TMDB, genres are referenced by ID:
{
  "genres": [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ]
}
*/
