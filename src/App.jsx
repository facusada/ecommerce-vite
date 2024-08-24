// React
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// Components
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Products from './components/Products/Products';
import ProductDetails from './components/Products/ProductDetails/ProductDetails';
import Cart from './components/Cart/Cart';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Checkout from './components/Checkout/Checkout';
import Orders from './components/Orders/Orders';
import ProductNotFoundModal from './components/ProductNotFound/ProductNotFound';
// Context
import { useAuth } from './context/AuthContext';
// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.sass';

const App = () => {
  const authContext = useAuth();

  return (
    <Router>
        <>
        <Navbar />
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/products" element={ <Products /> } />
          <Route path="/products/details/:productId" element={ <ProductDetails /> } />
          <Route path="/products/details/error" element={ <ProductNotFoundModal /> } />
          <Route path="/cart" element={ <Cart /> } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/checkout"
            element={authContext.user.isAuthenticated ? <Checkout /> : <Navigate to="/login" />}
          />
          <Route
            path="/orders"
            element={authContext.user.isAuthenticated ? <Orders /> : <Navigate to="/login" />}
          />
        </Routes>
        </>
    </Router>
  )
};

export default App;