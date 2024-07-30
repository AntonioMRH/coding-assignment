import { useDispatch } from "react-redux";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { ENDPOINT_SEARCH, ENDPOINT_DISCOVER } from "../constants";
import { fetchMovies } from "../data/moviesSlice";
import { useEffect } from "react";

export const useFetchMovies = (searchQuery, page) => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    console.log(searchQuery);
    const endpoint = searchQuery
      ? `${ENDPOINT_SEARCH}&query=${searchQuery}&page=${page}`
      : `${ENDPOINT_DISCOVER}&page=${page}`;

    dispatch(fetchMovies(endpoint));
    setSearchParams(
      createSearchParams(searchQuery ? { search: searchQuery } : {})
    );
  }, [dispatch, searchQuery, page, setSearchParams]);
};
