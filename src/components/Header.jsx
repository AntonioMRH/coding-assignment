import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCallback, useState } from "react";
import "../styles/header.scss";

const Header = ({ searchMovies }) => {
  const starredMovies = useSelector((state) => state.starred.starredMovies);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const handleSearch = useCallback(
    (e) => {
      setSearchValue(e.target.value);
      searchMovies(e.target.value);
    },
    [searchMovies]
  );

  const handleHomeClick = useCallback(() => {
    searchMovies("");
    setSearchValue("");
    navigate("/");
  }, [searchMovies, navigate]);

  return (
    <header>
      <Link to="/" data-testid="home" onClick={handleHomeClick}>
        <i className="bi bi-film" />
      </Link>

      <nav>
        <NavLink
          to="/starred"
          data-testid="nav-starred"
          className="nav-starred"
        >
          {starredMovies.length > 0 ? (
            <>
              <i className="bi bi-star-fill bi-star-fill-white" />
              <sup className="star-number">{starredMovies.length}</sup>
            </>
          ) : (
            <i className="bi bi-star" />
          )}
        </NavLink>
        <NavLink to="/watch-later" className="nav-fav">
          Watch Later
        </NavLink>
      </nav>

      <div className="input-group rounded">
        <input
          type="search"
          data-testid="search-movies"
          value={searchValue}
          onChange={handleSearch}
          className="form-control rounded"
          placeholder="Search movies..."
          aria-label="Search movies"
          aria-describedby="search-addon"
        />
        {searchValue && (
          <button className="btn btn-clear" onClick={handleHomeClick}>
            <i className="bi bi-x" />
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
