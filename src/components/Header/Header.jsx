import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

function Header({ onSearch, contentType, onContentTypeChange }) {
  const [searchValue, setSearchValue] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      onSearch(searchValue);
      navigate('/search');
    }
  };

  const handleLogoClick = () => {
    setSearchValue('');
    onSearch('');
    navigate('/');
  };

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
      <div className="header__container">
        <div className="header__content">
          <button className="header__logo" onClick={handleLogoClick}>
            PRELUDE
          </button>

          <form className="header__search" onSubmit={handleSubmit}>
            <input
              type="text"
              className="header__input"
              placeholder="Buscar películas..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button type="submit" className="header__search-button">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM18.5 18.5l-4-4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </form>
        </div>

        <div className="header__toggle">
          <button
            className={`header__toggle-button ${contentType === 'movie' ? 'header__toggle-button--active' : ''}`}
            onClick={() => onContentTypeChange('movie')}
          >
            Películas
          </button>
          <button
            className={`header__toggle-button ${contentType === 'tv' ? 'header__toggle-button--active' : ''}`}
            onClick={() => onContentTypeChange('tv')}
          >
            Series
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;