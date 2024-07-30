import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import starredSlice from "../../data/starredSlice";
import Movie from "../../components/Movie";
import "./starred.scss";

const Starred = () => {
  const { starredMovies } = useSelector((state) => state.starred);
  const { clearAllStarred } = starredSlice.actions;
  const dispatch = useDispatch();

  const handleClearAllStarred = () => dispatch(clearAllStarred());

  return (
    <div className="starred" data-testid="starred">
      {starredMovies.length > 0 ? (
        <div data-testid="starred-movies" className="starred-movies">
          <h6 className="header">Starred movies</h6>
          <div className="row">
            {starredMovies.map((movie) => (
              <Movie movie={movie} key={movie.id} />
            ))}
          </div>

          <footer className="text-center">
            <button className="btn btn-primary" onClick={handleClearAllStarred}>
              Remove all starred
            </button>
          </footer>
        </div>
      ) : (
        <div className="text-center empty-cart">
          <i className="bi bi-star" />
          <p>There are no starred movies.</p>
          <p>
            Go to <Link to="/">Home</Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default Starred;
