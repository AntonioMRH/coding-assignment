import { useCallback, useMemo, useState } from "react";
import {
  Routes,
  Route,
  createSearchParams,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import "reactjs-popup/dist/index.css";
import { fetchMovies } from "./data/moviesSlice";
import {
  ENDPOINT_SEARCH,
  ENDPOINT,
  API_KEY,
  ENDPOINT_DISCOVER,
} from "./constants";
import Header from "./components/Header";
import Movies from "./components/Movies";
import Starred from "./components/Starred";
import WatchLater from "./components/WatchLater";
import YouTubePlayer from "./components/YoutubePlayer";
import "./app.scss";
import Modal from "./components/Modal";
import { debounce } from "./utils/debounce";

const App = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [videoKey, setVideoKey] = useState(null);
  const [isOpen, setOpen] = useState(false);

  const navigate = useNavigate();

  const closeModal = () => setOpen(false);

  const debouncedSearchMovies = useMemo(
    () =>
      debounce((query) => {
        const endpoint =
          query === ""
            ? `${ENDPOINT_DISCOVER}&page=1`
            : `${ENDPOINT_SEARCH}&query=${query}&page=1`;
        navigate("/");
        dispatch(fetchMovies(endpoint));
        setSearchParams(createSearchParams({ search: query }));
      }, 500),
    [dispatch, navigate, setSearchParams]
  );

  const viewTrailer = async (movie) => {
    const videoKey = await fetchMovieTrailer(movie.id);
    setVideoKey(videoKey);
    setOpen(true);
  };

  const fetchMovieTrailer = async (id) => {
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

  return (
    <div className="App">
      <Header
        searchMovies={debouncedSearchMovies}
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
          <Route path="/" element={<Movies viewTrailer={viewTrailer} />} />
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
