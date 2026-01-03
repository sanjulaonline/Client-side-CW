import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { fetchProperties, filterProperties } from '../services/propertyService';
import { Property, SearchCriteria } from '../types/Property';
import { Link } from 'react-router-dom';
import './SearchPage.css';

const SearchPage: React.FC = () => {
  const [properties, setProperties] = useState < Property[] > ([]);
  const [filteredProperties, setFilteredProperties] = useState < Property[] > ([]);
  const [isLoading, setIsLoading] = useState(true);

  // Search State
  const [type, setType] = useState('any');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minBedrooms, setMinBedrooms] = useState('');
  const [maxBedrooms, setMaxBedrooms] = useState('');
  const [postcode, setPostcode] = useState('');
  const [dateAddedMode, setDateAddedMode] = useState < "after" | "between" > ("after");
  const [dateAfter, setDateAfter] = useState < Date | null > (null);
  const [dateStart, setDateStart] = useState < Date | null > (null);
  const [dateEnd, setDateEnd] = useState < Date | null > (null);

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const criteria: SearchCriteria = {
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

  return (
    <div className="search-page">
      <aside className="search-sidebar">
        <div className="search-header">
          <h2>Filter Properties</h2>
          <button type="button" onClick={handleClear} className="clear-btn">Clear</button>
        </div>

        <form onSubmit={handleSearch} className="search-form">
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
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="Min"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Max Price</label>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="Max"
                className="form-control"
              />
            </div>
          </div>

          <div className="form-group-row">
            <div className="form-group">
              <label>Min Beds</label>
              <input
                type="number"
                value={minBedrooms}
                onChange={(e) => setMinBedrooms(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Max Beds</label>
              <input
                type="number"
                value={maxBedrooms}
                onChange={(e) => setMaxBedrooms(e.target.value)}
                className="form-control"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Postcode Area</label>
            <input
              type="text"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
              placeholder="e.g. BR1, NW1"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Date Added</label>
            <select
              value={dateAddedMode}
              onChange={(e) => setDateAddedMode(e.target.value as "after" | "between")}
              className="form-control mb-2"
            >
              <option value="after">After Date</option>
              <option value="between">Between Dates</option>
            </select>

            {dateAddedMode === 'after' ? (
              <DatePicker
                selected={dateAfter}
                onChange={(date) => setDateAfter(date)}
                className="form-control"
                placeholderText="Select date"
              />
            ) : (
              <div className="date-range">
                <DatePicker
                  selected={dateStart}
                  onChange={(date) => setDateStart(date)}
                  selectsStart
                  startDate={dateStart}
                  endDate={dateEnd}
                  className="form-control"
                  placeholderText="Start"
                />
                <DatePicker
                  selected={dateEnd}
                  onChange={(date) => setDateEnd(date)}
                  selectsEnd
                  startDate={dateStart}
                  endDate={dateEnd}
                  minDate={dateStart}
                  className="form-control"
                  placeholderText="End"
                />
              </div>
            )}
          </div>

          <button type="submit" className="search-btn">Search Properties</button>
        </form>
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
              <div key={p.id} className="property-card">
                <div className="card-image-container">
                  <img src={p.picture} alt={p.type} className="card-image" />
                  <div className="card-price">£{p.price.toLocaleString()}</div>
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
