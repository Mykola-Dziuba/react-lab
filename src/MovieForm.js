import React, { useState, useEffect } from "react";

export default function MovieForm({ onMovieSubmit, buttonLabel, initialData }) {
    const [title, setTitle] = useState(initialData?.title || "");
    const [year, setYear] = useState(initialData?.year || "");
    const [director, setDirector] = useState(initialData?.director || "");
    const [description, setDescription] = useState(initialData?.description || "");
    const [actors, setActors] = useState([]); // Selected actors
    const [availableActors, setAvailableActors] = useState([]); // All available actors
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // ✅ Load available actors from API
    useEffect(() => {
        const fetchActors = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/actors/");
                if (!response.ok) {
                    throw new Error("Failed to fetch actors");
                }
                const data = await response.json();
                setAvailableActors(data);
            } catch (error) {
                console.error("Error fetching actors:", error);
                setError("Failed to load actors. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchActors();
    }, []);

    // ✅ When editing a movie, load existing actor selections
    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title || "");
            setYear(initialData.year || "");
            setDirector(initialData.director || "");
            setDescription(initialData.description || "");

            // ✅ Load actors correctly if editing a movie
            if (initialData.actors) {
                setActors(
                    initialData.actors.map((actor) => ({
                        id: actor.id,
                        name: actor.name,
                        surname: actor.surname,
                    }))
                );
            }
        }
    }, [initialData]);

    // ✅ Add actor to the selected list
    const addActor = (actorId) => {
        const selectedActor = availableActors.find((actor) => actor.id === Number(actorId));
        if (selectedActor && !actors.some((actor) => actor.id === selectedActor.id)) {
            setActors((prevActors) => [...prevActors, selectedActor]); // ✅ Correct state update
        }
    };

    // ✅ Remove actor from the selected list
    const removeActor = (actorId) => {
        setActors((prevActors) => prevActors.filter((actor) => actor.id !== actorId));
    };

    // ✅ Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // ✅ Ensure actors are saved in the correct format
        const formattedActors = actors.map(actor => actor.id);
        const movieData = { title, year, director, description, actors: formattedActors };

        try {
            let response;
            if (initialData) {
                // ✅ Update movie (PUT)
                response = await fetch(`http://127.0.0.1:8000/movies/${initialData.id}/`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(movieData),
                });
            } else {
                // ✅ Add new movie (POST)
                response = await fetch("http://127.0.0.1:8000/movies/", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(movieData),
                });
            }

            if (!response.ok) {
                throw new Error("Failed to save movie");
            }

            onMovieSubmit(); // ✅ Refresh UI after saving
        } catch (error) {
            console.error("Error saving movie:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{initialData ? "Edit Movie" : "Add Movie"}</h2>

            <label>
                Title:
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </label>

            <label>
                Year:
                <input type="number" value={year} onChange={(e) => setYear(e.target.value)} required />
            </label>

            <label>
                Director:
                <input type="text" value={director} onChange={(e) => setDirector(e.target.value)} />
            </label>

            <label>
                Description:
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
            </label>

            {/* ✅ Actor Selection */}
            <label>
                Select Actor:
                {loading ? (
                    <p>Loading actors...</p>
                ) : error ? (
                    <p style={{ color: "red" }}>{error}</p>
                ) : (
                    <select onChange={(e) => addActor(e.target.value)}>
                        <option value="">-- Select an actor --</option>
                        {availableActors.map((actor) => (
                            <option key={actor.id} value={actor.id}>
                                {actor.name} {actor.surname}
                            </option>
                        ))}
                    </select>
                )}
            </label>

            {/* ✅ Display Selected Actors */}
            {actors.length > 0 && (
                <div>
                    <strong>Selected actors:</strong>
                    <ul>
                        {actors.map((actor) => (
                            <li key={actor.id}>
                                {actor.name} {actor.surname}{" "}
                                <button type="button" onClick={() => removeActor(actor.id)}
                                    style={{ marginLeft: "10px", color: "red", cursor: "pointer" }}>
                                    ✖
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                <button type="submit">{buttonLabel || "Submit"}</button>
            </div>
        </form>
    );
}
