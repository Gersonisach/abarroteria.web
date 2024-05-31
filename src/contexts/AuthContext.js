import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Recuperar los valores de localStorage
  const storedIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const storedUserData = JSON.parse(localStorage.getItem('userData'));

  const [isLoggedIn, setIsLoggedIn] = useState(storedIsLoggedIn);
  const [userData, setUserData] = useState(storedUserData);

  const login = (userData) => {
    setIsLoggedIn(true);
    setUserData(userData);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserData(null);
  };

  // Actualizar localStorage cuando isLoggedIn o userData cambian
  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
    localStorage.setItem('userData', JSON.stringify(userData));
  }, [isLoggedIn, userData]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, userData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

