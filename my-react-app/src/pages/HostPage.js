import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const HostPage = () => {
  const [propertyData, setPropertyData] = useState({
    name: '',
    location: '',
    property_type: '',
    about: '',
    hosting_since: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPropertyData({ ...propertyData, [name]: value });
  };

  const handleAddProperty = (event) => {
    event.preventDefault();

    // Get the token from local storage
    const token = localStorage.getItem('token');

    // Prepare the property data to be sent to the backend
    const propertyToAdd = {
      ...propertyData,
    };

    // Send the property data to the backend using fetch
    fetch('http://127.0.0.1:5000/addProperty', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token, // Set the Authorization header with the token
      },
      body: JSON.stringify(propertyToAdd),
    })
      .then((response) => response.json())
      .then((data) => {
        // Display the success message from the backend response
        alert(data.message);
        // Clear the form after successful submission
        setPropertyData({
          name: '',
          location: '',
          property_type: '',
          about: '',
          hosting_since: '',
        });
      })
      .catch((error) => {
        console.error('Error adding property:', error);
        // Display an error message if the request fails
        alert('Failed to add property. Please try again later.');
      });
  };

  const handleUpdateProperty = (event) => {
    event.preventDefault();

    // Get the token from local storage
    const token = localStorage.getItem('token');

    // Prepare the property data to be sent to the backend
    const propertyToUpdate = {
      ...propertyData,
    };

    // Send the property data to the backend using fetch
    fetch(`http://127.0.0.1:5000/updateProperty/${propertyData._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token, // Set the Authorization header with the token
      },
      body: JSON.stringify(propertyToUpdate),
    })
      .then((response) => response.json())
      .then((data) => {
        // Display the success message from the backend response
        alert(data.message);
        // Clear the form after successful submission
        setPropertyData({
          name: '',
          location: '',
          property_type: '',
          about: '',
          hosting_since: '',
        });
      })
      .catch((error) => {
        console.error('Error updating property:', error);
        // Display an error message if the request fails
        alert('Failed to update property. Please try again later.');
      });
  };

  const handleDeleteProperty = (event) => {
    event.preventDefault();

    // Get the token from local storage
    const token = localStorage.getItem('token');

    // Send the delete request to the backend using fetch
    fetch(`http://127.0.0.1:5000/deleteProperty/${propertyData._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token, // Set the Authorization header with the token
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Display the success message from the backend response
        alert(data.message);
        // Clear the form after successful submission
        setPropertyData({
          name: '',
          location: '',
          property_type: '',
          about: '',
          hosting_since: '',
        });
      })
      .catch((error) => {
        console.error('Error deleting property:', error);
        // Display an error message if the request fails
        alert('Failed to delete property. Please try again later.');
      });
  };

  return (
    <div>
      <h1>Host Page</h1>
      {/* Render the Navbar component */}
      <Navbar />
      <h2>Add Property</h2>
      {/* Add form to add property */}
      <form onSubmit={handleAddProperty}>
        {/* ... Input fields for adding property ... */}
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={propertyData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={propertyData.location}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="property_type">Property Type:</label>
          <input
            type="text"
            id="property_type"
            name="property_type"
            value={propertyData.property_type}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="about">About:</label>
          <textarea
            id="about"
            name="about"
            value={propertyData.about}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="hosting_since">Hosting Since:</label>
          <input
            type="date"
            id="hosting_since"
            name="hosting_since"
            value={propertyData.hosting_since}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button type="submit">Add Property</button>
        </div>
      </form>

      <h2>Update Property</h2>
      {/* Add form to update property */}
      <form onSubmit={handleUpdateProperty}>
        <div>
          <label htmlFor="updatePropertyId">Property ID:</label>
          <input
            type="text"
            id="updatePropertyId"
            name="updatePropertyId"
            value={propertyData._id}
            onChange={handleInputChange}
          />
        </div>
        {/* ... Input fields for updating property ... */}
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={propertyData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={propertyData.location}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="property_type">Property Type:</label>
          <input
            type="text"
            id="property_type"
            name="property_type"
            value={propertyData.property_type}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="about">About:</label>
          <textarea
            id="about"
            name="about"
            value={propertyData.about}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="hosting_since">Hosting Since:</label>
          <input
            type="date"
            id="hosting_since"
            name="hosting_since"
            value={propertyData.hosting_since}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button type="submit">Update Property</button>
        </div>
      </form>

      <h2>Delete Property</h2>
      {/* Add form to delete property */}
      <form onSubmit={handleDeleteProperty}>
        <div>
          <label htmlFor="deletePropertyId">Property ID:</label>
          <input
            type="text"
            id="deletePropertyId"
            name="deletePropertyId"
            value={propertyData._id}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button type="submit">Delete Property</button>
        </div>
      </form>
    </div>
  );
};

export default HostPage;
