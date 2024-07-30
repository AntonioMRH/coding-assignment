import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import starredSlice from "../data/starredSlice";
import watchLaterSlice from "../data/watchLaterSlice";
import placeholder from "../assets/not-found-500X750.jpeg";

const Movie = ({ movie, viewTrailer, lastMovieRef }) => {
  const { starredMovies } = useSelector((state) => state.starred);
  const { watchLaterMovies } = useSelector((state) => state.watchLater);
  const { starMovie, unstarMovie } = starredSlice.actions;
  const { addToWatchLater, removeFromWatchLater } = watchLaterSlice.actions;

  const dispatch = useDispatch();

  const handleStar = useCallback(() => {
    dispatch(
      starMovie({
        id: movie.id,
        overview: movie.overview,
        release_date: movie.release_date?.substring(0, 4),
        poster_path: movie.poster_path,
        title: movie.title,
      })
    );
  }, [dispatch, movie, starMovie]);

  const handleUnstar = useCallback(() => {
    dispatch(unstarMovie(movie));
  }, [dispatch, movie, unstarMovie]);

  const handleAddToWatchLater = useCallback(() => {
    dispatch(
      addToWatchLater({
        id: movie.id,
        overview: movie.overview,
        release_date: movie.release_date?.substring(0, 4),
        poster_path: movie.poster_path,
        title: movie.title,
      })
    );
  }, [dispatch, movie, addToWatchLater]);

  const handleRemoveFromWatchLater = useCallback(() => {
    dispatch(removeFromWatchLater(movie));
  }, [dispatch, movie, removeFromWatchLater]);

  const handleViewTrailer = useCallback(() => {
    viewTrailer(movie);
  }, [viewTrailer, movie]);

  const handleCloseMobileMovieCard = useCallback((e) => {
    if (!e) e = window.event;
    e.stopPropagation();
    e.target.parentElement.parentElement.classList.remove("opened");
  }, []);

  const isStarred = starredMovies.some(
    (starredMovie) => starredMovie.id === movie.id
  );
  const isInWatchLater = watchLaterMovies.some(
    (watchLaterMovie) => watchLaterMovie.id === movie.id
  );

  return (
    <div
      className="wrapper col-3 col-sm-4 col-md-3 col-lg-3 col-xl-2"
      ref={lastMovieRef}
    >
      <div
        className="card"
        onClick={(e) => e.currentTarget.classList.add("opened")}
      >
        <div className="card-body text-center">
          <div className="overlay" />
          <div className="info_panel">
            <div className="overview">{movie.overview}</div>
            <div className="year">{movie.release_date?.substring(0, 4)}</div>
            {!isStarred ? (
              <span
                className="btn-star"
                data-testid="starred-link"
                onClick={handleStar}
              >
                <i className="bi bi-star" />
              </span>
            ) : (
              <span
                className="btn-star"
                data-testid="unstar-link"
                onClick={handleUnstar}
              >
                <i className="bi bi-star-fill" data-testid="star-fill" />
              </span>
            )}
            {!isInWatchLater ? (
              <button
                type="button"
                data-testid="watch-later"
                className="btn btn-light btn-watch-later"
                onClick={handleAddToWatchLater}
              >
                Watch Later
              </button>
            ) : (
              <button
                type="button"
                data-testid="remove-watch-later"
                className="btn btn-light btn-watch-later blue"
                onClick={handleRemoveFromWatchLater}
              >
                <i className="bi bi-check"></i>
              </button>
            )}
            <button
              type="button"
              className="btn btn-dark"
              onClick={handleViewTrailer}
            >
              View Trailer
            </button>
          </div>
          <img
            className="center-block"
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : placeholder
            }
            alt="Movie poster"
          />
        </div>
        <h6 className="title mobile-card">{movie.title}</h6>
        <h6 className="title">{movie.title}</h6>
        <button
          type="button"
          className="close"
          onClick={handleCloseMobileMovieCard}
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  );
};

export default Movie;
