import { useEffect, useState } from "react";
import "./App.css";
import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";

// API key : 860d63bb

const API_URL = `http://www.omdbapi.com?apikey=860d63bb`;

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchterm, setSearchTerm] = useState("");

  useEffect(() => {
    searchMovies(searchterm);
  }, [searchterm]);

  const searchMovies = async (title) => {
    try {
      const response = await fetch(`${API_URL}&s=${title}`);
      const data = await response.json();
      setMovies(data.Search);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="app">
      <h1>MovieLand</h1>
      <div className="search">
        <input
          placeholder="Search for movies..."
          value={searchterm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => {
            searchMovies(searchterm);
          }}
        />
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2> No movies</h2>
        </div>
      )}
      ;
    </div>
  );
};

export default App;
