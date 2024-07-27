import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  createSearchParams,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "reactjs-popup/dist/index.css";
import { fetchMovies } from "./data/moviesSlice";
import {
  ENDPOINT_SEARCH,
  ENDPOINT_DISCOVER,
  ENDPOINT,
  API_KEY,
} from "./constants";
import Header from "./components/Header";
import Movies from "./components/Movies";
import Starred from "./components/Starred";
import WatchLater from "./components/WatchLater";
import YouTubePlayer from "./components/YoutubePlayer";
import "./app.scss";
import Modal from "./components/Modal";

const App = () => {
  const state = useSelector((state) => state);
  const { movies } = state;
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");
  const [videoKey, setVideoKey] = useState(null);
  const [isOpen, setOpen] = useState(false);

  const navigate = useNavigate();

  const closeModal = () => setOpen(false);

  const closeCard = () => {};

  const getSearchResults = (query) => {
    const endpoint = query
      ? `${ENDPOINT_SEARCH}&query=${query}`
      : ENDPOINT_DISCOVER;
    dispatch(fetchMovies(endpoint));
    setSearchParams(createSearchParams(query ? { search: query } : {}));
  };

  const searchMovies = (query) => {
    navigate("/");
    getSearchResults(query);
  };

  const getMovies = () => {
    getSearchResults(searchQuery || "");
  };

  const viewTrailer = async (movie) => {
    const videoKey = await getMovieTrailer(movie.id);
    setVideoKey(videoKey);
    setOpen(true);
  };

  const getMovieTrailer = async (id) => {
    const URL = `${ENDPOINT}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`;
    const videoData = await fetch(URL).then((response) => response.json());

    if (videoData.videos && videoData.videos?.results.length) {
      const trailer = videoData.videos.results.find(
        (vid) => vid.type === "Trailer"
      );
      return trailer ? trailer.key : videoData.videos.results[0].key;
    }
    return null;
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="App">
      <Header
        searchMovies={searchMovies}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />

      <div className="container">
        {isOpen && (
          <Modal isOpen={isOpen} onClose={closeModal}>
            {videoKey ? (
              <YouTubePlayer videoKey={videoKey} />
            ) : (
              <div
                style={{
                  padding: "30px",
                  color: "black",
                }}
              >
                <h6>No trailer available. Try another movie</h6>
              </div>
            )}
          </Modal>
        )}
        <Routes>
          <Route
            path="/"
            element={
              <Movies
                movies={movies}
                viewTrailer={viewTrailer}
                closeCard={closeCard}
              />
            }
          />
          <Route
            path="/starred"
            element={<Starred viewTrailer={viewTrailer} />}
          />
          <Route
            path="/watch-later"
            element={<WatchLater viewTrailer={viewTrailer} />}
          />
          <Route
            path="*"
            element={<h1 className="not-found">Page Not Found</h1>}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
