import React, { useState, useEffect } from "react";
import "milligram";
import MovieForm from "./MovieForm";
import MoviesList from "./MoviesList";
import ActorForm from "./ActorForm";

function App() {
    const [movies, setMovies] = useState([]);
    const [showMovieForm, setShowMovieForm] = useState(false);
    const [showActorForm, setShowActorForm] = useState(false); // Manage the actor form visibility
    const [editingMovie, setEditingMovie] = useState(null); // Manage the movie being edited

    // Fetch movies from the backend when the component is mounted
    useEffect(() => {
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

        fetchMovies();
    }, []);

    const addMovie = async (movie) => {
        try {
            const response = await fetch("http://127.0.0.1:8000/movies/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(movie),
            });
            if (!response.ok) {
                throw new Error("Failed to add movie");
            }
            const newMovie = await response.json();
            setMovies([...movies, newMovie]);
            alert("Movie added successfully!");
        } catch (error) {
            console.error("Error adding movie:", error);
        }
    };

    const addActor = async (actor) => {
        try {
            const response = await fetch("http://127.0.0.1:8000/actors/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(actor),
            });
            if (!response.ok) {
                throw new Error("Failed to add actor");
            }
            const newActor = await response.json();
            alert(`Actor added: ${newActor.name} ${newActor.surname}`);
            setShowActorForm(false); // Close the actor form
        } catch (error) {
            console.error("Error adding actor:", error);
        }
    };

    const updateMovie = async (movie) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/movies/${movie.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(movie),
            });
            if (!response.ok) {
                throw new Error("Failed to update movie");
            }
            const updatedMovie = await response.json();
            setMovies(movies.map((m) => (m.id === updatedMovie.id ? updatedMovie : m)));
            alert("Movie updated successfully!");
        } catch (error) {
            console.error("Error updating movie:", error);
        }
    };

    const deleteMovie = async (movieId) => {
        if (!window.confirm("Are you sure you want to delete this movie?")) return;
        try {
            const response = await fetch(`http://127.0.0.1:8000/movies/${movieId}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Failed to delete movie");
            }
            setMovies(movies.filter((movie) => movie.id !== movieId));
            alert("Movie deleted successfully!");
        } catch (error) {
            console.error("Error deleting movie:", error);
        }
    };

    return (
        <div className="container">
            <h1>My favourite movies to watch</h1>
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

            {/* Form visibility management */}
            <div style={{ marginTop: "10px" }}>
                <button
                    className="button"
                    onClick={() => {
                        setShowMovieForm(!showMovieForm);
                        setShowActorForm(false); // Hide actor form
                        setEditingMovie(null); // Clear editing state
                    }}
                >
                    {showMovieForm ? "Hide Movie Form" : "Add a Movie"}
                </button>
                <button
                    className="button"
                    onClick={() => {
                        setShowActorForm(!showActorForm);
                        setShowMovieForm(false); // Hide movie form
                    }}
                    style={{ marginLeft: "10px" }}
                >
                    {showActorForm ? "Hide Actor Form" : "Add an Actor"}
                </button>
            </div>

            {/* Movie form */}
            {showMovieForm && (
                <MovieForm
                    onMovieSubmit={(movie) => {
                        if (editingMovie) {
                            updateMovie({ ...editingMovie, ...movie });
                        } else {
                            addMovie(movie);
                        }
                        setShowMovieForm(false);
                    }}
                    buttonLabel={editingMovie ? "Edit Movie" : "Add a Movie"}
                    initialData={editingMovie || null}
                />
            )}

            {/* Actor form */}
            {showActorForm && (
                <ActorForm
                    onActorSubmit={addActor}
                    buttonLabel="Add Actor"
                />
            )}
        </div>
    );
}

export default App;
