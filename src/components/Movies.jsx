import Movie from "./Movie";
import "../styles/movies.scss";

const Movies = ({ movies, viewTrailer, lastMovieRef }) => {
  return (
    <div data-testid="movies" className="movies-container">
      {movies?.map((movie, idx) => {
        if (movies.length === idx + 1) {
          return (
            <Movie
              movie={movie}
              key={movie.id}
              viewTrailer={viewTrailer}
              lastMovieRef={lastMovieRef}
            />
          );
        } else {
          return (
            <Movie movie={movie} key={movie.id} viewTrailer={viewTrailer} />
          );
        }
      })}
    </div>
  );
};

export default Movies;
