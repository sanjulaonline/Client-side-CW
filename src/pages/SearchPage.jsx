import React, { useState } from 'react';
import { PROPERTIES } from '../data';
import SearchForm from '../components/SearchForm';
import PropertyCard from '../components/PropertyCard';
import FavoritesSidebar from '../components/FavoritesSidebar';

const SearchPage = ({ favorites, onToggleFavorite, onClearFavorites, onRemoveFavorite }) => {
  const [criteria, setCriteria] = useState({});
  const [activeResults, setActiveResults] = useState(PROPERTIES);
  const [isDraggingOverTarget, setIsDraggingOverTarget] = useState(false);

  const handleSearch = () => {
    const filtered = PROPERTIES.filter((p) => {
      if (criteria.type && p.type !== criteria.type) return false;
      if (criteria.minPrice && p.price < criteria.minPrice) return false;
      if (criteria.maxPrice && p.price > criteria.maxPrice) return false;
      if (criteria.minBedrooms && p.bedrooms < criteria.minBedrooms) return false;
      if (criteria.maxBedrooms && p.bedrooms > criteria.maxBedrooms) return false;
      if (criteria.postcode && !p.postcode.toLowerCase().includes(criteria.postcode.toLowerCase())) return false;

      if (criteria.dateFrom) {
        if (new Date(p.added) < new Date(criteria.dateFrom)) return false;
      }
      if (criteria.dateTo) {
        if (new Date(p.added) > new Date(criteria.dateTo)) return false;
      }
      return true;
    });
    setActiveResults(filtered);
  };

  const handleDropToFavorites = (e) => {
    e.preventDefault();
    setIsDraggingOverTarget(false);
    const propertyId = e.dataTransfer.getData('propertyId');
    const property = PROPERTIES.find((p) => p.id === propertyId);
    if (property && !favorites.find((f) => f.id === propertyId)) {
      onToggleFavorite(property);
    }
  };

  const handleDropOutsideFavorites = (e) => {
    e.preventDefault();
    const removeId = e.dataTransfer.getData('removeFavoriteId');
    if (removeId) {
      onRemoveFavorite(removeId);
    }
  };

  const onDragStartCard = (e, id) => {
    e.dataTransfer.setData('propertyId', id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const onDragStartSidebarItem = (e, id) => {
    e.dataTransfer.setData('removeFavoriteId', id);
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className="container mx-auto px-4 py-8 min-h-screen"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDropOutsideFavorites}
    >
      <header className="mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-4 tracking-tight">
          EstateEase <span className="text-indigo-600">Exclusive</span>
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl leading-relaxed">
          Curated premium properties for those who demand excellence. 
          Use the advanced filters below to begin your journey home.
        </p>
      </header>

      <div className="app-layout-container flex flex-row gap-8 items-start">
        <div className="flex-1 space-y-10">
          <div className="search-group">
            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              Search Criteria
            </h2>
            <SearchForm criteria={criteria} setCriteria={setCriteria} onSearch={handleSearch} />
          </div>

          <div>
            <div className="flex items-center justify-between mb-8 border-b border-slate-200 pb-4">
              <h2 className="text-2xl font-bold text-slate-800">
                Found {activeResults.length} {activeResults.length === 1 ? 'Property' : 'Properties'}
              </h2>
              <div className="text-sm text-slate-400 font-medium">
                Sorted by Latest Addition
              </div>
            </div>

            {activeResults.length > 0 ? (
              <div className="property-grid grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {activeResults.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    isFavorite={!!favorites.find((f) => f.id === property.id)}
                    onToggleFavorite={(e) => {
                      e.preventDefault();
                      onToggleFavorite(property);
                    }}
                    onDragStart={(e) => onDragStartCard(e, property.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white p-20 rounded-3xl border-2 border-dashed border-slate-200 text-center flex flex-col items-center">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">No matching homes</h3>
                <p className="text-slate-500 max-w-sm">We couldn't find any properties matching your exact criteria. Try broadening your search or clearing filters.</p>
                <button 
                  onClick={() => { setCriteria({}); setActiveResults(PROPERTIES); }}
                  className="mt-6 text-indigo-600 font-bold hover:text-indigo-800 transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>

        <aside className="sidebar-favorites w-80 shrink-0">
          <FavoritesSidebar
            favorites={favorites}
            onRemove={onRemoveFavorite}
            onClear={onClearFavorites}
            onDrop={handleDropToFavorites}
            onDragStartItem={onDragStartSidebarItem}
          />
        </aside>
      </div>
    </div>
  );
};

export default SearchPage;
