import { useState } from 'react';
import Preloader from '../Preloader/Preloader';
import { INITIAL_CARDS_COUNT, CARDS_TO_ADD } from '../../utils/constants';
import './SearchResults.css';

function SearchResults({ movies, isLoading, onWatchTrailer }) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_CARDS_COUNT);

  const handleShowMore = () => {
    setVisibleCount(prevCount => prevCount + CARDS_TO_ADD);
  };

  const visibleMovies = movies.slice(0, visibleCount);
  const hasMore = visibleCount < movies.length;

  if (isLoading) {
    return (
      <section className="search-results">
        <Preloader />
      </section>
    );
  }

  if (movies.length === 0) {
    return (
      <section className="search-results">
        <div className="search-results__empty">
          <h2 className="search-results__empty-title">No se encontraron resultados</h2>
          <p className="search-results__empty-text">
            Intenta buscar con otras palabras clave
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="search-results">
      <div className="search-results__container">
        <h2 className="search-results__title">Resultados de búsqueda</h2>
        <div className="search-results__grid">
          {visibleMovies.map((movie) => (
            <div 
              key={movie.id}
              className="search-results__card"
              onClick={() => onWatchTrailer(movie)}
            >
              <div className="search-results__image-container">
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : 'https://via.placeholder.com/300x450?text=Sin+Imagen'
                  }
                  alt={movie.title}
                  className="search-results__image"
                />
                <div className="search-results__overlay">
                  <button className="search-results__button">
                    ▶ Ver Trailer
                  </button>
                </div>
              </div>
              <div className="search-results__info">
                <h3 className="search-results__movie-title">{movie.title}</h3>
                <div className="search-results__meta">
                  <span className="search-results__year">
                    {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
                  </span>
                  <span className="search-results__rating">
                    ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {hasMore && (
          <button className="search-results__more-button" onClick={handleShowMore}>
            Mostrar más
          </button>
        )}
      </div>
    </section>
  );
}

export default SearchResults;