import React, { useState, useEffect } from 'react';
import { fetchProperties, filterProperties } from '../services/propertyService';
import { useFavourites } from '../context/FavouritesContext';
import SearchForm from '../components/SearchForm';
import FavoritesSidebar from '../components/FavoritesSidebar';
import PropertyCard from '../components/PropertyCard';
import './SearchPage.css';

const SearchPage = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Unified Search Criteria State
  const [criteria, setCriteria] = useState({
    type: '',
    minPrice: '',
    maxPrice: '',
    minBedrooms: '',
    maxBedrooms: '',
    postcode: '',
    dateFrom: '',
    dateTo: ''
  });

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

  const handleSearch = () => {
    // Convert criteria state to filter format expected by service
    const filterCriteria = {
      type: criteria.type !== 'any' ? criteria.type : undefined,
      minPrice: criteria.minPrice ? Number(criteria.minPrice) : undefined,
      maxPrice: criteria.maxPrice ? Number(criteria.maxPrice) : undefined,
      minBedrooms: criteria.minBedrooms ? Number(criteria.minBedrooms) : undefined,
      maxBedrooms: criteria.maxBedrooms ? Number(criteria.maxBedrooms) : undefined,
      postcode: criteria.postcode || undefined,
      dateBetween: (criteria.dateFrom && criteria.dateTo) ? {
        start: new Date(criteria.dateFrom),
        end: new Date(criteria.dateTo)
      } : undefined,
      dateAfter: (!criteria.dateTo && criteria.dateFrom) ? new Date(criteria.dateFrom) : undefined
    };

    const results = filterProperties(properties, filterCriteria);
    setFilteredProperties(results);
  };

  const handleClearSearch = () => {
    setCriteria({
      type: '',
      minPrice: '',
      maxPrice: '',
      minBedrooms: '',
      maxBedrooms: '',
      postcode: '',
      dateFrom: '',
      dateTo: ''
    });
    setFilteredProperties(properties);
  };

  // Favourites
  const { favourites, addToFavourites, removeFromFavourites, clearFavourites, isFavourite } = useFavourites();

  const handleDragStart = (e, property) => {
    e.dataTransfer.setData("propertyId", property.id);
  };

  const handleDropOnSidebar = (e) => {
    e.preventDefault();
    const propertyId = e.dataTransfer.getData("propertyId");
    // Ensure we are dropping a property from the list, not re-ordering sidebar
    const property = properties.find(p => p.id === propertyId);
    if (property) {
      addToFavourites(property);
    }
  };

  const handleDragStartFromFav = (e, propertyId) => {
    // Logic for dragging OUT of favorites? 
    // Current requirement: "Drag items out to remove them" usually implies dropping them somewhere else? 
    // Or just the visual cue. The sidebar handles DragStartItem.
    // We can use it to maybe remove if dropped on the grid? 
    // For now, dragging OUT to remove is handled by dropping on the "SearchPage" body?
    // Step 272 says "Drag items out to remove them from favorites".
    // Let's implement drop on SearchPage to remove from favorites if dragged from sidebar?
    e.dataTransfer.setData("favId", propertyId);
  };

  const handleDropOnGrid = (e) => {
    e.preventDefault();
    const favId = e.dataTransfer.getData("favId");
    if (favId) {
      removeFromFavourites(favId);
    }
  };

  return (
    <div className="search-page" onDragOver={(e) => e.preventDefault()} onDrop={handleDropOnGrid}>
      <aside className="search-sidebar">
        <FavoritesSidebar
          favorites={favourites}
          onRemove={removeFromFavourites}
          onClear={clearFavourites}
          onDrop={handleDropOnSidebar}
          onDragStartItem={handleDragStartFromFav}
        />
      </aside>

      <section className="results-section">
        <SearchForm
          criteria={criteria}
          setCriteria={setCriteria}
          onSearch={handleSearch}
        />

        <div className="results-header">
          <h2>Properties ({filteredProperties.length})</h2>
          <button onClick={handleClearSearch} className="clear-btn">Clear Filters</button>
        </div>

        {isLoading ? (
          <div className="loading">Loading properties...</div>
        ) : filteredProperties.length === 0 ? (
          <div className="no-results">No properties found matching your criteria.</div>
        ) : (
          <div className="property-grid">
            {filteredProperties.map(p => (
              <PropertyCard
                key={p.id}
                property={p}
                isFavorite={isFavourite(p.id)}
                onToggleFavorite={() => isFavourite(p.id) ? removeFromFavourites(p.id) : addToFavourites(p)}
                onDragStart={(e) => handleDragStart(e, p)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default SearchPage;
