import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { fetchPropertyById } from '../services/propertyService';
import { Property } from '../types/Property';
import { FaArrowLeft, FaMapMarkerAlt, FaBed, FaPoundSign } from 'react-icons/fa';
import './PropertyPage.css';
import '../index.css';

const PropertyPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [property, setProperty] = useState<Property | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState<string>('');

    useEffect(() => {
        const loadProperty = async () => {
            if (id) {
                setLoading(true);
                const data = await fetchPropertyById(id);
                setProperty(data);
                if (data) {
                    setActiveImage(data.picture);
                }
                setLoading(false);
            }
        };
        loadProperty();
    }, [id]);

    if (loading) return <div className="loading">Loading details...</div>;
    if (!property) return <div className="error">Property not found</div>;

    return (
        <div className="property-details-container">
            <Link to="/" className="back-link">
                <FaArrowLeft /> Back to Search
            </Link>

            <div className="property-header">
                <h1>{property.location} - {property.type}</h1>
                <div className="property-price">
                    <FaPoundSign /> {property.price.toLocaleString()}
                </div>
            </div>

            <div className="gallery-section">
                <div className="main-image-container">
                    <img src={activeImage} alt={property.type} className="main-image" />
                </div>
                <div className="thumbnails-grid">
                    {property.images.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt={`View ${index + 1}`}
                            className={`thumbnail ${activeImage === img ? 'active' : ''}`}
                            onClick={() => setActiveImage(img)}
                        />
                    ))}
                </div>
            </div>

            <div className="property-info-bar">
                <span><FaBed /> {property.bedrooms} Bedrooms</span>
                <span><FaMapMarkerAlt /> {property.postcode}</span>
                <span>Type: {property.type}</span>
            </div>

            <div className="property-description">
                <h2>Description</h2>
                <p>{property.description}</p>
            </div>

            <div className="tabs-section">
                <Tabs>
                    <TabList>
                        <Tab>Description</Tab>
                        <Tab>Floor Plan</Tab>
                        <Tab>Map</Tab>
                    </TabList>

                    <TabPanel>
                        <div className="tab-content">
                            <h3>About this property</h3>
                            <p>{property.longDescription}</p>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="tab-content">
                            <h3>Floor Plan</h3>
                            <img src={property.floorPlan} alt="Floor Plan" className="floorplan-image" />
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="tab-content">
                            <h3>Location</h3>
                            <div className="map-container">
                                <iframe
                                    title="Property Location"
                                    src={property.mapEmbedUrl}
                                    width="100%"
                                    height="450"
                                    style={{ border: 0 }}
                                    allowFullScreen={true}
                                    loading="lazy"
                                ></iframe>
                            </div>
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
};

export default PropertyPage;
