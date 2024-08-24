// React
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
// Components
import CartWidget from '../CartWidget/CartWidget';
// Material UI
import LoginIcon from '@mui/icons-material/Login';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
// Context
import { useAuth } from '../../context/AuthContext.jsx';
// Services
import { logoutUser } from '../../services/Auth.js';
// Styles
import './Navbar.sass'

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      await logout();
      navigate('/login')
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <div className='header'>
          <div>
            <NavLink className="navbar-brand" to="/">Market</NavLink>
          </div>
          <div className="navbar-icons">
            <div className="cart-widget">
              <CartWidget />
            </div>
            <div className="login-icon">
              {
                user.isAuthenticated
                ? (
                  <div>
                    <NavLink onClick={handleLogout} to="#" style={{color: "white"}} className="nav-link">
                      <ExitToAppIcon /> Logout
                    </NavLink>
                  </div>
                ) : (
                  <div style={{color: "white"}}>
                    <NavLink to="/login" className="nav-link">
                      <LoginIcon style={{color: "white"}}/> Login
                    </NavLink>
                  </div>
                )
              }
            </div>
          </div>
        </div>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/products">Products</NavLink>
            </li>
            <li  className="nav-item">
              <NavLink
                to="/orders"
                className={`nav-link ${user.isAuthenticated ? '' : 'disabled'}`} 
              >
                My orders
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;