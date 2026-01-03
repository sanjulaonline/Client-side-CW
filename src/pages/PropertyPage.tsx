import React from 'react';
import { useParams } from 'react-router-dom';

const PropertyPage: React.FC = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Property Details: {id}</h1>
    </div>
  );
};

export default PropertyPage;
