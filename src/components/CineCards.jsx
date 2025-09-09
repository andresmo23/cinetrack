import PropTypes from "prop-types";
import CineCard from "./CineCard";

function CineCards({ movies, movieDelete, setMovieToEdit }) {
  return (
    <div className="container-cards-movies">
      {movies.map((movie) => (
        <CineCard
          key={movie.id}
          movie={movie}
          movieDelete={movieDelete}
          setMovieToEdit={setMovieToEdit}
        />
      ))}
    </div>
  );
}

CineCards.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
      releaseYear: PropTypes.number.isRequired,
      rating: PropTypes.number.isRequired,
      isFavorite: PropTypes.bool.isRequired,
      synopsis: PropTypes.string.isRequired,
    })
  ).isRequired,
  movieDelete: PropTypes.func.isRequired,
  setMovieToEdit: PropTypes.func.isRequired,
};

export default CineCards;
