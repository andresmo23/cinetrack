# 🎬 CineTrack

**CineTrack** es una aplicación web desarrollada con React que permite gestionar una colección personalizada de películas. El proyecto está enfocado en la experiencia del usuario, la claridad visual y la mantenibilidad del código, integrando funcionalidades completas de creación, edición, eliminación, filtrado y persistencia de datos.

---

## 🚀 Funcionalidades principales

- **📌 Crear películas**  
  Formulario con validaciones que permite añadir películas con título, género, año de estreno, puntuación, sinopsis y si es favorita.

- **✏️ Editar películas**  
  Modal dinámico que permite modificar los datos de una película existente, con validaciones y sincronización visual.

- **🗑️ Eliminar películas**  
  Botón de eliminación que actualiza el estado global de forma inmutable.

- **🔍 Filtrado combinado**  
  Sistema de filtros por género y por estado de favorita, que permite visualizar subconjuntos específicos de películas.

- **🎨 Interfaz declarativa y accesible**  
  Componentes organizados con semántica clara, etiquetas `<label>` correctamente asociadas, y estructura visual profesional.

- **💾 Persistencia con localStorage**  
  Las películas se guardan automáticamente en el navegador y se recuperan al recargar la página, sin necesidad de backend.

---

## 🧠 Arquitectura del proyecto

- **Estado global** manejado en el componente principal (`App.js`) con `useState`.
- **Persistencia** implementada con `localStorage` y `useEffect`.
- **Componentes reutilizables**:
  - `CineForm`: formulario de creación
  - `CineModalEdit`: formulario de edición en modal
  - `CineFilters`: filtros por género y favorita
  - `CineCards`: renderizado de tarjetas de películas

---

## 🛠️ Tecnologías utilizadas

- **React** (con hooks como `useState` y `useEffect`)
- **JavaScript** moderno (ES6+)
- **CSS** personalizado para estilos visuales
- **PropTypes** para validación de props

---

## 📁 Estructura del proyecto

src/ ├── components/
│ ├── CineForm.js
│ ├── CineModalEdit.js
│ ├── CineFilters.js
│ └── CineCards.js
├── styles/
│ └── App.css
└── App.js

---

## 📦 Instalación y ejecución

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/cinetrack.git
   cd cinetrack
   Instala las dependencias:
   bash
    npm install
    Ejecuta la app:

    bash
    npm start
   ```

---

## 🤝 Contribuciones

Este proyecto está abierto a mejoras. Si deseas contribuir:

1. Haz un fork
2. Crea una rama (git checkout -b feature/nueva-funcionalidad)
3. Haz tus cambios
4. Abre un Pull Request

Por favor sigue el estilo modular y documenta tus funciones.

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Puedes usarlo libremente con atribución.

---

## 🙌 Autor

Desarrollado por Gonzalo Montoya si te gustó, ¡dale una estrella ⭐ en GitHub!
