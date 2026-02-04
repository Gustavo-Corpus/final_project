import { useEffect } from 'react';
import './TrailerModal.css';
import HalfVideoCamera from "../../assets/video.svg";

function TrailerModal({ item, trailerKey, onClose, contentType }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  if (!item) return null;

  const title = item.title || item.name;
  const date = item.release_date || item.first_air_date;
  const year = date ? new Date(date).getFullYear() : '';

  return (
    <div className="trailer-modal" onClick={onClose}>
      <div className="trailer-modal__content" onClick={(e) => e.stopPropagation()}>
        <button className="trailer-modal__close" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {trailerKey ? (
          <>
            <div className="trailer-modal__video-container">
              <iframe
                className="trailer-modal__iframe"
                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=0&rel=0`}
                title={title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="trailer-modal__info">
              <h2 className="trailer-modal__title">{title}</h2>
              <div className="trailer-modal__meta">
                {year && <span className="trailer-modal__year">{year}</span>}
                {item.vote_average && (
                  <span className="trailer-modal__rating">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    {item.vote_average.toFixed(1)}
                  </span>
                )}
              </div>
              {item.overview && (
                <p className="trailer-modal__description">{item.overview}</p>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="trailer-modal__no-trailer">
              <div className="trailer-modal__no-trailer-content">
                <div className="trailer-modal__poster">
                  <img
                    src={
                      item.poster_path
                        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                        : 'https://via.placeholder.com/300x450?text=Sin+Imagen'
                    }
                    alt={title}
                    className="trailer-modal__poster-image"
                  />
                </div>

                <div className="trailer-modal__no-trailer-message">
                  <div className="trailer-modal__no-trailer-container">
                    <img 
                      src= {HalfVideoCamera} 
                      alt="Icono de video"
                      className="trailer-modal__no-trailer-icon" 
                    />
                  </div>
                  <h3 className="trailer-modal__no-trailer-title">Trailer no disponible</h3>
                  <p className="trailer-modal__no-trailer-text">
                    Lo sentimos, este contenido no tiene un trailer disponible en este momento.
                  </p>
                </div>
              </div>
            </div>

            <div className="trailer-modal__info trailer-modal__info--no-trailer">
              <h2 className="trailer-modal__title">{title}</h2>
              <div className="trailer-modal__meta">
                {year && <span className="trailer-modal__year">{year}</span>}
                {item.vote_average && (
                  <span className="trailer-modal__rating">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    {item.vote_average.toFixed(1)}
                  </span>
                )}
              </div>
              {item.overview && (
                <p className="trailer-modal__description">{item.overview}</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default TrailerModal;