import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/navbar.css';
import logo from '../HOTEL HUNT.png'; // Import the logo image

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  const handleAddProperty = () => {
    navigate('/host');
  };

  // Check if the token exists in localStorage
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <nav>
      <div className="logo">
        {/* Use the imported logo image */}
        <img src={logo} alt="Hotel Hunt Logo" />
      </div>
      <div className="links">
        {isLoggedIn && ( // Show the "Add Property" button only for logged-in users
          <button onClick={handleAddProperty}>Add Property</button>
        )}
        <button onClick={handleSignup}>Sign Up</button>
        <button onClick={handleLogin}>Log In</button>
        {isLoggedIn && <span>Hello, {localStorage.getItem('user_name')}</span>} {/* Display the user's name if logged in */}
      </div>
    </nav>
  );
};

export default Navbar;
