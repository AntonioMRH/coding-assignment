import {
  createSearchParams,
  Link,
  NavLink,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { useCallback, useMemo, useState } from "react";
import "../styles/header.scss";
import { debounce } from "../utils/debounce";

const Header = ({ searchMovies }) => {
  const starredMovies = useSelector((state) => state.starred.starredMovies);
  const [searchValue, setSearchValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const debouncedSetSearchParams = useMemo(
    () =>
      debounce((value) => {
        setSearchParams(createSearchParams({ search: value, page: 1 }));
      }, 500),
    [setSearchParams]
  );

  const handleSearch = useCallback(
    (e) => {
      const value = e.target.value;
      setSearchValue(value);
      debouncedSetSearchParams(value);
    },
    [debouncedSetSearchParams]
  );

  const handleHomeClick = useCallback(() => {
    searchMovies("");
    setSearchValue("");
    navigate("/");
  }, [searchMovies, navigate]);

  return (
    <header>
      <Link to="/" data-testid="home">
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
        <NavLink
          to="/watch-later"
          className="nav-fav"
          data-testid="nav-watch-later"
        >
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
