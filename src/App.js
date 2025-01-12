import { useState } from "react";
import "milligram";

function App() {
    const [title, setTitle] = useState("");
    const [movies, setMovies] = useState([
        { title: "Wall-E" },
        { title: "Pulp Fiction" },
        { title: "Matrix" },
        { title: "1670" },
    ]);

    const handleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleClick = () => {
        if (title.trim() !== "") {
            alert(`Wpisany tytuł to: ${title}`);
        } else {
            alert("Proszę wpisać tytuł filmu.");
        }
    };

    let message;
    if (title.length > 0) {
        if (title.length < 5) {
            message = "Tytuł jest dość krótki.";
        } else if (title.length > 50) {
            message = "To bardzo długi tytuł!";
        } else {
            message = "Tytuł jest w sam raz.";
        }
    }

    return (
        <div>
            <h1>My favourite movies to watch</h1>
            <h2>My favourite movie for today is {title}</h2>
            <input
                type="text"
                value={title}
                onChange={handleChange}
                placeholder="Wpisz tytuł filmu"
            />
            {message && <p>{message}</p>}
            <button onClick={handleClick}>Pokaż tytuł</button>
            <h3>Lista filmów:</h3>
            <ul>
                {movies.map((movie) => (
                    <li key={movie.title}>{movie.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;

