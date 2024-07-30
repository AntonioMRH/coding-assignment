import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";

export const fetchMovies = createAsyncThunk(
  "fetch-movies",
  async ({ apiUrl, page }) => {
    try {
      const response = await fetch(`${apiUrl}&page=${page}`);
      if (response.ok) {
        const data = await response.json();
        return { movies: data.results, totalPages: data.total_pages };
      } else return;
    } catch (e) {
      console.log("Error: " + e);
    }
  }
);

export const moviesAdapter = createEntityAdapter({
  selectId: (movie) => movie.id,
});

const moviesSlice = createSlice({
  name: "movies",
  initialState: moviesAdapter.getInitialState({
    fetchStatus: "",
    totalPages: 0,
    page: 1,
    searchQuery: "",
  }),
  reducers: {
    reset: () => {
      return moviesAdapter.getInitialState({
        movies: [],
        fetchStatus: "",
        totalPages: 0,
        page: 1,
        searchQuery: "",
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.fulfilled, (state, action) => {
        moviesAdapter.upsertMany(state, action.payload.movies);
        state.page += 1;
        state.totalPages = action.payload.totalPages;
        state.fetchStatus = "success";
      })
      .addCase(fetchMovies.pending, (state) => {
        state.fetchStatus = "loading";
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.fetchStatus = "error";
      });
  },
});

const { selectAll: selectAllMovies } = moviesAdapter.getSelectors(
  (state) => state.movies
);

export { selectAllMovies };
export const { reset } = moviesSlice.actions;
export default moviesSlice;
