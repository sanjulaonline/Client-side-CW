import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { fetchProperties } from '../services/propertyService';
import { Property } from '../types/Property';
import { FaHeart, FaArrowLeft, FaMapMarkerAlt, FaBed, FaPoundSign } from 'react-icons/fa';
import './PropertyPage.css';

const PropertyPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [activeImage, setActiveImage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProperty = async () => {
      setIsLoading(true);
      const properties = await fetchProperties();
      const found = properties.find(p => p.id === id);
      if (found) {
        setProperty(found);
        setActiveImage(found.picture);
      }
      setIsLoading(false);
    };
    loadProperty();
  }, [id]);

  if (isLoading) return <div className="loading">Loading details...</div>;
  if (!property) return <div className="error">Property not found.</div>;

  return (
    <div className="property-page">
      <Link to="/" className="back-link">
        <FaArrowLeft /> Back to Search
      </Link>

      <div className="property-header">
        <h1>{property.location}</h1>
        <div className="property-price">
          <FaPoundSign /> {property.price.toLocaleString()}
        </div>
      </div>

      <div className="property-gallery">
        <div className="main-image-container">
          <img src={activeImage} alt="Main view" className="main-image" />
        </div>
        <div className="thumbnail-grid">
          <img
            src={property.picture}
            alt="Thumbnail Main"
            className={`thumbnail ${activeImage === property.picture ? 'active' : ''}`}
            onClick={() => setActiveImage(property.picture)}
          />
          {property.images && property.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Thumbnail ${index + 1}`}
              className={`thumbnail ${activeImage === img ? 'active' : ''}`}
              onClick={() => setActiveImage(img)}
            />
          ))}
        </div>
      </div>

      <div className="property-info-bar">
        <div className="info-item">
          <span className="label">Type:</span> {property.type}
        </div>
        <div className="info-item">
          <FaBed /> {property.bedrooms} Bedrooms
        </div>
        <div className="info-item">
          <span className="label">Tenure:</span> {property.tenure}
        </div>
        <div className="info-item date-added">
          Added: {property.added.day} {property.added.month} {property.added.year}
        </div>
      </div>

      <div className="property-actions">
        <button className="add-fav-btn">
          <FaHeart /> Add to Favourites
        </button>
      </div>

      <div className="property-tabs-container">
        <Tabs>
          <TabList>
            <Tab>Description</Tab>
            <Tab>Floor Plan</Tab>
            <Tab>Google Map</Tab>
          </TabList>

          <TabPanel>
            <div className="tab-content description-content">
              <h3>About this property</h3>
              <p>{property.description}</p>
              <p>{property.longDescription}</p>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="tab-content">
              <h3>Floor Plan</h3>
              <div className="placeholder-box">
                Floor Plan Image Placeholder
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="tab-content">
              <h3>Location Map</h3>
              <div className="placeholder-box map-placeholder">
                <FaMapMarkerAlt />
                Google Map Placeholder for {property.location}
              </div>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default PropertyPage;
