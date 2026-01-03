import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { FaSearch } from 'react-icons/fa';
import './SearchForm.css';

const SearchForm = ({ criteria, setCriteria, onSearch }) => {
  const [localCriteria, setLocalCriteria] = useState(criteria);

  // Update local state when inputs change
  const handleChange = (field, value) => {
    setLocalCriteria(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCriteria(localCriteria); // Update parent state
    onSearch(); // Trigger search
  };

  return (
    <div className="search-form-container">
      <div className="search-title">
        <FaSearch className="search-icon" />
        <span>Search Criteria</span>
      </div>

      <form onSubmit={handleSubmit} className="form-grid">
        <div className="form-row">
          <div className="form-group">
            <label>Property Type</label>
            <select
              value={localCriteria.type}
              onChange={(e) => handleChange('type', e.target.value)}
              className="form-control"
            >
              <option value="any">Any Type</option>
              <option value="House">House</option>
              <option value="Flat">Flat</option>
              <option value="Apartment">Apartment</option>
              <option value="Bungalow">Bungalow</option>
            </select>
          </div>

          <div className="form-group" style={{ flex: 1.5 }}>
            <label>Price Range (£)</label>
            <div className="price-inputs">
              <input
                type="number"
                placeholder="Min"
                value={localCriteria.minPrice}
                onChange={(e) => handleChange('minPrice', e.target.value)}
                className="form-control"
              />
              <input
                type="number"
                placeholder="Max"
                value={localCriteria.maxPrice}
                onChange={(e) => handleChange('maxPrice', e.target.value)}
                className="form-control"
              />
            </div>
          </div>

          <div className="form-group" style={{ flex: 1.5 }}>
            <label>Bedrooms</label>
            <div className="price-inputs">
              <input
                type="number"
                placeholder="Min"
                value={localCriteria.minBedrooms}
                onChange={(e) => handleChange('minBedrooms', e.target.value)}
                className="form-control"
              />
              <input
                type="number"
                placeholder="Max"
                value={localCriteria.maxBedrooms}
                onChange={(e) => handleChange('maxBedrooms', e.target.value)}
                className="form-control"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Postcode Area</label>
            <input
              type="text"
              placeholder="e.g. NW3"
              value={localCriteria.postcode}
              onChange={(e) => handleChange('postcode', e.target.value)}
              className="form-control"
            />
          </div>
        </div>

        <div className="form-row" style={{ alignItems: 'flex-start' }}>
          <div className="form-group" style={{ flex: 2 }}>
            <label>Date Added Range</label>
            <div className="date-range">
              <DatePicker
                selected={localCriteria.dateFrom ? new Date(localCriteria.dateFrom) : null}
                onChange={(date) => handleChange('dateFrom', date)}
                placeholderText="mm/dd/yyyy"
                className="form-control"
              />
              <DatePicker
                selected={localCriteria.dateTo ? new Date(localCriteria.dateTo) : null}
                onChange={(date) => handleChange('dateTo', date)}
                placeholderText="mm/dd/yyyy"
                className="form-control"
              />
            </div>
          </div>

          <div className="form-group" style={{ flex: 2 }}>
            <button type="submit" className="search-btn-large">Find My Home</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
