import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import SearchResults from '../SearchResults/SearchResults';
import Footer from '../Footer/Footer';
import TrailerModal from '../TrailerModal/TrailerModal';
import moviesApi from '../../utils/MoviesApi';
import { MAIN_ROUTE, SEARCH_ROUTE } from '../../utils/constants';
import './App.css';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);

  const handleSearch = (query) => {
    setIsSearching(true);
    moviesApi.searchMovies(query)
      .then((data) => {
        setSearchResults(data.results);
      })
      .catch((err) => {
        console.error('Error searching movies:', err);
        alert('Error al buscar películas');
      })
      .finally(() => {
        setIsSearching(false);
      });
  };

  const handleWatchTrailer = (movie) => {
    setSelectedMovie(movie);
    moviesApi.getMovieVideos(movie.id)
      .then((data) => {
        const trailer = data.results.find(
          (video) => video.type === 'Trailer' && video.site === 'YouTube'
        );
        if (trailer) {
          setTrailerKey(trailer.key);
        } else {
          alert('No hay trailer disponible para esta película');
          setSelectedMovie(null);
        }
      })
      .catch((err) => {
        console.error('Error loading trailer:', err);
        alert('Error al cargar el trailer');
        setSelectedMovie(null);
      });
  };

  const handleCloseTrailer = () => {
    setSelectedMovie(null);
    setTrailerKey(null);
  };

  return (
    <div className="app">
      <Header onSearch={handleSearch} />
      <Routes>
        <Route 
          path={MAIN_ROUTE} 
          element={<Main onWatchTrailer={handleWatchTrailer} />} 
        />
        <Route 
          path={SEARCH_ROUTE} 
          element={
            <SearchResults 
              movies={searchResults}
              isLoading={isSearching}
              onWatchTrailer={handleWatchTrailer}
            />
          } 
        />
      </Routes>
      <Footer />
      
      {selectedMovie && trailerKey && (
        <TrailerModal 
          movie={selectedMovie}
          trailerKey={trailerKey}
          onClose={handleCloseTrailer}
        />
      )}
    </div>
  );
}

export default App;