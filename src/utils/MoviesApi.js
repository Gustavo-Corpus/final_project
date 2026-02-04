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

  getContentByGenre(type = 'movie', genreId) {
    return fetch(
      `${this._baseUrl}/discover/${type}?api_key=${this._apiKey}&language=es-MX&sort_by=popularity.desc&with_genres=${genreId}&page=1`
    )
      .then(this._checkResponse)
      .catch((err) => {
        console.error('Error getting content by genre:', err);
        throw err;
      });
  }

  getPopularContent(type = 'movie') {
    return fetch(
      `${this._baseUrl}/${type}/popular?api_key=${this._apiKey}&language=es-MX&page=1`
    )
      .then(this._checkResponse)
      .catch((err) => {
        console.error('Error getting popular content:', err);
        throw err;
      });
  }

  getTopRatedContent(type = 'movie') {
    return fetch(
      `${this._baseUrl}/${type}/top_rated?api_key=${this._apiKey}&language=es-MX&page=1`
    )
      .then(this._checkResponse)
      .catch((err) => {
        console.error('Error getting top rated content:', err);
        throw err;
      });
  }

  getUpcomingContent(type = 'movie') {
    const endpoint = type === 'movie' ? 'upcoming' : 'on_the_air';
    return fetch(
      `${this._baseUrl}/${type}/${endpoint}?api_key=${this._apiKey}&language=es-MX&page=1`
    )
      .then(this._checkResponse)
      .catch((err) => {
        console.error('Error getting upcoming content:', err);
        throw err;
      });
  }

  getTrendingContent(type = 'movie') {
    return fetch(
      `${this._baseUrl}/trending/${type}/week?api_key=${this._apiKey}&language=es-MX`
    )
      .then(this._checkResponse)
      .catch((err) => {
        console.error('Error getting trending content:', err);
        throw err;
      });
  }

  searchContent(query, type = 'movie') {
    return fetch(
      `${this._baseUrl}/search/${type}?api_key=${this._apiKey}&language=es-MX&query=${query}&include_adult=false`
    )
      .then(this._checkResponse)
      .catch((err) => {
        console.error('Error searching content:', err);
        throw err;
      });
  }

  getContentVideos(id, type = 'movie') {
    return fetch(
      `${this._baseUrl}/${type}/${id}/videos?api_key=${this._apiKey}&language=es-MX`
    )
      .then(this._checkResponse)
      .catch((err) => {
        console.error('Error getting content videos:', err);
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
