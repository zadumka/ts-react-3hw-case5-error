import axios from "axios";More actions
import type { Movie } from "../types/movie";

interface FetchMoviesRes {
  results: Movie[];
}

export default async function fetchMovies(query: string) {

  const myKey = import.meta.env.VITE_API_KEY;

  try {
    const res = await axios.get<FetchMoviesRes>(
      "https://api.themoviedb.org/3/search/movie",
      {
        params: {
          query,
        },
        headers: {
          Authorization: `Bearer ${myKey}`,
        },
      }
    );
    return res.data.results;
  } catch  {
    return [];
  } 
  
}
