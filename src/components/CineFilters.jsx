import PropTypes from "prop-types";

function CineFilters({ filters, onFiltersChange, genres }) {
  return (
    <div className="container-filters">
      <div className="filter-group">
        <label htmlFor="genre-filter">Filtrar por género: </label>
        <select
          id="genre-filter"
          value={filters.genre}
          onChange={(e) => onFiltersChange("genre", e.target.value)}
        >
          <option value="todas">Todas</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="favorite-filter">Filtrar por favorita: </label>
        <select
          id="favorite-filter"
          value={filters.isFavorite}
          onChange={(e) => onFiltersChange("isFavorite", e.target.value)}
        >
          <option value="todas">Todas</option>
          <option value="si">Sí</option>
          <option value="no">No</option>
        </select>
      </div>
    </div>
  );
}

CineFilters.propTypes = {
  filters: PropTypes.shape({
    genre: PropTypes.string.isRequired,
    isFavorite: PropTypes.string.isRequired,
  }).isRequired,
  setFilters: PropTypes.func.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CineFilters;
