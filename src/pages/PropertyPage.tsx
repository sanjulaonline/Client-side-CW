import { useParams, Link } from 'react-router-dom';

const PropertyPage = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <div className="property-page">
            <Link to="/" className="back-link">&larr; Back to Search</Link>
            <h1>Property Details</h1>
            <p>Viewing property ID: {id}</p>
            <p>Complete details implementation coming in Feature 6.</p>
        </div>
    );
};

export default PropertyPage;
