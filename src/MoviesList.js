import Movie from "./Movie";

export default function MoviesList({ movies, onDelete, onEdit }) {
    return (
        <div>
            <h2>Movie List</h2>
            <ul>
                {movies.map((movie) => (
                    <Movie
                        key={movie.id}
                        movie={movie}
                        onDelete={() => onDelete(movie.id)} // Use movie ID for deletion
                        onEdit={() => onEdit(movie)} // Send full movie data for editing
                    />
                ))}
            </ul>
        </div>
    );
}
