import React, { useState, useEffect } from 'react';
import PropertyCard from '../components/PropertyCard';
import Navbar from '../components/Navbar';

const Home = () => {
  const [properties, setProperties] = useState([]);

  // Fetch properties from the backend
  useEffect(() => {
    fetch('http://127.0.0.1:5000/getProperty')
      .then((response) => response.json())
      .then((data) => setProperties(data.properties))
      .catch((error) => console.error('Error fetching properties:', error));
  }, []);

  return (
    <div>
      <h1>Welcome to Homestead Horizon</h1>
      {/* Render the Navbar component */}
      <Navbar />
      {/* Add filters here */}
      <div className="property-grid">
        {properties.map((property) => (
          <PropertyCard key={property._id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default Home;
