import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchPropertyById } from '../services/propertyService';
import { FaArrowLeft, FaMapMarkerAlt, FaBed, FaHeart } from 'react-icons/fa';
import ImageGallery from '../components/ImageGallery';
import PropertyTabs from '../components/PropertyTabs';
import { useFavourites } from '../context/FavouritesContext';
import './PropertyPage.css';
import '../index.css';

const PropertyPage = () => {
    const { id } = useParams();
    const [property, setProperty] = useState(undefined);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProperty = async () => {
            if (id) {
                setLoading(true);
                const data = await fetchPropertyById(id);
                setProperty(data);
                setLoading(false);
            }
        };
        loadProperty();
    }, [id]);

    const { isFavourite, addToFavourites, removeFromFavourites } = useFavourites();

    if (loading) return <div className="loading">Loading details...</div>;
    if (!property) return <div className="error">Property not found</div>;

    const isFav = property ? isFavourite(property.id) : false;

    return (
        <div className="property-details-container">
            <Link to="/" className="back-link">
                <FaArrowLeft /> Back to Search
            </Link>

            <div className="property-header-section">
                <div className="header-left">
                    <h1>{property.location} - {property.type}</h1>
                    <div className="property-price-tag">
                        LKR {property.price.toLocaleString()}
                    </div>
                </div>
                <button
                    className={`fav-action-btn ${isFav ? 'active' : ''}`}
                    onClick={() => property && (isFav ? removeFromFavourites(property.id) : addToFavourites(property))}
                >
                    <FaHeart /> {isFav ? 'Saved' : 'Save Property'}
                </button>
            </div>

            <div className="gallery-section">
                <ImageGallery images={property.images} />
            </div>

            <div className="property-info-bar">
                <span><FaBed /> {property.bedrooms} Bedrooms</span>
                <span><FaMapMarkerAlt /> {property.postcode}</span>
                <span>Type: {property.type}</span>
            </div>

            <div className="property-description-section">
                <h2>Description</h2>
                <p>{property.description}</p>
            </div>

            <div className="tabs-section">
                <PropertyTabs property={property} />
            </div>
        </div>
    );
};

export default PropertyPage;
