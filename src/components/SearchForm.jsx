import React from 'react';
import './SearchForm.css';

const SearchForm = ({ criteria, setCriteria, onSearch }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCriteria((prev) => ({
      ...prev,
      [name]: value === '' ? undefined : (name.includes('Price') || name.includes('Bedrooms') ? Number(value) : value),
    }));
  };

  const propertyTypes = ['House', 'Apartment', 'Flat', 'Bungalow'];

  return (
    <div className="search-form-container">
      <div className="search-grid">
        <div className="form-group">
          <label className="form-label">Property Type</label>
          <select
            name="type"
            value={criteria.type || ''}
            onChange={handleChange}
            className="form-control"
          >
            <option value="">Any Type</option>
            {propertyTypes.map((type) => <option key={type} value={type}>{type}</option>)}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Price Range (£)</label>
          <div className="form-input-group">
            <input
              type="number"
              name="minPrice"
              placeholder="Min"
              value={criteria.minPrice || ''}
              onChange={handleChange}
              className="form-control"
            />
            <input
              type="number"
              name="maxPrice"
              placeholder="Max"
              value={criteria.maxPrice || ''}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Bedrooms</label>
          <div className="form-input-group">
            <input
              type="number"
              name="minBedrooms"
              placeholder="Min"
              value={criteria.minBedrooms || ''}
              onChange={handleChange}
              className="form-control"
            />
            <input
              type="number"
              name="maxBedrooms"
              placeholder="Max"
              value={criteria.maxBedrooms || ''}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Postcode Area</label>
          <input
            type="text"
            name="postcode"
            placeholder="e.g. NW3"
            value={criteria.postcode || ''}
            onChange={handleChange}
            className="form-control"
          />
        </div>
      </div>

      <div className="search-grid-bottom">
        <div className="form-group">
          <label className="form-label">Date Added Range</label>
          <div className="form-input-group">
            <input
              type="date"
              name="dateFrom"
              value={criteria.dateFrom || ''}
              onChange={handleChange}
              className="form-control"
            />
            <input
              type="date"
              name="dateTo"
              value={criteria.dateTo || ''}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>

        <button
          onClick={onSearch}
          className="submit-button"
        >
          Find My Home
        </button>
      </div>
    </div>
  );
};

export default SearchForm;
