import {
  createSearchParams,
  Link,
  NavLink,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMemo, useState } from "react";
import "./header.scss";
import { debounce } from "../../utils/debounce";
import { reset } from "../../data/moviesSlice";

const Header = () => {
  const starredMovies = useSelector((state) => state.starred.starredMovies);
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const getSearchedMovies = useMemo(
    () =>
      debounce((query) => {
        if (query !== "") {
          dispatch(reset());
          setSearchParams(createSearchParams({ search: query }));
        } else {
          dispatch(reset());
          setSearchParams(createSearchParams({ search: "" }));
        }
      }, 400),
    [dispatch, setSearchParams]
  );

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    window.scrollTo({ top: 0, behavior: "instant" });
    getSearchedMovies(value);
  };

  const handleHomeClick = () => {
    setSearchValue("");
  };

  return (
    <header>
      <Link data-testid="home" to="/" onClick={handleHomeClick}>
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
          watch later
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
          <Link className="btn btn-clear" to="/" onClick={handleHomeClick}>
            <i className="bi bi-x" />
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
