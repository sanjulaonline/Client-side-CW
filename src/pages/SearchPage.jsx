import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { fetchProperties, filterProperties } from '../services/propertyService';
import { Link } from 'react-router-dom';
import { useFavourites } from '../context/FavouritesContext';
import './SearchPage.css';

const SearchPage = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Search State
  const [type, setType] = useState('any');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minBedrooms, setMinBedrooms] = useState('');
  const [maxBedrooms, setMaxBedrooms] = useState('');
  const [postcode, setPostcode] = useState('');
  const [dateAddedMode, setDateAddedMode] = useState("after");
  const [dateAfter, setDateAfter] = useState(null);
  const [dateStart, setDateStart] = useState(null);
  const [dateEnd, setDateEnd] = useState(null);

  useEffect(() => {
    const loadProperties = async () => {
      setIsLoading(true);
      const data = await fetchProperties();
      setProperties(data);
      setFilteredProperties(data);
      setIsLoading(false);
    };
    loadProperties();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    const criteria = {
      type,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      minBedrooms: minBedrooms ? Number(minBedrooms) : undefined,
      maxBedrooms: maxBedrooms ? Number(maxBedrooms) : undefined,
      postcode: postcode || undefined,
      dateAfter: (dateAddedMode === 'after' && dateAfter) ? dateAfter : undefined,
      dateBetween: (dateAddedMode === 'between' && dateStart && dateEnd) ? { start: dateStart, end: dateEnd } : undefined
    };

    const results = filterProperties(properties, criteria);
    setFilteredProperties(results);
  };

  const handleClear = () => {
    setType('any');
    setMinPrice('');
    setMaxPrice('');
    setMinBedrooms('');
    setMaxBedrooms('');
    setPostcode('');
    setDateAfter(null);
    setDateStart(null);
    setDateEnd(null);
    setFilteredProperties(properties);
  };

  // Favourites
  const { favourites, addToFavourites, removeFromFavourites, clearFavourites, isFavourite } = useFavourites();

  const handleDragStart = (e, property) => {
    e.dataTransfer.setData("propertyId", property.id);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Allow drop
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    const propertyId = e.dataTransfer.getData("propertyId");
    const property = properties.find(p => p.id === propertyId);
    if (property) {
      addToFavourites(property);
    }
  };

  return (
    <div className="search-page">
      <aside className="search-sidebar">
        <div className="search-header">
          <h2>Filter Properties</h2>
          <button type="button" onClick={handleClear} className="clear-btn">Reset</button>
        </div>

        <form onSubmit={handleSearch} className="search-form">
          {/* ... existing form fields ... */}
          {/* Re-implementing form cleanly to ensure no context loss during replace */}
          <div className="form-group">
            <label>Property Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)} className="form-control">
              <option value="any">Any</option>
              <option value="House">House</option>
              <option value="Flat">Flat</option>
            </select>
          </div>

          <div className="form-group-row">
            <div className="form-group">
              <label>Min Price</label>
              <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} className="form-control" placeholder="Min" />
            </div>
            <div className="form-group">
              <label>Max Price</label>
              <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="form-control" placeholder="Max" />
            </div>
          </div>

          <div className="form-group-row">
            <div className="form-group">
              <label>Min Beds</label>
              <input type="number" value={minBedrooms} onChange={(e) => setMinBedrooms(e.target.value)} className="form-control" />
            </div>
            <div className="form-group">
              <label>Max Beds</label>
              <input type="number" value={maxBedrooms} onChange={(e) => setMaxBedrooms(e.target.value)} className="form-control" />
            </div>
          </div>

          <div className="form-group">
            <label>Postcode Area</label>
            <input type="text" value={postcode} onChange={(e) => setPostcode(e.target.value)} className="form-control" placeholder="e.g. BR1" />
          </div>

          <div className="form-group">
            <label>Date Added</label>
            <select value={dateAddedMode} onChange={(e) => setDateAddedMode(e.target.value)} className="form-control mb-2">
              <option value="after">After Date</option>
              <option value="between">Between Dates</option>
            </select>
            {dateAddedMode === 'after' ? (
              <DatePicker selected={dateAfter} onChange={(date) => setDateAfter(date)} className="form-control" placeholderText="Select date" />
            ) : (
              <div className="date-range">
                <DatePicker selected={dateStart} onChange={(date) => setDateStart(date)} selectsStart startDate={dateStart} endDate={dateEnd} className="form-control" placeholderText="Start" />
                <DatePicker selected={dateEnd} onChange={(date) => setDateEnd(date)} selectsEnd startDate={dateStart} endDate={dateEnd} minDate={dateStart} className="form-control" placeholderText="End" />
              </div>
            )}
          </div>

          <button type="submit" className="search-btn">Search Properties</button>
        </form>

        {/* Favourites Section */}
        <div
          className="favourites-sidebar"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="search-header">
            <h3>Favourites ({favourites.length})</h3>
            {favourites.length > 0 && (
              <button onClick={clearFavourites} className="clear-btn text-red">Clear</button>
            )}
          </div>

          <div className="favourites-list">
            {favourites.length === 0 ? (
              <p className="empty-fav">Drag properties here to shortlist</p>
            ) : (
              favourites.map(fav => (
                <div key={fav.id} className="fav-item">
                  <img src={fav.picture} alt={fav.type} />
                  <div className="fav-info">
                    <h4>{fav.type}</h4>
                    <p>£{fav.price.toLocaleString()}</p>
                  </div>
                  <button
                    onClick={() => removeFromFavourites(fav.id)}
                    className="remove-fav-btn"
                    title="Remove"
                  >&times;</button>
                </div>
              ))
            )}
          </div>
        </div>
      </aside>

      <section className="results-section">
        <div className="results-header">
          <h2>Properties ({filteredProperties.length})</h2>
        </div>

        {isLoading ? (
          <div className="loading">Loading properties...</div>
        ) : filteredProperties.length === 0 ? (
          <div className="no-results">No properties found matching your criteria.</div>
        ) : (
          <div className="property-grid">
            {filteredProperties.map(p => (
              <div
                key={p.id}
                className="property-card"
                draggable
                onDragStart={(e) => handleDragStart(e, p)}
              >
                <div className="card-image-container">
                  <img src={p.picture} alt={p.type} className="card-image" />
                  <div className="card-price">£{p.price.toLocaleString()}</div>
                  <button
                    className={`fav-icon-btn ${isFavourite(p.id) ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault(); // Prevent link cick
                      isFavourite(p.id) ? removeFromFavourites(p.id) : addToFavourites(p);
                    }}
                  >
                    ❤
                  </button>
                </div>
                <div className="card-content">
                  <h3>{p.type} - {p.bedrooms} Beds</h3>
                  <p className="card-location">{p.location}</p>
                  <p className="card-summary">{p.description}</p>
                  <Link to={`/property/${p.id}`} className="view-btn">View Details</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default SearchPage;
