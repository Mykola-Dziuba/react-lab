import React, { useState } from "react";

export default function ActorForm({ onActorSubmit, buttonLabel }) {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim() === "" || surname.trim() === "") {
            alert("Please fill in both fields");
            return;
        }
        onActorSubmit({ name, surname }); // Передача данных о новом актёре
        setName("");
        setSurname("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                First Name:
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </label>
            <label>
                Last Name:
                <input
                    type="text"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    required
                />
            </label>
            <button type="submit">{buttonLabel || "Add Actor"}</button>
        </form>
    );
}
