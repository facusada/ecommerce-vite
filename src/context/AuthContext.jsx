// React
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    uid: null,
    email: null,
    isAuthenticated: false,
  });

  const login = (userInfo) => {
    setUser({
      uid: userInfo.uid,
      email: userInfo.email,
      isAuthenticated: true,
    });
  };

  const logout = () => {
    setUser({
      uid: null,
      email: null,
      isAuthenticated: false,
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);