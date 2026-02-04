import { useState, useEffect, useRef } from 'react';
import moviesApi from '../../utils/MoviesApi';
import './Hero.css';

function Hero({ items, contentType }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const timerRef = useRef(null);
  const heroRef = useRef(null);
  const iframeRef = useRef(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    }
    if (isRightSwipe) {
      handlePrev();
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.3,
      }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (iframeRef.current && showVideo && trailerKey) {
      const iframe = iframeRef.current;
      try {
        if (isVisible) {
          iframe.contentWindow.postMessage(
            '{"event":"command","func":"playVideo","args":""}',
            '*'
          );
        } else {
          iframe.contentWindow.postMessage(
            '{"event":"command","func":"pauseVideo","args":""}',
            '*'
          );
        }
      } catch (error) {
        console.log('Error controlling video:', error);
      }
    }
  }, [isVisible, showVideo, trailerKey]);

  useEffect(() => {
    setCurrentIndex(0);
    setShowVideo(false);
    setTrailerKey(null);
  }, [items, contentType]);

  useEffect(() => {
    if (!items || items.length === 0) return;

    setShowVideo(false);
    setTrailerKey(null);
    
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    const currentItem = items[currentIndex];
    moviesApi.getContentVideos(currentItem.id, contentType)
      .then(videos => {
        const trailer = videos.results.find(
          video => video.type === 'Trailer' && video.site === 'YouTube'
        );
        if (trailer) {
          setTrailerKey(trailer.key);
          
          timerRef.current = setTimeout(() => {
            if (isVisible) {
              setShowVideo(true);
            }
          }, 2000);
        }
      })
      .catch(err => console.error('Error getting trailer:', err));

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [currentIndex, items, contentType, isVisible]);

  if (!items || items.length === 0) {
    return null;
  }

  const currentItem = items[currentIndex];
  const title = currentItem.title || currentItem.name;
  const date = currentItem.release_date || currentItem.first_air_date;
  const year = date ? new Date(date).getFullYear() : '';

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const truncateText = (text, maxLength) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + '...';
  };

  return (
    <section 
      className="hero" 
      ref={heroRef}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="hero__background">
        {showVideo && trailerKey ? (
          <iframe
            ref={iframeRef}
            className="hero__video"
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=0&controls=0&showinfo=0&rel=0&loop=1&playlist=${trailerKey}&enablejsapi=1`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <img
            src={
              currentItem.backdrop_path
                ? `https://image.tmdb.org/t/p/original${currentItem.backdrop_path}`
                : 'https://via.placeholder.com/1920x1080?text=Sin+Imagen'
            }
            alt={title}
            className="hero__image"
          />
        )}
        
        <div className="hero__overlay"></div>
      </div>

      <div className="hero__content">
        <div className="hero__info">
          <h1 className="hero__title">{title}</h1>
          
          <div className="hero__meta">
            {year && <span className="hero__year">{year}</span>}
            {currentItem.vote_average && (
              <span className="hero__rating">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                {currentItem.vote_average.toFixed(1)}
              </span>
            )}
          </div>

          <p className="hero__description">
            {truncateText(currentItem.overview, 300)}
          </p>
        </div>

        <button className="hero__arrow hero__arrow--left" onClick={handlePrev}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button className="hero__arrow hero__arrow--right" onClick={handleNext}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div className="hero__dots">
          {items.map((_, index) => (
            <button
              key={index}
              className={`hero__dot ${index === currentIndex ? 'hero__dot--active' : ''}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Ir a la diapositiva ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="hero__fade"></div>
    </section>
  );
}

export default Hero;