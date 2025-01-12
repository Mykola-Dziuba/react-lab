import { useState } from "react";

function App() {
    const [title, setTitle] = useState("");

    function handleChange(event) {
        setTitle(event.target.value);
    }

    let message;
    if (title.length > 0) {
        if (title.length < 10) {
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
        </div>
    );
}

export default App;
