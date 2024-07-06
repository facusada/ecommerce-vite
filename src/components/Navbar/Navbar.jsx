import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.sass';

const Navbar = () => {
  return (
    <nav>
      <h1>Mi Tienda</h1>
      <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/categoria1">Categoría 1</Link></li>
        <li><Link to="/categoria2">Categoría 2</Link></li>
        <li><Link to="/categoria3">Categoría 3</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
