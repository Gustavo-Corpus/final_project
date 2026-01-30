import { TMDB_API_KEY, TMDB_BASE_URL, TMDB_IMAGE_BASE_URL, POSTER_SIZE } from './constants';

class MoviesApi {
  constructor() {
    this._baseUrl = TMDB_BASE_URL;
    this._apiKey = TMDB_API_KEY;
    this._imageBaseUrl = TMDB_IMAGE_BASE_URL;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  searchMovies(query) {
    return fetch(
      `${this._baseUrl}/search/movie?api_key=${this._apiKey}&language=es-MX&query=${query}&include_adult=false`
    )
      .then(this._checkResponse)
      .catch((err) => {
        console.error('Error searching movies:', err);
        throw err;
      });
  }

  getPopularMovies() {
    return fetch(
      `${this._baseUrl}/movie/popular?api_key=${this._apiKey}&language=es-MX&page=1`
    )
      .then(this._checkResponse)
      .catch((err) => {
        console.error('Error getting popular movies:', err);
        throw err;
      });
  }

  getMovieVideos(movieId) {
    return fetch(
      `${this._baseUrl}/movie/${movieId}/videos?api_key=${this._apiKey}&language=es-MX`
    )
      .then(this._checkResponse)
      .catch((err) => {
        console.error('Error getting movie videos:', err);
        throw err;
      });
  }

  getImageUrl(path, size = POSTER_SIZE) {
    if (!path) return null;
    return `${this._imageBaseUrl}/${size}${path}`;
  }
}

const moviesApi = new MoviesApi();
export default moviesApi;