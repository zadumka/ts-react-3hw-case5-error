import css from "./App.module.css";More actions
// import axios from "axios";
import type { Movie } from "../../types/movie";
import { fetchMovies } from "../../services/movieService";
import { useEffect, useState } from "react";

import toast, { Toaster } from "react-hot-toast";

import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import SearchBar from "../SearchBar/SearchBar";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
 
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      toast.error("Please enter a search query.");
      return;
    }

    setLoading(true);
    setError(false);
    setMovies([]);
    try {
      const fetchedMovies = await fetchMovies(trimmedQuery);
      if (fetchedMovies.length === 0) {
        toast.error("No movies found for your request.");
      }
      setMovies(fetchedMovies);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };
  useEffect(() => {
    document.body.style.overflow = selectedMovie ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedMovie]);

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {!loading && !error && movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={handleSelect} />
      )}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
      <Toaster position="top-center" />
    </div>
  );
}
