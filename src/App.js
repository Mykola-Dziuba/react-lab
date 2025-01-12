import { useState } from "react";
import "milligram";
import MovieForm from "./MovieForm";
import MoviesList from "./MoviesList";

function App() {
    const [movies, setMovies] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const addMovie = (movie) => {
        setMovies([...movies, movie]);
    };

    const deleteMovie = (indexToDelete) => {
        setMovies(movies.filter((_, index) => index !== indexToDelete));
    };

    return (
        <div className="container">
            <h1>My favourite movies to watch</h1>
            {movies.length === 0 ? (
                <p>No movies yet. Maybe add something?</p>
            ) : (
                <MoviesList movies={movies} onDelete={deleteMovie} />
            )}
            <button className="button" onClick={() => setShowForm(!showForm)}>
                {showForm ? "Hide Form" : "Add a Movie"}
            </button>
            {showForm && (
                <MovieForm 
                    onMovieSubmit={(movie) => {
                        addMovie(movie);
                        setShowForm(false); // Скрыть форму после добавления
                    }} 
                    buttonLabel="Add a movie" 
                />
            )}
        </div>
    );
}

export default App;
