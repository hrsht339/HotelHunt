import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import HostPage from './pages/HostPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route exact path='/host' element={<HostPage/>} />
        {/* Add more routes for other pages */}
      </Routes>
    </Router>
  );
};

export default App;
