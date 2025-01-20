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
                        onDelete={() => onDelete(movie.id)} // Используем id вместо index
                        onEdit={() => onEdit(movie)} // Добавляем обработчик редактирования
                    />
                ))}
            </ul>
        </div>
    );
}

