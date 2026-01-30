import { useState, useEffect } from 'react';
import Hero from '../Hero/Hero';
import MovieRow from '../MovieRow/MovieRow';
import About from '../About/About';
import moviesApi from '../../utils/MoviesApi';
import './Main.css';

function Main({ onWatchTrailer }) {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  useEffect(() => {
    // Cargar películas en tendencia
    fetch(`${moviesApi._baseUrl}/trending/movie/week?api_key=${moviesApi._apiKey}&language=es-MX`)
      .then(res => res.json())
      .then(data => setTrendingMovies(data.results))
      .catch(err => console.error('Error loading trending movies:', err));

    // Cargar películas mejor valoradas
    fetch(`${moviesApi._baseUrl}/movie/top_rated?api_key=${moviesApi._apiKey}&language=es-MX`)
      .then(res => res.json())
      .then(data => setTopRatedMovies(data.results))
      .catch(err => console.error('Error loading top rated movies:', err));

    // Cargar próximos estrenos
    fetch(`${moviesApi._baseUrl}/movie/upcoming?api_key=${moviesApi._apiKey}&language=es-MX`)
      .then(res => res.json())
      .then(data => setUpcomingMovies(data.results))
      .catch(err => console.error('Error loading upcoming movies:', err));
  }, []);

  return (
    <main className="main">
      <Hero onWatchTrailer={onWatchTrailer} />
      
      <div className="main__content">
        {trendingMovies.length > 0 && (
          <MovieRow 
            title="Tendencias de la semana"
            movies={trendingMovies}
            onMovieClick={onWatchTrailer}
          />
        )}
        
        {topRatedMovies.length > 0 && (
          <MovieRow 
            title="Mejor valoradas"
            movies={topRatedMovies}
            onMovieClick={onWatchTrailer}
          />
        )}
        
        {upcomingMovies.length > 0 && (
          <MovieRow 
            title="Próximos estrenos"
            movies={upcomingMovies}
            onMovieClick={onWatchTrailer}
          />
        )}
      </div>

      <About />
    </main>
  );
}

export default Main;