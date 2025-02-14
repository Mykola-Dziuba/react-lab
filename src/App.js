import React, { useState, useEffect } from "react";
import "milligram";
import MovieForm from "./MovieForm";
import MoviesList from "./MoviesList";
import ActorForm from "./ActorForm";

function App() {
    const [movies, setMovies] = useState([]);
    const [showMovieForm, setShowMovieForm] = useState(false);
    const [showActorForm, setShowActorForm] = useState(false);
    const [editingMovie, setEditingMovie] = useState(null);

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/movies/");
            if (!response.ok) {
                throw new Error("Failed to fetch movies");
            }
            const data = await response.json();
            setMovies(data);
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };

    const addMovie = async (movie) => {
        try {
            const response = await fetch("http://127.0.0.1:8000/movies/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(movie),
            });
            if (!response.ok) {
                throw new Error("Failed to add movie");
            }
            await fetchMovies();
            setShowMovieForm(false);
            alert("Movie added successfully!");
        } catch (error) {
            console.error("Error adding movie:", error);
        }
    };

    const addActor = async (actor) => {
        try {
            const response = await fetch("http://127.0.0.1:8000/actors/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(actor),
            });
            if (!response.ok) {
                throw new Error("Failed to add actor");
            }
            alert("Actor added successfully!");
            setShowActorForm(false);
        } catch (error) {
            console.error("Error adding actor:", error);
        }
    };

    const updateMovie = async (movie) => {
        try {
            const movieData = {
                ...movie,
                actors: movie.actors.map(actor => actor.id), // Отправляем только ID актеров
            };

            console.log("Updating movie:", movieData); // Логируем отправляемые данные

            const response = await fetch(`http://127.0.0.1:8000/movies/${movie.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(movieData),
            });

            if (!response.ok) {
                throw new Error("Failed to update movie");
            }

            await fetchMovies();
            setEditingMovie(null);
            setShowMovieForm(false);
            alert("Movie updated successfully!");
        } catch (error) {
            console.error("Error updating movie:", error);
        }
    };


    const deleteMovie = async (movieId) => {
        if (!window.confirm("Are you sure you want to delete this movie?")) return;
        try {
            const response = await fetch(`http://127.0.0.1:8000/movies/${movieId}/`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Failed to delete movie");
            }
            await fetchMovies();
            alert("Movie deleted successfully!");
        } catch (error) {
            console.error("Error deleting movie:", error);
        }
    };

    return (
        <div className="container">
            <h1>My Favourite Movies</h1>
            {movies.length === 0 ? (
                <p>No movies yet. Maybe add something?</p>
            ) : (
                <MoviesList
                    movies={movies}
                    onDelete={deleteMovie}
                    onEdit={(movie) => {
                        setEditingMovie(movie);
                        setShowMovieForm(true);
                        setShowActorForm(false);
                    }}
                />
            )}
            <div style={{ marginTop: "10px" }}>
                <button
                    className="button"
                    onClick={() => {
                        setShowMovieForm(!showMovieForm);
                        setShowActorForm(false);
                        setEditingMovie(null);
                    }}
                >
                    {showMovieForm ? "Hide Movie Form" : "Add a Movie"}
                </button>
                <button
                    className="button"
                    onClick={() => {
                        setShowActorForm(!showActorForm);
                        setShowMovieForm(false);
                    }}
                    style={{ marginLeft: "10px" }}
                >
                    {showActorForm ? "Hide Actor Form" : "Add an Actor"}
                </button>
            </div>
            {showMovieForm && (
                <MovieForm
                    onMovieSubmit={(movie) => {
                        if (editingMovie) {
                            updateMovie({ ...editingMovie, ...movie });
                        } else {
                            addMovie(movie);
                        }
                    }}
                    buttonLabel={editingMovie ? "Edit Movie" : "Add a Movie"}
                    initialData={editingMovie || null}
                />
            )}
            {showActorForm && (
                <ActorForm onActorSubmit={addActor} buttonLabel="Add Actor" />
            )}
        </div>
    );
}

export default App;
