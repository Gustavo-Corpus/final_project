import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { MAIN_ROUTE } from '../../utils/constants';
import './Header.css';

function Header({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      navigate('/search');
      setIsSearchOpen(false);
    }
  };

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isSearchOpen) {
      setSearchQuery('');
    }
  };

  return (
    <header className="header">
      <div className="header__container">
        <Link to={MAIN_ROUTE} className="header__logo">
          PRELUDE
        </Link>

        <div className="header__search-container">
          <form 
            className={`header__search-form ${isSearchOpen ? 'header__search-form_open' : ''}`}
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              className="header__search-input"
              placeholder="Buscar películas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              type="button"
              className="header__search-icon"
              onClick={handleSearchToggle}
            >
              {isSearchOpen ? '✕' : '🔍'}
            </button>
          </form>
        </div>

        <nav className="header__nav">
          <Link to={MAIN_ROUTE} className="header__nav-link">
            Películas
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;