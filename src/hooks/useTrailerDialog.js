import { useCallback, useState } from "react";

const fetchMovieTrailer = async (id) => {
  const URL = `${process.env.REACT_APP_ENDPOINT}/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=videos`;
  const videoData = await fetch(URL).then((response) => response.json());
  if (videoData.videos && videoData.videos?.results.length) {
    const trailer = videoData.videos.results.find(
      (vid) => vid.type === "Trailer"
    );
    return trailer ? trailer.key : videoData.videos.results[0].key;
  }
  return null;
};

export const useTrailerDialog = () => {
  const [videoKey, setVideoKey] = useState(null);
  const [isOpen, setOpen] = useState(false);

  const closeModal = () => setOpen(false);

  const viewTrailer = useCallback(async (id) => {
    const videoKey = await fetchMovieTrailer(id);
    setVideoKey(videoKey);
    setOpen(true);
  }, []);

  return { isOpen, closeModal, videoKey, viewTrailer };
};
