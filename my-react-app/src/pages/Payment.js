// Payment.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/payment.css';
import PropertyCard from '../components/PropertyCard';
import Navbar from '../components/Navbar'; // Import the Navbar component

const Payment = () => {
  const [properties, setProperties] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    // Get the user's token from localStorage
    const token = localStorage.getItem('token');

    // Fetch properties from the backend
    fetch('http://127.0.0.1:5000/getbooking', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token, // Set the Authorization header with the token
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setProperties(data.properties);
        // Calculate the total price based on the fetched properties
        const total = data.properties.reduce((sum, property) => sum + property.price, 0);
        setTotalPrice(total);
      })
      .catch((error) => console.error('Error fetching bookings:', error));
  }, []);

  const handleCompletePayment = () => {
    // Implement your logic for completing the payment here
    // For example, redirect to a success page or show a payment confirmation message
    alert('Payment completed successfully!');
    navigate('/');
  };

  return (
    <div>
      {/* Include the Navbar component here */}
      <Navbar />
      <div className="payment-page">
        <div className="total-price">Total Price: ${totalPrice}</div>
        <div className="complete-payment-button">
          <button onClick={handleCompletePayment}>Complete Payment</button>
        </div>
        <div className="property-grid">
          {properties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Payment;
