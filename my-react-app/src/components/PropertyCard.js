import React from 'react';

const PropertyCard = ({ property }) => {
  return (
    <div className="property-card">
      {/* Property details like name, location, price */}
      <h3>{property.name}</h3>
      <p>{property.location}</p>
      <p>{property.property_type}</p>
      <p>{property.about}</p>
      <p>{property.hosting_since}</p>
      <p>Price: ${property.price}</p>
      {/* Add a button for booking */}
      <button>Book Now</button>
    </div>
  );
};

export default PropertyCard;


// {
//     "name":"any name",
//     "host_id":"64b78cc18e1ece46db216204",
//     "location":"any location",
//     "property_type":"any type",
//     "about":"any about",
//     "hosting_since":"any date"
// }