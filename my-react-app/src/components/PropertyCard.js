import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/propertyCard.css';

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    // Get the user's token from localStorage
    const token = localStorage.getItem('token');

    // Check if the user is logged in (token exists)
    if (!token) {
      alert('Please log in to book a property.');
      return;
    }
    console.log(property._id)
    // Call the backend endpoint to book the property
    fetch(`http://127.0.0.1:5000/book/${property._id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token, // Set the Authorization header with the token
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // After successfully booking, navigate to the payment page
        // navigate('/payment', { state: { property: property } }); // Pass the property object in the state
        alert('Property booked successfully!');
      })
      .catch((error) => {
        console.error('Error booking property:', error);
        // Display an error message if booking fails
        alert('Failed to book property. Please try again later.');
      });
  };

  return (
    <div className="property-card">
      {/* Property image */}
      <div className="property-image">
        <img src={property.image} alt={property.name} />
      </div>
      {/* Property details */}
      <div className="property-details">
        <h3>{property.name}</h3>
        <p>{property.location}</p>
        <p>{property.property_type}</p>
        <p>{property.about}</p>
        <p>{property.hosting_since}</p>
        <p>Price: ${property.price}</p>
        {/* Add a button for booking */}
        <button onClick={handleBookNow}>Book Now</button>
      </div>
    </div>
  );
};

export default PropertyCard;
