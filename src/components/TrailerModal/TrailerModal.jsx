import { useEffect } from 'react';
import './TrailerModal.css';

function TrailerModal({ movie, trailerKey, onClose }) {
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

  if (!trailerKey) return null;

  return (
    <div className="trailer-modal" onClick={onClose}>
      <div className="trailer-modal__content" onClick={(e) => e.stopPropagation()}>
        <button className="trailer-modal__close" onClick={onClose}>
          ✕
        </button>
        <h2 className="trailer-modal__title">{movie.title}</h2>
        <div className="trailer-modal__video-container">
          <iframe
            className="trailer-modal__iframe"
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0`}
            title={movie.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}

export default TrailerModal;