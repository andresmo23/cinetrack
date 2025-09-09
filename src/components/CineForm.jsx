import PropTypes from "prop-types";
import { useState } from "react";
import "../styles/Form.css";

function CineForm({ movieAdd, movies }) {
  // estado local que controla los datos del formulario
  const [movieData, setMovieData] = useState({
    title: "",
    genre: "",
    releaseYear: "",
    rating: "",
    isFavorite: false,
    synopsis: "",
  });
  // estado para mostrar mensajes de error
  const [errors, setErrors] = useState({
    title: "",
    genre: "",
    releaseYear: "",
    synopsis: "",
  });

  // funcion generica para manejar los campos y actualizar el estado
  const handleChange = (e) => {
    const { name, value } = e.target;

    let parsedValue = value;

    // conversion automatica segun el campo
    if (name === "releaseYear" || name === "rating") {
      parsedValue = Number(value);
    }

    if (name === "isFavorite") {
      parsedValue = value === "si";
    }

    setMovieData((prev) => ({ ...prev, [name]: parsedValue }));
  };

  // funcion para validar y enviar datos
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita el comportamiento por defecto del formulario

    const newErrors = {}; // Objeto temporal para almacenar errores personalizados

    // Verifica si ya existe una película con el mismo título
    const duplicated = movies.some(
      (movie) => movie.title.trim().toLowerCase() === movieData.title.trim().toLocaleLowerCase()
    );
    if (duplicated) newErrors.title = "Ya existe una película con este título.";

    // Validaciones por campo
    if (!movieData.title.trim()) newErrors.title = "El título es obligatorio.";
    if (!movieData.genre.trim()) newErrors.genre = "El género es obligatorio.";
    if (!movieData.releaseYear || movieData.releaseYear < 1985 || movieData.releaseYear > 2025) {
      newErrors.releaseYear = "El año debe estar entre 1985 y 2025";
    }
    if (!movieData.synopsis.trim()) newErrors.synopsis = "La sinopsis es obligatoria.";

    // Si hay errores, los mostramos y detenemos el envío
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors); // muestra los errores
      return; // detiene el envio
    }

    // Si no hay errores, limpiamos y enviamos
    setErrors({}); // limpiar los errores
    // console.log(movieAdd(movieData));
    movieAdd(movieData);
    setMovieData({
      title: "",
      genre: "",
      releaseYear: "",
      rating: "",
      isFavorite: false,
      synopsis: "",
    }); // limpiar el formulario
  };

  return (
    <div className="container-form">
      <h2>Añadir Película</h2>
      <form className="form form-create" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Título: </label>
          <input
            type="text"
            name="title"
            id="title"
            value={movieData.title}
            onChange={handleChange}
          />
          {errors.title && <span className="error">{errors.title}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="genre">Género: </label>
          <input
            type="text"
            name="genre"
            id="genre"
            value={movieData.genre}
            onChange={handleChange}
          />
          {errors.genre && <span className="error">{errors.genre}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="releaseYear">Año de estreno: </label>
          <input
            type="number"
            name="releaseYear"
            id="releaseYear"
            min={1895}
            max={2025}
            value={movieData.releaseYear}
            onChange={handleChange}
          />
          {errors.releaseYear && <span className="error">{errors.releaseYear}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="rating">Puntuación: </label>
          <select name="rating" id="rating" value={movieData.rating} onChange={handleChange}>
            <option value="">Selecciona una puntuación</option>
            <option value="1">★☆☆☆☆</option>
            <option value="2">★★☆☆☆</option>
            <option value="3">★★★☆☆</option>
            <option value="4">★★★★☆</option>
            <option value="5">★★★★★</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="isFavorite">Favorita: </label>
          <select
            name="isFavorite"
            id="isFavorite"
            value={movieData.isFavorite ? "si" : "no"}
            onChange={handleChange}
          >
            <option value="si">Si</option>
            <option value="no">No</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="synopsis">Sinopsis: </label>
          <textarea
            name="synopsis"
            id="synopsis"
            value={movieData.synopsis}
            onChange={handleChange}
          ></textarea>
          {errors.synopsis && <span className="error">{errors.synopsis}</span>}
        </div>
        <button type="submit" className="btn btn-create">
          Crear
        </button>
      </form>
    </div>
  );
}

CineForm.propTypes = {
  movieAdd: PropTypes.func.isRequired,
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
};

export default CineForm;
