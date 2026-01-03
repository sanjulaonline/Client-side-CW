import React from 'react';
import { FaHeart, FaPlus } from 'react-icons/fa';
import './FavoritesSidebar.css';

const FavoritesSidebar = ({ favorites, onRemove, onClear, onDrop, onDragStartItem }) => {
  return (
    <div
      className="sidebar-container"
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
    >
      <div className="sidebar-title">
        <FaHeart className="heart-icon-title" />
        <span>Favorites</span>
      </div>

      <div className="favorites-list">
        {favorites.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon-circle">
              <FaPlus />
            </div>
            <p className="empty-text">Drag properties here to save them</p>
          </div>
        ) : (
          <>
            {favorites.map(fav => (
              <div
                key={fav.id}
                className="fav-item"
                draggable
                onDragStart={(e) => onDragStartItem(e, fav.id)}
              >
                <img src={fav.picture} alt={fav.type} />
                <div className="fav-info">
                  <h4>{fav.type}</h4>
                  <p>£{fav.price.toLocaleString()}</p>
                </div>
                <button
                  onClick={() => onRemove(fav.id)}
                  className="remove-fav-btn"
                  title="Remove"
                >&times;</button>
              </div>
            ))}
            <button onClick={onClear} className="clear-all-btn">Clear All</button>
          </>
        )}
      </div>
    </div>
  );
};

export default FavoritesSidebar;
