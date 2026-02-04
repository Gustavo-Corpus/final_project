import { useState, useEffect } from 'react';
import MovieRow from '../MovieRow/MovieRow';
import moviesApi from '../../utils/MoviesApi';
import './Main.css';

function Main({ contentType, onWatchTrailer }) {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, [contentType]);

  async function loadCategories() {
    try {
      setIsLoading(true);
      
      // Obtener películas/series por género
      const genreIds = contentType === 'movie' 
        ? {
            action: 28,      // Acción
            scifi: 878,      // Ciencia Ficción
            drama: 18,       // Drama
            comedy: 35,      // Comedia
            thriller: 53,    // Thriller
            horror: 27,      // Terror
          }
        : {
            action: 10759,   // Acción y Aventura
            scifi: 10765,    // Sci-Fi & Fantasy
            drama: 18,       // Drama
            comedy: 35,      // Comedia
            crime: 80,       // Crimen
            mystery: 9648,   // Misterio
          };

      const categoryPromises = Object.entries(genreIds).map(([key, genreId]) =>
        moviesApi.getContentByGenre(contentType, genreId)
          .then(data => ({
            key,
            data: data.results
          }))
      );

      const results = await Promise.all(categoryPromises);
      
      const genreNames = contentType === 'movie'
        ? {
            action: 'Acción',
            scifi: 'Ciencia Ficción',
            drama: 'Drama',
            comedy: 'Comedia',
            thriller: 'Thriller',
            horror: 'Terror',
          }
        : {
            action: 'Acción y Aventura',
            scifi: 'Sci-Fi & Fantasy',
            drama: 'Drama',
            comedy: 'Comedia',
            crime: 'Crimen',
            mystery: 'Misterio',
          };

      const newCategories = results.map(result => ({
        title: genreNames[result.key],
        items: result.data,
      }));

      setCategories(newCategories);
    } catch (err) {
      console.error('Error loading categories:', err);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return (
      <main className="main">
        <div className="main__loading">
          <div className="main__spinner"></div>
        </div>
      </main>
    );
  }

  return (
    <main className="main">
      <div className="main__container">
        {categories.map((category, index) => (
          <MovieRow
            key={index}
            title={category.title}
            items={category.items}
            contentType={contentType}
            onWatchTrailer={onWatchTrailer}
          />
        ))}
      </div>
    </main>
  );
}

export default Main;
