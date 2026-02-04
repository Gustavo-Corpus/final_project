import { useState } from 'react';
import './SearchResults.css';
import iconError from '../../assets/error.svg';

function SearchResults({ items, query, contentType, onWatchTrailer }) {
  const [visibleCount, setVisibleCount] = useState(18);

  const visibleItems = items.slice(0, visibleCount);
  const hasMore = visibleCount < items.length;

  const handleShowMore = () => {
    setVisibleCount((prev) => Math.min(prev + 18, items.length));
  };

  if (!query) {
    return (
      <section className="search-results search-results--empty">
        <div className="search-results__empty-container">
          <svg
            width="100"
            height="100"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="search-results__empty-icon"
          >
            <circle cx="11" cy="11" r="8" strokeWidth="1.5" />
            <path d="m21 21-4.35-4.35" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <h2 className="search-results__empty-title">Busca tu contenido favorito</h2>
          <p className="search-results__empty-text">
            Escribe en el buscador para encontrar {contentType === 'movie' ? 'películas' : 'series'}
          </p>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="search-results search-results--empty">
        <div className="search-results__empty-container">
          <img src= {iconError} alt="Icono de error" className="search-results__error-icon" />
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
        <div className="search-results__header">
          <h2 className="search-results__title">Resultados para "{query}"</h2>
          <p className="search-results__count">
            {items.length} {items.length === 1 ? 'resultado' : 'resultados'}
          </p>
        </div>

        <div className="search-results__grid">
          {visibleItems.map((item) => {
            const title = item.title || item.name;
            const date = item.release_date || item.first_air_date;
            const year = date ? new Date(date).getFullYear() : '';

            return (
              <div
                key={item.id}
                className="search-results__card"
                onClick={() => onWatchTrailer && onWatchTrailer(item)}
              >
                <div className="search-results__image-container">
                  <img
                    src={
                      item.poster_path
                        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                        : 'https://via.placeholder.com/300x450?text=Sin+Imagen'
                    }
                    alt={title}
                    className="search-results__image"
                  />
                  <div className="search-results__overlay">
                    <div className="search-results__info">
                      <h3 className="search-results__movie-title">{title}</h3>
                      <div className="search-results__meta">
                        {year && <span className="search-results__year">{year}</span>}
                        {item.vote_average && (
                          <span className="search-results__rating">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                            {item.vote_average.toFixed(1)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {hasMore && (
          <div className="search-results__more-container">
            <button className="search-results__more-button" onClick={handleShowMore}>
              Mostrar más
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default SearchResults;
