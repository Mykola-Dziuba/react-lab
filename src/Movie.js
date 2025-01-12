export default function Movie({ movie, onDelete }) {
    return (
        <li>
            <strong>{movie.title}</strong> ({movie.year})
            <button className="button button-outline" onClick={onDelete}>
                Delete
            </button>
        </li>
    );
}
