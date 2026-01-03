import React from 'react';

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
    <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100 mb-8 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 ml-1">Property Type</label>
          <select
            name="type"
            value={criteria.type || ''}
            onChange={handleChange}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 transition-all outline-none text-slate-700"
          >
            <option value="">Any Type</option>
            {propertyTypes.map((type) => <option key={type} value={type}>{type}</option>)}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 ml-1">Price Range (£)</label>
          <div className="flex gap-2">
            <input
              type="number"
              name="minPrice"
              placeholder="Min"
              value={criteria.minPrice || ''}
              onChange={handleChange}
              className="w-1/2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
            />
            <input
              type="number"
              name="maxPrice"
              placeholder="Max"
              value={criteria.maxPrice || ''}
              onChange={handleChange}
              className="w-1/2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 ml-1">Bedrooms</label>
          <div className="flex gap-2">
            <input
              type="number"
              name="minBedrooms"
              placeholder="Min"
              value={criteria.minBedrooms || ''}
              onChange={handleChange}
              className="w-1/2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
            />
            <input
              type="number"
              name="maxBedrooms"
              placeholder="Max"
              value={criteria.maxBedrooms || ''}
              onChange={handleChange}
              className="w-1/2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 ml-1">Postcode Area</label>
          <input
            type="text"
            name="postcode"
            placeholder="e.g. NW3"
            value={criteria.postcode || ''}
            onChange={handleChange}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 ml-1">Date Added Range</label>
          <div className="flex gap-2">
            <input
              type="date"
              name="dateFrom"
              value={criteria.dateFrom || ''}
              onChange={handleChange}
              className="w-1/2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 transition-all outline-none text-slate-500"
            />
            <input
              type="date"
              name="dateTo"
              value={criteria.dateTo || ''}
              onChange={handleChange}
              className="w-1/2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 transition-all outline-none text-slate-500"
            />
          </div>
        </div>

        <button
          onClick={onSearch}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-md shadow-indigo-200 active:scale-95"
        >
          Find My Home
        </button>
      </div>
    </div>
  );
};

export default SearchForm;
