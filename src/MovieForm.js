import React, { useState, useEffect } from "react";

export default function MovieForm({ onMovieSubmit, buttonLabel, initialData }) {
    const [title, setTitle] = useState(initialData?.title || "");
    const [year, setYear] = useState(initialData?.year || "");
    const [director, setDirector] = useState(initialData?.director || "");
    const [description, setDescription] = useState(initialData?.description || "");
    const [actors, setActors] = useState(initialData?.actors || []); // Array of selected actors
    const [availableActors, setAvailableActors] = useState([]); // List of all actors

    // Update fields and actors when initialData changes
    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title || "");
            setYear(initialData.year || "");
            setDirector(initialData.director || "");
            setDescription(initialData.description || "");

            // Set actors from initialData
            if (initialData.actors) {
                setActors(initialData.actors.map((actor) => ({
                    id: actor.id,
                    name: actor.name,
                    surname: actor.surname,
                })));
            }
        }
    }, [initialData]);

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
            }
        };

        fetchActors();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const movieData = { title, year, director, description, actors };
        onMovieSubmit(movieData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Title:
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </label>
            <label>
                Year:
                <input
                    type="number"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    required
                />
            </label>
            <label>
                Director:
                <input
                    type="text"
                    value={director}
                    onChange={(e) => setDirector(e.target.value)}
                />
            </label>
            <label>
                Description:
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </label>
            <label>
                Actors:
                <select
                    multiple
                    value={actors.map((actor) => actor.id)} // Array of selected actor IDs
                    onChange={(e) => {
                        const selectedIds = Array.from(e.target.selectedOptions).map(
                            (option) => Number(option.value)
                        );
                        const selectedActors = availableActors.filter((actor) =>
                            selectedIds.includes(actor.id)
                        );
                        setActors(selectedActors);
                    }}
                >
                    {availableActors.map((actor) => (
                        <option key={actor.id} value={actor.id}>
                            {actor.name} {actor.surname}
                        </option>
                    ))}
                </select>
            </label>
            <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                <button type="submit">{buttonLabel || "Submit"}</button>
            </div>
        </form>
    );
}
