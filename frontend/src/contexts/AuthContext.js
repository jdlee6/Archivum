import React, { useState, useEffect, createContext } from 'react';

export const AuthContext = createContext();

export default function AuthContextProvider(props) {
  // if authenticated -> show profile page & log out
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // when user logs in -> setIsAuthenticated to True
  const handleAuth = () => {
    if (isAuthenticated === true) {
      setIsAuthenticated(false);
      localStorage.setItem('authenticated', 'false');
    } else {
      setIsAuthenticated(true);
      localStorage.setItem('authenticated', 'true');
    }
  };

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('authenticated') === 'true';
    setIsAuthenticated(isAuthenticated);
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, handleAuth }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
