// React
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    uid: null,
    email: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
  });

  const login = (userInfo) => {
    setUser({
      uid: userInfo.uid,
      email: userInfo.email,
      accessToken: userInfo.stsTokenManager.accessToken,
      refreshToken: userInfo.stsTokenManager.refreshToken,
      isAuthenticated: true,
    });
  };

  const logout = () => {
    setUser({
      uid: null,
      email: null,
      accessToken: null,
      refreshToken: null,
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