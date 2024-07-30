import Movie from "../../components/Movie";
import "./home.scss";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import { useSearchParams } from "react-router-dom";
import { ENDPOINT_DISCOVER, ENDPOINT_SEARCH } from "../../constants";
import { fetchMovies, reset, selectAllMovies } from "../../data/moviesSlice";

const Home = () => {
  const { fetchStatus, totalPages, page } = useSelector(
    (state) => state.movies
  );
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");
  const allMovies = useSelector(selectAllMovies);

  const hasMore = page < totalPages;
  const dispatch = useDispatch();

  const fetchMovieList = useCallback(() => {
    const endpoint = searchQuery
      ? `${ENDPOINT_SEARCH}&query=${searchQuery}`
      : ENDPOINT_DISCOVER;

    dispatch(reset());
    dispatch(fetchMovies({ apiUrl: endpoint, page: 1 }));
  }, [searchQuery, dispatch]);

  const fetchNextPage = () => {
    const endpoint = searchQuery
      ? `${ENDPOINT_SEARCH}&query=${searchQuery}`
      : ENDPOINT_DISCOVER;
    dispatch(fetchMovies({ apiUrl: endpoint, page: page }));
  };

  useEffect(() => {
    fetchMovieList();
  }, [fetchMovieList]);

  const lastMovieElementRef = useInfiniteScroll(
    hasMore,
    fetchStatus,
    fetchNextPage
  );

  return (
    <div data-testid="movies" className="movies-container">
      {allMovies?.map((movie, idx) => {
        if (allMovies.length === idx + 1) {
          return (
            <Movie
              movie={movie}
              key={movie.id}
              lastMovieRef={lastMovieElementRef}
            />
          );
        } else {
          return <Movie movie={movie} key={movie.id} />;
        }
      })}
    </div>
  );
};

export default Home;
