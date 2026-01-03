import React from 'react';
import { Link } from 'react-router-dom';

const PropertyCard = ({ property, isFavorite, onToggleFavorite, onDragStart }) => {
  return (
    <div
      draggable
      onDragStart={onDragStart}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 relative cursor-grab active:cursor-grabbing"
    >
      <Link to={`/property/${property.id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={property.images[0]}
            alt={property.location}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-indigo-700 uppercase tracking-wider">
            {property.type}
          </div>
        </div>

        <div className="p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-slate-800 line-clamp-1">{property.location}</h3>
            <span className="text-xl font-bold text-indigo-600">£{property.price.toLocaleString()}</span>
          </div>
          <p className="text-slate-500 text-sm mb-4 line-clamp-2">{property.description}</p>
          <div className="flex items-center gap-4 text-slate-600 text-sm">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
              {property.bedrooms} Beds
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              {property.postcode}
            </span>
          </div>
        </div>
      </Link>

      <button
        onClick={onToggleFavorite}
        className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-md transition-all shadow-md ${
          isFavorite ? 'bg-red-500 text-white' : 'bg-white/80 text-slate-400 hover:text-red-500 hover:bg-white'
        }`}
        title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      >
        <svg className="w-6 h-6" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
        </svg>
      </button>
    </div>
  );
};

export default PropertyCard;
