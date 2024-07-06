import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<h2>Inicio</h2>} />
        <Route path="/categoria1" element={<h2>Categoría 1</h2>} />
        <Route path="/categoria2" element={<h2>Categoría 2</h2>} />
        <Route path="/categoria3" element={<h2>Categoría 3</h2>} />
      </Routes>
    </Router>
  );
};

export default App;
