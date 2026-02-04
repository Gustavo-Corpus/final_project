import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import About from '../About/About';
import Header from '../Header/Header';
import Hero from '../Hero/Hero';
import Main from '../Main/Main';
import SearchResults from '../SearchResults/SearchResults';
import TrailerModal from '../TrailerModal/TrailerModal';
import Preloader from '../Preloader/Preloader';
import moviesApi from '../../utils/MoviesApi';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [contentType, setContentType] = useState('movie');
  const [popularItems, setPopularItems] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    loadPopularContent();
  }, [contentType]);

  async function loadPopularContent() {
    try {
      setIsLoading(true);
      setHasError(false);
      const data = await moviesApi.getPopularContent(contentType);
      setPopularItems(data.results.slice(0, 10));
    } catch (err) {
      console.error('Error loading popular content:', err);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSearch(query) {
    if (!query.trim()) {
      setSearchResults([]);
      setSearchQuery('');
      setSearchError(false);
      return;
    }

    try {
      setSearchLoading(true);
      setSearchError(false);
      setSearchQuery(query);
      const data = await moviesApi.searchContent(query, contentType);
      setSearchResults(data.results);
    } catch (err) {
      console.error('Error searching:', err);
      setSearchError(true);
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  }

  async function handleWatchTrailer(item) {
    try {
      setSelectedItem(item);
      const videos = await moviesApi.getContentVideos(item.id, contentType);
      const trailer = videos.results.find(
        (video) => video.type === 'Trailer' && video.site === 'YouTube'
      );
      if (trailer) {
        setTrailerKey(trailer.key);
      } else {
        setTrailerKey(null);
      }
    } catch (err) {
      console.error('Error getting trailer:', err);
      setTrailerKey(null);
    }
  }

  function handleCloseModal() {
    setSelectedItem(null);
    setTrailerKey(null);
  }

  function handleContentTypeChange(type) {
    setContentType(type);
    setSearchResults([]);
    setSearchQuery('');
    setSearchError(false);
  }

  if (isLoading && popularItems.length === 0) {
    return <Preloader />;
  }

  if (hasError) {
    return (
      <div className="app">
        <Header 
          onSearch={handleSearch} 
          contentType={contentType}
          onContentTypeChange={handleContentTypeChange}
        />
        <div className="app__error">
          <h2 className="app__error-title">Error al cargar el contenido</h2>
          <p className="app__error-text">Por favor, recarga la página o inténtalo más tarde.</p>
          <button className="app__error-button" onClick={loadPopularContent}>Reintentar</button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <Header 
        onSearch={handleSearch} 
        contentType={contentType}
        onContentTypeChange={handleContentTypeChange}
      />
      
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero 
                items={popularItems}
                contentType={contentType}
              />
              <Main 
                contentType={contentType}
                onWatchTrailer={handleWatchTrailer}
              />
            </>
          }
        />
        <Route
          path="/search"
          element={
            <SearchResults
              items={searchResults}
              query={searchQuery}
              contentType={contentType}
              onWatchTrailer={handleWatchTrailer}
              isLoading={searchLoading}
              hasError={searchError}
            />
          }
        />
      </Routes>

      {selectedItem && (
        <TrailerModal
          item={selectedItem}
          trailerKey={trailerKey}
          onClose={handleCloseModal}
          contentType={contentType}
        />
      )}

      <About />
    </div>
  );
}

export default App;