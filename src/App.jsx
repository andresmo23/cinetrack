import { useEffect, useState } from "react";
import CineForm from "./components/CineForm";
import CineFilters from "./components/CineFilters";
import CineCards from "./components/CineCards";
import CineModalEdit from "./components/CineModalEdit";
import "./styles/App.css";

function App() {
  const [movies, setMovies] = useState(() => {
    const stored = localStorage.getItem("cineTrackMovies");
    return stored ? JSON.parse(stored) : [];
  }); // estado principal que inicia con el storage
  const [filters, setFilters] = useState({
    genre: "todas",
    isFavorite: "todas",
  }); // Estado que guarda los criterios activos de filtrado (género y favorita)
  const [movieToEdit, setMovieToEdit] = useState(null); // este estado guarda la pelicula que se va a editar

  // uso de un efecto para guardar en localstorage
  useEffect(() => {
    localStorage.setItem("cineTrackMovies", JSON.stringify(movies));
  }, [movies]);

  // Funciones Puras

  // agregar nueva pelicula al estado de forma inmutable
  const movieAdd = (movieData) => {
    const newMovie = {
      ...movieData,
      id: crypto.randomUUID(),
    };

    setMovies((prev) => [...prev, newMovie]);
  };

  // eliminar pelicula del estado de forma inmutable
  const movieDelete = (idMovie) =>
    setMovies((prev) => prev.filter((movie) => movie.id !== idMovie));

  // crear subconjunto del estado principal
  const filteredMovies = movies.filter((movie) => {
    const matchGenre =
      filters.genre === "todas" || normalize(movie.genre) === normalize(filters.genre);

    const matchFavorite =
      filters.isFavorite === "todas" || movie.isFavorite === (filters.isFavorite === "si");

    return matchGenre && matchFavorite;
  });

  // funcion utilitaria para normalizar el select de manera mas robusta
  const normalize = (str) => str.trim().toLowerCase().normalize("NFC");

  // lista de generos disponibles para el <select>
  const uniqueGenres = [...new Set(movies.map((movie) => normalize(movie.genre)))];

  // actualizar el estado de filters
  const handleFiltersChange = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  // actualizar el estado global
  const handleEditMovie = (updateMovie) => {
    setMovies((prev) => prev.map((movie) => (movie.id === updateMovie.id ? updateMovie : movie)));
    setMovieToEdit(null);
  };

  return (
    <main className="cine-main">
      <h1>
        Cine<span>Track</span>
      </h1>
      <CineForm movieAdd={movieAdd} movies={movies} />
      <section className="cine-render-filters">
        <CineFilters
          filters={filters}
          onFiltersChange={handleFiltersChange}
          genres={uniqueGenres}
        />
        {filteredMovies.length === 0 ? (
          <p className="message-conditional">No hay peliculas que mostrar.</p>
        ) : (
          <CineCards
            movies={filteredMovies}
            movieDelete={movieDelete}
            setMovieToEdit={setMovieToEdit}
          />
        )}
      </section>
      {movieToEdit && (
        <CineModalEdit
          movie={movieToEdit}
          onCancel={() => setMovieToEdit(null)}
          onSave={handleEditMovie}
        />
      )}
    </main>
  );
}

export default App;
