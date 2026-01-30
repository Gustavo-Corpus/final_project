import './About.css';

function About() {
  return (
    <section className="about" id="about">
      <div className="about__container">
        <h2 className="about__title">Acerca del proyecto</h2>
        <div className="about__content">
          <div className="about__text-block">
            <h3 className="about__subtitle">¿Qué es Prelude?</h3>
            <p className="about__text">
              Prelude es una plataforma moderna y minimalista diseñada para los amantes del cine. 
              Aquí puedes descubrir trailers de las últimas películas, explorar estrenos y 
              encontrar tu próxima película favorita antes de verla.
            </p>
          </div>
          
          <div className="about__text-block">
            <h3 className="about__subtitle">Tecnologías utilizadas</h3>
            <p className="about__text">
              Este proyecto fue desarrollado con React, utilizando componentes funcionales y hooks. 
              Los datos de las películas se obtienen de The Movie Database (TMDB) API, 
              una de las bases de datos de películas más completas del mundo.
            </p>
          </div>

          <div className="about__text-block">
            <h3 className="about__subtitle">Características principales</h3>
            <ul className="about__list">
              <li className="about__list-item">🎬 Búsqueda de películas en tiempo real</li>
              <li className="about__list-item">▶️ Reproducción de trailers en alta calidad</li>
              <li className="about__list-item">⭐ Información detallada de cada película</li>
              <li className="about__list-item">📱 Diseño responsive y adaptable</li>
              <li className="about__list-item">🎨 Interfaz minimalista y elegante</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;