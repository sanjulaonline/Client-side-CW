import React from 'react';
import { Link } from 'react-router-dom';
import './PropertyCard.css';

const PropertyCard = ({ property, isFavorite, onToggleFavorite, onDragStart }) => {
  return (
    <div
      draggable
      onDragStart={onDragStart}
      className="property-card"
    >
      <Link to={`/${property.url}`} className="property-card-link">
        <div className="property-image-container">
          <img
            src={property.images[0]}
            alt={property.location}
            className="property-image"
          />
          <div className="property-type-tag">
            {property.type}
          </div>
        </div>

        <div className="property-content">
          <div className="property-header">
            <h3 className="property-location">{property.location}</h3>
            <span className="property-price">LKR {property.price.toLocaleString()}</span>
          </div>
          <p className="property-description">{property.description}</p>
          <div className="property-meta">
            <span className="meta-item">
              <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
              {property.bedrooms} Beds
            </span>
            <span className="meta-item">
              <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              {property.postcode}
            </span>
          </div>
        </div>
      </Link>

      <button
        onClick={onToggleFavorite}
        className={`favorite-button ${isFavorite ? 'active' : 'inactive'}`}
        title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      >
        <svg className="favorite-icon" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
        </svg>
      </button>
    </div>
  );
};

export default PropertyCard;
