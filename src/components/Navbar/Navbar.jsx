// React
import React from 'react';
import { NavLink } from 'react-router-dom';
// Components
import CartWidget from '../CartWidget/CartWidget';
// Styles
import './Navbar.sass'

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container">
      <div className='header'>
        <div>
          <NavLink className="navbar-brand" to="/">Market</NavLink>
        </div>
        <div className="cart-widget">
          <CartWidget />
        </div>
      </div>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/" exact>Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/products">Products</NavLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Navbar;