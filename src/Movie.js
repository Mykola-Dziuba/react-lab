export default function Movie({ movie, onDelete, onEdit }) {
    return (
        <li
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <span>
                <strong>{movie.title}</strong> ({movie.year}) <br />
                <small>Actors: {movie.actors.map((actor) => `${actor.name} ${actor.surname}`).join(", ")}</small>
            </span>
            <div>
                <button
                    className="button button-outline"
                    onClick={onEdit}
                    style={{ marginLeft: "10px" }}
                >
                    Edit
                </button>
                <button
                    className="button button-outline"
                    onClick={onDelete}
                    style={{ marginLeft: "10px" }}
                >
                    Delete
                </button>
            </div>
        </li>
    );
}


