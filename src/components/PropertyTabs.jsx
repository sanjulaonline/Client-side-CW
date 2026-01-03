import React, { useState } from 'react';

const PropertyTabs = ({ property }) => {
  const [activeTab, setActiveTab] = useState('desc');

  const tabs = [
    { id: 'desc', label: 'Long Description' },
    { id: 'floor', label: 'Floor Plan' },
    { id: 'map', label: 'Google Map' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="flex border-b border-slate-200 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-slate-500 hover:text-indigo-600 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-6">
        {activeTab === 'desc' && (
          <div className="prose prose-indigo max-w-none">
            <p className="text-slate-700 leading-relaxed">
              {property.longDescription}
            </p>
          </div>
        )}

        {activeTab === 'floor' && (
          <div className="flex justify-center">
            <img
              src={property.floorPlanUrl}
              alt="Floor Plan"
              className="max-w-full h-auto rounded-lg border border-slate-100 shadow-sm"
            />
          </div>
        )}

        {activeTab === 'map' && (
          <div className="w-full h-[400px] bg-slate-100 rounded-lg overflow-hidden flex items-center justify-center relative">
             <iframe
               title="Property Map"
               width="100%"
               height="100%"
               frameBorder="0"
               scrolling="no"
               marginHeight={0}
               marginWidth={0}
               src={`https://maps.google.com/maps?q=${property.mapCoords.lat},${property.mapCoords.lng}&z=14&output=embed`}
             ></iframe>
             <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded shadow text-xs font-bold text-indigo-600 pointer-events-none">
               Map View
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyTabs;
