import React, { useState } from 'react';
import './ImageGallery.css';

const ImageGallery = ({ images }) => {
  const processedImages = images.map(img =>
    img.startsWith('/') ? import.meta.env.BASE_URL + img.substring(1) : img
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const nextImage = () => setActiveIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setActiveIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="gallery-container">
      <div className="main-image-wrapper">
        <img
          src={processedImages[activeIndex]}
          alt={`Property image ${activeIndex + 1}`}
          className="main-image-display"
          onClick={() => setIsFullscreen(true)}
        />
        <button
          onClick={prevImage}
          className="nav-button prev"
        >
          <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
        </button>
        <button
          onClick={nextImage}
          className="nav-button next"
        >
          <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
        </button>
      </div>

      <div className="thumbnail-grid">
        {processedImages.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`thumbnail-button ${activeIndex === idx ? 'active' : 'inactive'}`}
          >
            <img src={img} alt={`Thumb ${idx}`} className="thumbnail-image" />
          </button>
        ))}
      </div>

      {isFullscreen && (
        <div className="fullscreen-modal">
          <button
            onClick={() => setIsFullscreen(false)}
            className="close-modal-button"
          >
            <svg className="close-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
          <img src={processedImages[activeIndex]} className="fullscreen-image" alt="Fullscreen view" />
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
