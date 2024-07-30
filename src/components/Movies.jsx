import Movie from "./Movie";
import "../styles/movies.scss";
import { useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { useFetchMovies } from "../hooks/useFetchMovies";
import { useSearchParams } from "react-router-dom";

const Movies = ({ viewTrailer }) => {
  const { movies, fetchStatus, totalPages } = useSelector(
    (state) => state.movies
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");
  const pageQuery = searchParams.get("page");
  const [page, setPage] = useState(pageQuery || 1);
  const hasMore = page < totalPages;

  useFetchMovies(searchQuery, page);

  const incrementPage = useCallback(() => {
    setPage((prevPage) => prevPage + 1);
  }, []);

  useEffect(() => {
    setPage(pageQuery);
  }, [pageQuery]);

  const lastMovieElementRef = useInfiniteScroll(
    hasMore,
    fetchStatus === "loading",
    incrementPage
  );

  return (
    <div data-testid="movies" className="movies-container">
      {movies?.map((movie, idx) => {
        if (movies.length === idx + 1) {
          return (
            <Movie
              movie={movie}
              key={movie.id}
              viewTrailer={viewTrailer}
              lastMovieRef={lastMovieElementRef}
            />
          );
        } else {
          return (
            <Movie movie={movie} key={movie.id} viewTrailer={viewTrailer} />
          );
        }
      })}
    </div>
  );
};

export default Movies;
