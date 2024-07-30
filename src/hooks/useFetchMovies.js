import { useDispatch } from "react-redux";
import { ENDPOINT_SEARCH, ENDPOINT_DISCOVER } from "../constants";
import { fetchMovies } from "../data/moviesSlice";
import { useEffect } from "react";
import { debounce } from "../utils/debounce";

export const useFetchMovies = (searchQuery, page) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const endpoint = searchQuery
      ? `${ENDPOINT_SEARCH}&query=${searchQuery}&page=${page}`
      : `${ENDPOINT_DISCOVER}&page=${page}`;

    dispatch(debounce(fetchMovies(endpoint), 400));
  }, [dispatch, searchQuery, page]);
};
