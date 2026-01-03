import React, { useState } from 'react';

const ImageGallery = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const nextImage = () => setActiveIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setActiveIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="space-y-4">
      <div className="relative aspect-video rounded-2xl overflow-hidden shadow-md group">
        <img
          src={images[activeIndex]}
          alt={`Property image ${activeIndex + 1}`}
          className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-500"
          onClick={() => setIsFullscreen(true)}
        />
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
        </button>
      </div>

      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
              activeIndex === idx ? 'border-indigo-600 shadow-md scale-95' : 'border-transparent opacity-60 hover:opacity-100'
            }`}
          >
            <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-6 right-6 text-white hover:text-red-400 transition-colors"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
          <img src={images[activeIndex]} className="max-w-full max-h-full object-contain rounded-sm" alt="Fullscreen view" />
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
