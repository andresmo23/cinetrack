import PropTypes from "prop-types";
import { StarIcon } from "@heroicons/react/24/solid";
import { HeartIcon } from "@heroicons/react/24/solid";

function CineCard({ movie, movieDelete, setMovieToEdit }) {
  const { title, genre, releaseYear, rating, isFavorite, synopsis } = movie;

  // mostrar estrellas
  /* const showRatingStars = (ratingValue) => {
    return "★".repeat(ratingValue) + "☆".repeat(5 - ratingValue);
    // ? repeat: es un metodo que sirve para repetir un caracter n veces
  }; */

  // mostrar estrellas por medio de un componente importado
  const renderStars = (ratingValue) => {
    return [...Array(5)].map((_, i) =>
      i < ratingValue ? (
        <StarIcon key={i} className="star active" />
      ) : (
        <StarIcon key={i} className="star inactive" />
      )
    );
  };

  // capitalizar textos
  const capitalize = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const capitalizeEachWord = (text) =>
    text
      .trim()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

  return (
    <div className="card-movie">
      <h3>{capitalizeEachWord(title)}</h3>
      <div className="container-texts">
        <p>
          <strong>Género:</strong> {capitalizeEachWord(genre)}
        </p>
        <p>
          <strong>Año de estreno:</strong> {releaseYear}
        </p>
        <p>
          <strong>Puntuación:</strong> {renderStars(rating)}
        </p>
        <p>
          <strong>Favorita:</strong>{" "}
          <span className="fav-label">
            {isFavorite ? "Sí" : "No"}
            <HeartIcon className={`icon-fav ${isFavorite ? "" : "inactive"}`} />
          </span>
        </p>
        <p>
          <strong>Sinopsis:</strong> {capitalize(synopsis)}
        </p>
      </div>
      <div className="container-buttons-card">
        <button className="btn btn-edit" onClick={() => setMovieToEdit(movie)}>
          Editar
        </button>
        <button className="btn btn-delete" onClick={() => movieDelete(movie.id)}>
          Eliminar
        </button>
      </div>
    </div>
  );
}

CineCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    releaseYear: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    synopsis: PropTypes.string.isRequired,
  }).isRequired,
  movieDelete: PropTypes.func.isRequired,
  setMovieToEdit: PropTypes.func.isRequired,
};

export default CineCard;
