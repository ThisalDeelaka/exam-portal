// src/context/AuthContext.js
import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('token') || null);
  const [user, setUser] = useState(null);

  const login = async (studentId, password) => {
    const response = await axios.post('/api/auth/login', { studentId, password });
    setAuthToken(response.data.token);
    setUser({ id: response.data.id, role: response.data.role });
    localStorage.setItem('token', response.data.token);
  };

  const logout = () => {
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ authToken, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
