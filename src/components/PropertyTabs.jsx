import React, { useState } from 'react';
import './PropertyTabs.css';

const PropertyTabs = ({ property }) => {
  const [activeTab, setActiveTab] = useState('desc');

  const tabs = [
    { id: 'desc', label: 'Long Description' },
    { id: 'floor', label: 'Floor Plan' },
    { id: 'map', label: 'Google Map' },
  ];

  return (
    <div className="tabs-container">
      <div className="tabs-header">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {activeTab === 'desc' && (
          <div className="tab-prose">
            <p>
              {property.longDescription}
            </p>
          </div>
        )}

        {activeTab === 'floor' && (
          <div className="floor-plan-container">
            <img
              src={property.floorPlan.startsWith('/') ? import.meta.env.BASE_URL + property.floorPlan.substring(1) : property.floorPlan}
              alt="Floor Plan"
              className="floor-plan-image"
            />
          </div>
        )}

        {activeTab === 'map' && (
          <div className="map-container">
            <iframe
              title="Property Map"
              className="map-frame"
              scrolling="no"
              marginHeight={0}
              marginWidth={0}
              src={property.mapEmbedUrl}
            ></iframe>
            <div className="map-overlay">
              Map View
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyTabs;
