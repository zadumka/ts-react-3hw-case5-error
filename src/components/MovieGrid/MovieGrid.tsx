import { Movie } from '../../types/movie';
import css from './MovieGrid.module.css';

interface MovieGridProps {
    movies: Movie[];
    onSelect: (movie: Movie) => void;
}

export default function MovieGrid({ movies, onSelect }: MovieGridProps) {
    return (
        <div className={css.grid}>
            {' '}
            {movies.map((movie) => (
                <div key={movie.id} className={css.card}>
                    {' '}
                    <img
                        className={css.image}
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        loading="lazy"
                        onClick={() => onSelect(movie)}
                    />
                    <h2 className={css.title}>{movie.title}</h2>
                </div>
            ))}
        </div>
    );
}
