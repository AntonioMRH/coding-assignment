import moviesSlice, { fetchMovies, moviesAdapter } from "../data/moviesSlice";
import { moviesMock } from "./movies.mocks";

describe("MovieSlice test", () => {
  it("should set loading true while action is pending", () => {
    const action = { type: fetchMovies.pending };
    const initialState = {
      movies: [],
      fetchStatus: "",
    };
    const state = moviesSlice.reducer(initialState, action);
    expect(state.fetchStatus).toEqual("loading");
  });

  it("should return payload when action is fulfilled", () => {
    const action = {
      type: fetchMovies.fulfilled,
      payload: {
        movies: moviesMock.results,
        totalPages: moviesMock.total_pages,
      },
    };
    const initialState = moviesAdapter.getInitialState({
      fetchStatus: "",
      totalPages: 0,
      page: 1,
      searchQuery: "",
    });

    const state = moviesSlice.reducer(initialState, action);
    expect(state.entities).toEqual(
      moviesMock.results.reduce((acc, movie) => {
        acc[movie.id] = movie;
        return acc;
      }, {})
    );
    expect(state.ids).toEqual(moviesMock.results.map((movie) => movie.id));
    expect(state.fetchStatus).toEqual("success");
    expect(state.page).toEqual(2); // Since page is incremented by 1
    expect(state.totalPages).toEqual(moviesMock.total_pages);
  });

  it("should set error when action is rejected", () => {
    const action = { type: fetchMovies.rejected };
    const initialState = moviesSlice.reducer(
      {
        movies: [],
        fetchStatus: "",
      },
      action
    );
    expect(action).toEqual({ type: fetchMovies.rejected });
  });
});
