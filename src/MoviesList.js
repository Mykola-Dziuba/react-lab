import Movie from "./Movie";

export default function MoviesList({ movies, onDelete }) {
    return (
        <div>
            <h2>Lista filmów</h2>
            <ul>
                {movies.map((movie, index) => (
                    <Movie 
                        key={index} 
                        movie={movie} 
                        onDelete={() => onDelete(index)} 
                    />
                ))}
            </ul>
        </div>
    );
}
