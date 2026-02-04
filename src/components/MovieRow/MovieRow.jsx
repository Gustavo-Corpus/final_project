import { useRef } from 'react';
import './MovieRow.css';

function MovieRow({ title, items, contentType, onWatchTrailer }) {
  const rowRef = useRef(null);

  const scroll = (direction) => {
    if (rowRef.current) {
      const scrollAmount = direction === 'left' ? -800 : 800;
      rowRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleCardClick = (item) => {
    if (onWatchTrailer) {
      onWatchTrailer(item);
    }
  };

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className="movie-row">
      <div className="movie-row__header">
        <h2 className="movie-row__title">{title}</h2>
      </div>

      <div className="movie-row__container">
        <button
          className="movie-row__arrow movie-row__arrow--left"
          onClick={() => scroll('left')}
          aria-label="Desplazar izquierda"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="movie-row__scroll" ref={rowRef}>
          <div className="movie-row__fade movie-row__fade--left"></div>
          
          <div className="movie-row__content">
            {items.map((item) => {
              const title = item.title || item.name;
              return (
                <div
                  key={item.id}
                  className="movie-row__card"
                  onClick={() => handleCardClick(item)}
                >
                  <div className="movie-row__image-wrapper">
                    <img
                      src={
                        item.poster_path
                          ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                          : 'https://via.placeholder.com/300x450?text=Sin+Imagen'
                      }
                      alt={title}
                      className="movie-row__image"
                      loading="lazy"
                    />
                    <div className="movie-row__overlay">
                      <div className="movie-row__info">
                        <h3 className="movie-row__card-title">{title}</h3>
                        {item.vote_average && (
                          <div className="movie-row__rating">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                            {item.vote_average.toFixed(1)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="movie-row__fade movie-row__fade--right"></div>
        </div>

        <button
          className="movie-row__arrow movie-row__arrow--right"
          onClick={() => scroll('right')}
          aria-label="Desplazar derecha"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}

export default MovieRow;
