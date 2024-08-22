import React from 'react';
import { logoutUser } from '../../services/Auth.js';

const Logout = () => {
  const handleLogout = async () => {
    try {
      logoutUser();
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;