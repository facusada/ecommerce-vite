// React
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Components
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Products from './components/Products/Products';
import ProductDetails from './components/Products/ProductDetails/ProductDetails';
// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.sass';

const App = () => (
  <Router>
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/products" element={ <Products /> } />
        <Route path="/products/details/:productId" element={ <ProductDetails /> } />
      </Routes>
    </div>
  </Router>
);

export default App;