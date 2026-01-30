import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__content">
          <div className="footer__section">
            <h3 className="footer__title">PRELUDE</h3>
            <p className="footer__description">
              Tu plataforma para descubrir trailers de películas
            </p>
          </div>

          <div className="footer__section">
            <h4 className="footer__subtitle">Proyecto Final</h4>
            <p className="footer__text">
              Desarrollado como parte del bootcamp de TripleTen
            </p>
          </div>

          <div className="footer__section">
            <h4 className="footer__subtitle">Tecnologías</h4>
            <ul className="footer__list">
              <li className="footer__list-item">React</li>
              <li className="footer__list-item">React Router</li>
              <li className="footer__list-item">TMDB API</li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            © {currentYear} Prelude. Todos los derechos reservados.
          </p>
          <p className="footer__credits">
            Datos proporcionados por{' '}
            <a 
              href="https://www.themoviedb.org/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="footer__link"
            >
              The Movie Database (TMDB)
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;