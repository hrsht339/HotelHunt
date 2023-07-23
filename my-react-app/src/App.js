import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import HostPage from './pages/HostPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage'; // Import the SignupPage component
import Payment from './pages/Payment';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/host" element={<HostPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} /> {/* Add route for SignupPage */}
        {/* Add more routes for other pages */}
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </Router>
  );
};

export default App;
