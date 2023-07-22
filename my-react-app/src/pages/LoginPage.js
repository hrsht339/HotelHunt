import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleLogin = () => {
    // Implement the login logic here
    // For example, using fetch to send the email and password to the backend:
    fetch('http://127.0.0.1:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
      .then((response) => response.json())
      .then((data) => {
        // If login is successful, show an alert, store the token, and navigate to the home page
        alert('Login successful!');
        localStorage.setItem('token', data.token); // Save the token in local storage
        navigate('/');
      })
      .catch((error) => console.error('Error logging in:', error));
  };

  return (
    <div>
      <h1>Login</h1>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
