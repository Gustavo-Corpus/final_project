# PRELUDE - Plataforma de Trailers

Puedes ver el proyecto desplegado en: [Enlace a GitHub Pages](https://gustavo-corpus.github.io/final_project)

## 🎬 Descripción
Aplicación web que tiene como fin explorar trailers de películas y series.

## ✨ Características Principales


### Funcionalidades
1. **Hero Carousel**: 
   - 10 películas/series más populares
   - Sinopsis a la izquierda, imagen del trailer a la derecha
   - Flechas de navegación para cambiar de contenido
   - Indicadores de puntos en la parte inferior

2. **Toggle Películas/Series**:
   - Cambio dinámico entre contenido de películas y series
   - Integración completa con TMDB API para ambos tipos

3. **Filas de Contenido**:
   - Mejor Valoradas
   - Próximos Estrenos / Próximas Series
   - Tendencias
   - Scroll horizontal con efectos de desvanecido
   - Hover revela título y calificación

4. **Buscador Inteligente**:
   - Búsqueda en tiempo real
   - Resultados en grid responsivo
   - Estados vacíos elegantes

5. **Modal de Trailers**:
   - Reproducción de trailers de YouTube
   - Diseño minimalista con backdrop blur
   - Cierre con ESC o click fuera

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── App/                 # Componente principal
│   ├── Header/              # Barra de navegación con búsqueda y toggle
│   ├── Hero/                # Carrusel de destacados
│   ├── Main/                # Contenedor de filas
│   ├── MovieRow/            # Fila horizontal de películas/series
│   ├── SearchResults/       # Página de resultados de búsqueda
│   ├── TrailerModal/        # Modal para reproducir trailers
│   └── Preloader/           # Pantalla de carga
├── utils/
│   ├── constants.js         # Constantes de la aplicación
│   └── MoviesApi.js         # Cliente API de TMDB
├── index.css                # Estilos globales
└── main.jsx                 # Punto de entrada

```

## 🔑 API de TMDB

La aplicación utiliza The Movie Database (TMDB) API para obtener información de películas y series.

**API Key incluida**: `e0310a934899c47178ffef1ebca36f49`

### Endpoints utilizados:
- `/movie/popular` - Películas populares
- `/tv/popular` - Series populares
- `/movie/top_rated` - Películas mejor valoradas
- `/tv/top_rated` - Series mejor valoradas
- `/movie/upcoming` - Próximos estrenos
- `/tv/on_the_air` - Series en emisión
- `/trending/{type}/week` - Tendencias semanales
- `/search/movie` - Búsqueda de películas
- `/search/tv` - Búsqueda de series
- `/{type}/{id}/videos` - Videos/trailers

## 📄 Licencia

Proyecto educativo - Uso libre

## 👨‍💻 Autor

Gustavo Corpus