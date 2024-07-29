import moviesSlice, { fetchMovies } from "../data/moviesSlice";
import { moviesMock } from "./movies.mocks";

describe("MovieSlice test", () => {
  it("should set loading true while action is pending", () => {
    const action = { type: fetchMovies.pending };
    const initialState = {
      movies: [],
      fetchStatus: "",
      totalPages: 0,
    };
    const state = moviesSlice.reducer(initialState, action);
    expect(state.fetchStatus).toEqual("loading");
  });

  it("should return payload when action is fulfilled", () => {
    const action = {
      type: fetchMovies.fulfilled,
      payload: moviesMock,
      meta: {
        arg: "",
      },
    };
    const initialState = {
      movies: [],
      fetchStatus: "",
      totalPages: 1,
    };
    const state = moviesSlice.reducer(initialState, action);
    expect(state.movies).toEqual(moviesMock.results);
    expect(state.totalPages).toEqual(moviesMock.total_pages);
    expect(state.fetchStatus).toEqual("success");
  });

  it("should set error when action is rejected", () => {
    const action = { type: fetchMovies.rejected };
    const initialState = {
      movies: [],
      fetchStatus: "",
      totalPages: 0,
    };
    const state = moviesSlice.reducer(initialState, action);
    expect(state.fetchStatus).toEqual("error");
  });
});
