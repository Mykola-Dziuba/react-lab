import React, { useState } from "react";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");

  const handleAddMovie = () => {
    if (title.trim() && year.trim()) {
      setMovies([...movies, { title, year }]);
      setTitle("");
      setYear("");
    }
  };

  const handleDeleteMovie = (indexToDelete) => {
    setMovies(movies.filter((_, index) => index !== indexToDelete));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>INTRO</h1>
        <p className="subtitle">Cel dzisiejszych zajęć</p>
        <div className="movie-section">
          <h2>My favourite movies to watch</h2>
          {movies.length === 0 ? (
            <p>No movies yet. Maybe add something?</p>
          ) : (
            <ul>
              {movies.map((movie, index) => (
                <li key={index}>
                  <span>
                    {movie.title} ({movie.year})
                  </span>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteMovie(index)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
          <h3>Add movie</h3>
          <div className="form">
            <label>
              Tytuł
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label>
              Rok nagrania
              <input
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </label>
            <button className="add-btn" onClick={handleAddMovie}>
              ADD A MOVIE
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
