import { useState } from "react";

export default function MovieForm({ onMovieSubmit, buttonLabel }) {
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');

    function addMovie(event) {
        event.preventDefault();
        if (title.length < 5) {
            return alert('Tytuł jest za krótki');
        }
        onMovieSubmit({ title, year });
        setTitle('');
        setYear('');
    }

    return (
        <form onSubmit={addMovie}>
            <h2>Add movie</h2>
            <div>
                <label>Tytuł</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
                <label>Rok nagrania</label>
                <input type="text" value={year} onChange={(e) => setYear(e.target.value)} />
            </div>
            <button>{buttonLabel || "Submit"}</button>
        </form>
    );
}
