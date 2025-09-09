import PropTypes from "prop-types";
import { useState } from "react";
import "../styles/Form.css";
import "../styles/Modal.css";

function CineModalEdit({ movie, onCancel, onSave }) {
  const [modalData, setModalData] = useState({ ...movie });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    let parsedValue = value;

    if (name === "releaseYear" || name === "rating") {
      parsedValue = Number(value);
    }

    if (name === "isFavorite") {
      parsedValue = value === "si";
    }

    setModalData((prev) => ({ ...prev, [name]: parsedValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!modalData.title.trim()) newErrors.title = "El título es obligatorio";
    if (!modalData.genre.trim()) newErrors.genre = "El género es obligatorio";
    if (!modalData.releaseYear || modalData.releaseYear < 1985 || modalData.releaseYear > 2025) {
      newErrors.releaseYear = "El año debe estar entre 1985 y 2025";
    }
    if (!modalData.synopsis.trim()) newErrors.synopsis = "La sinopsis es obligatoria.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // no envía si hay errores
    }

    onSave(modalData);
  };

  return (
    <div className="modal-overlay">
      <div className="container-form container-modal">
        <h2>Añadir Película</h2>
        <form className="form form-modal" onSubmit={handleSubmit}>
          <div className="form-group form-group-modal">
            <label htmlFor="title-edit">Título: </label>
            <input
              type="text"
              name="title"
              id="title-edit"
              value={modalData.title}
              onChange={handleChange}
            />
            {errors.title && <span className="error">{errors.title}</span>}
          </div>
          <div className="form-group form-group-modal">
            <label htmlFor="genre-edit">Género: </label>
            <input
              type="text"
              name="genre"
              id="genre-edit"
              value={modalData.genre}
              onChange={handleChange}
            />
            {errors.genre && <span className="error">{errors.genre}</span>}
          </div>
          <div className="form-group form-group-modal">
            <label htmlFor="releaseYear-edit">Año de estreno: </label>
            <input
              type="number"
              name="releaseYear"
              id="releaseYear-edit"
              min={1895}
              max={2025}
              value={modalData.releaseYear}
              onChange={handleChange}
            />
            {errors.releaseYear && <span className="error">{errors.releaseYear}</span>}
          </div>
          <div className="form-group form-group-modal">
            <label htmlFor="rating-edit">Puntuación: </label>
            <select name="rating" id="rating-edit" value={modalData.rating} onChange={handleChange}>
              <option value="">Selecciona una puntuación</option>
              <option value="1">★☆☆☆☆</option>
              <option value="2">★★☆☆☆</option>
              <option value="3">★★★☆☆</option>
              <option value="4">★★★★☆</option>
              <option value="5">★★★★★</option>
            </select>
          </div>
          <div className="form-group form-group-modal">
            <label htmlFor="isFavorite-edit">Favorita: </label>
            <select
              name="isFavorite"
              id="isFavorite-edit"
              value={modalData.isFavorite ? "si" : "no"}
              onChange={handleChange}
            >
              <option value="si">Si</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="form-group form-group-modal">
            <label htmlFor="synopsis-edit">Sinopsis: </label>
            <textarea
              name="synopsis"
              id="synopsis-edit"
              value={modalData.synopsis}
              onChange={handleChange}
            ></textarea>
            {errors.synopsis && <span className="error">{errors.synopsis}</span>}
          </div>
          <div className="container-buttons-modal">
            <button type="submit" className="btn btn-update">
              Actualizar
            </button>
            <button type="button" className="btn btn-cancel" onClick={onCancel}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

CineModalEdit.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    releaseYear: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    synopsis: PropTypes.string.isRequired,
  }).isRequired,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default CineModalEdit;
