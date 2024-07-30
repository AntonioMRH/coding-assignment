import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import watchLaterSlice from "../../data/watchLaterSlice";
import Movie from "../../components/Movie";
import "./watch-later.scss";

const WatchLater = () => {
  const { watchLaterMovies } = useSelector((state) => state.watchLater);
  const { removeAllWatchLater } = watchLaterSlice.actions;
  const dispatch = useDispatch();

  const handleRemoveAllWatchLater = () => dispatch(removeAllWatchLater());

  return (
    <div className="starred" data-testid="watch-later-div">
      {watchLaterMovies.length > 0 ? (
        <div data-testid="watch-later-movies" className="starred-movies">
          <h6 className="header">Watch Later List</h6>
          <div className="row">
            {watchLaterMovies.map((movie) => (
              <Movie movie={movie} key={movie.id} />
            ))}
          </div>
          <footer className="text-center">
            <button
              className="btn btn-primary"
              onClick={handleRemoveAllWatchLater}
            >
              Empty list
            </button>
          </footer>
        </div>
      ) : (
        <div className="text-center empty-cart">
          <i className="bi bi-heart" />
          <p>You have no movies saved to watch later.</p>
          <p>
            Go to <Link to="/">Home</Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default WatchLater;
