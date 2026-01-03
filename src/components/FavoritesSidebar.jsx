import React from 'react';
import './FavoritesSidebar.css';

const FavoritesSidebar = ({ favorites, onRemove, onClear, onDrop, onDragStartItem }) => {
  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('drag-over');
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('drag-over');
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={(e) => {
        handleDragLeave(e);
        onDrop(e);
      }}
      className="favorites-sidebar"
    >
      <div className="favorites-header">
        <h2 className="favorites-title">
          <svg className="favorites-icon-header" fill="currentColor" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
          Favorites
        </h2>
        {favorites.length > 0 && (
          <button
            onClick={onClear}
            className="clear-button"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="favorites-list custom-scrollbar">
        {favorites.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon-container">
              <svg className="empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
            </div>
            <p className="empty-text">Drag properties here to save them</p>
          </div>
        ) : (
          favorites.map((prop) => (
            <div
              key={prop.id}
              draggable
              onDragStart={(e) => onDragStartItem(e, prop.id)}
              className="favorite-item"
            >
              <img src={prop.images[0]} alt={prop.location} className="fav-item-image" />
              <div className="fav-item-details">
                <h4 className="fav-item-location">{prop.location}</h4>
                <p className="fav-item-price">£{prop.price.toLocaleString()}</p>
                <p className="fav-item-meta">{prop.type} • {prop.bedrooms} Bed</p>
              </div>
              <button
                onClick={() => onRemove(prop.id)}
                className="remove-button"
              >
                <svg className="remove-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
          ))
        )}
      </div>

      <div className="sidebar-footer">
        Drag items out to remove them from favorites
      </div>
    </div>
  );
};

export default FavoritesSidebar;
