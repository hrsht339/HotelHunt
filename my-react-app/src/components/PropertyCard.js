import React from 'react';

const PropertyCard = ({ property }) => {
  return (
    <div className="property-card">
      {/* Property details like name, location, price */}
      <h3>{property.name}</h3>
      <p>{property.location}</p>
      <p>Price: ${property.price}</p>
      {/* Add a button for booking */}
      <button>Book Now</button>
    </div>
  );
};

export default PropertyCard;
