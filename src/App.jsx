import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Products from './components/Products/Products';
import CreateProductForm from './components/CreateProductForm/CreateProductForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.sass';

const App = () => (
  <Router>
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/products" element={ <Products /> } />
        <Route path="/create-product" element={ <CreateProductForm /> } />
      </Routes>
    </div>
  </Router>
);

export default App;