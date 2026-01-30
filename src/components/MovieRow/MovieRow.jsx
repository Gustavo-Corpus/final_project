import { useRef } from 'react';
import './MovieRow.css';

function MovieRow({ title, movies, onMovieClick }) {
  const rowRef = useRef(null);

  const scroll = (direction) => {
    if (rowRef.current) {
      const scrollAmount = direction === 'left' ? -800 : 800;
      rowRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="movie-row">
      <h2 className="movie-row__title">{title}</h2>
      <div className="movie-row__container">
        <button 
          className="movie-row__arrow movie-row__arrow_left"
          onClick={() => scroll('left')}
        >
          ‹
        </button>
        
        <div className="movie-row__scroll" ref={rowRef}>
          <div className="movie-row__fade movie-row__fade_left"></div>
          {movies.map((movie) => (
            <div 
              key={movie.id}
              className="movie-row__item"
              onClick={() => onMovieClick(movie)}
            >
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : 'https://via.placeholder.com/300x450?text=Sin+Imagen'
                }
                alt={movie.title}
                className="movie-row__poster"
              />
              <div className="movie-row__overlay">
                <h3 className="movie-row__movie-title">{movie.title}</h3>
                <div className="movie-row__info">
                  <span className="movie-row__year">
                    {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
                  </span>
                  <span className="movie-row__rating">
                    ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
                  </span>
                </div>
              </div>
            </div>
          ))}
          <div className="movie-row__fade movie-row__fade_right"></div>
        </div>

        <button 
          className="movie-row__arrow movie-row__arrow_right"
          onClick={() => scroll('right')}
        >
          ›
        </button>
      </div>
    </section>
  );
}

export default MovieRow;