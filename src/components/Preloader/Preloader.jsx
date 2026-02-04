import './Preloader.css';

function Preloader() {
  return (
    <div className="preloader">
      <div className="preloader__content">
        <div className="preloader__spinner">
          <div className="preloader__circle"></div>
        </div>
        <h2 className="preloader__title">PRELUDE</h2>
      </div>
    </div>
  );
}

export default Preloader;
