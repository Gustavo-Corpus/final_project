import { useState, useEffect } from 'react';
import moviesApi from '../../utils/MoviesApi';
import './Hero.css';

function Hero({ onWatchTrailer }) {
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    moviesApi.getPopularMovies()
      .then((data) => {
        setFeaturedMovies(data.results.slice(0, 10));
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error loading featured movies:', err);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (featuredMovies.length === 0) return;

    const currentMovie = featuredMovies[currentIndex];
    setShowTrailer(false);
    setTrailerKey(null);

    // Esperar 4 segundos antes de cargar el trailer
    const timer = setTimeout(() => {
      moviesApi.getMovieVideos(currentMovie.id)
        .then((data) => {
          const trailer = data.results.find(
            (video) => video.type === 'Trailer' && video.site === 'YouTube'
          );
          if (trailer) {
            setTrailerKey(trailer.key);
            setShowTrailer(true);
          }
        })
        .catch((err) => {
          console.error('Error loading trailer:', err);
        });
    }, 4000);

    return () => clearTimeout(timer);
  }, [currentIndex, featuredMovies]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? featuredMovies.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === featuredMovies.length - 1 ? 0 : prev + 1));
  };

  if (isLoading || featuredMovies.length === 0) {
    return <div className="hero hero_loading"></div>;
  }

  const currentMovie = featuredMovies[currentIndex];
  const backdropUrl = currentMovie.backdrop_path
    ? moviesApi.getImageUrl(currentMovie.backdrop_path, 'original')
    : null;

  return (
    <section className="hero">
      {/* Fondo con imagen o trailer */}
      <div className="hero__background">
        {!showTrailer && backdropUrl && (
          <div 
            className="hero__image"
            style={{ backgroundImage: `url(${backdropUrl})` }}
          />
        )}
        
        {showTrailer && trailerKey && (
          <div className="hero__video-container">
            <iframe
              className="hero__video"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerKey}&rel=0&modestbranding=1&showinfo=0`}
              title={currentMovie.title}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        )}
        
        <div className="hero__overlay"></div>
      </div>

      {/* Contenido - Solo sinopsis a la izquierda */}
      <div className="hero__content">
        <div className="hero__info">
          <h1 className="hero__title">{currentMovie.title}</h1>
          <div className="hero__meta">
            <span className="hero__year">
              {currentMovie.release_date ? new Date(currentMovie.release_date).getFullYear() : 'N/A'}
            </span>
            <span className="hero__rating">
              ★ {currentMovie.vote_average ? currentMovie.vote_average.toFixed(1) : 'N/A'}
            </span>
          </div>
          <p className="hero__overview">
            {currentMovie.overview || 'Sin descripción disponible'}
          </p>
          <div className="hero__buttons">
            <button 
              className="hero__button hero__button_primary"
              onClick={() => onWatchTrailer(currentMovie)}
            >
              <span className="hero__button-icon">▶</span>
              Ver Trailer
            </button>
            <button className="hero__button hero__button_secondary">
              Más información
            </button>
          </div>
        </div>
      </div>

      {/* Controles de navegación */}
      <button className="hero__arrow hero__arrow_left" onClick={handlePrevious}>
        ‹
      </button>
      <button className="hero__arrow hero__arrow_right" onClick={handleNext}>
        ›
      </button>

      <div className="hero__indicators">
        {featuredMovies.map((_, index) => (
          <button
            key={index}
            className={`hero__indicator ${index === currentIndex ? 'hero__indicator_active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </section>
  );
}

export default Hero;