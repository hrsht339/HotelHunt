import React, { useState, useEffect } from 'react';
import PropertyCard from '../components/PropertyCard';
import Navbar from '../components/Navbar';

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortByPrice, setSortByPrice] = useState(false);
  const [sortOption, setSortOption] = useState('lowToHigh'); // 'lowToHigh' or 'highToLow'

  // Fetch properties from the backend
  useEffect(() => {
    fetch('http://127.0.0.1:5000/getProperty')
      .then((response) => response.json())
      .then((data) => {
        setProperties(data.properties)})
      .catch((error) => console.error('Error fetching properties:', error));
  }, []);

  // Filter properties based on the search query
  const filteredProperties = properties.filter((property) =>
    property.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort properties by price based on the selected sort option
  const sortedProperties = filteredProperties.sort((a, b) => {
    const priceA = a.price;
    const priceB = b.price;

    if (sortOption === 'lowToHigh') {
      return priceA - priceB;
    } else {
      return priceB - priceA;
    }
  });
  console.log('Property:', properties);
  return (
    <div>
      <h1>Welcome to HotelHunt Properties</h1>
      {/* Render the Navbar component */}
      <Navbar />
      {/* Add search and sort controls */}
      <div className="search-and-sort">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <label>
          Sort by price:
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="lowToHigh">Low to High</option>
            <option value="highToLow">High to Low</option>
          </select>
        </label>
      </div>
      {/* Add filters here */}
      <div className="property-grid">
        {sortedProperties.map((property) => (
          <PropertyCard key={property._id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default Home;
