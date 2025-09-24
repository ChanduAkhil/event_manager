// src/context/AuthContext.jsx
import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);
const API_URL = "http://localhost:8082/api/auth";

export const AuthProvider = ({ children }) => {
  // Try to get the user from localStorage when the app first loads
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const login = async (username, password) => {
    try {
      // In a real app with JWTs, the response would contain a token.
      // We are mocking the user data we get back for this example.
      await axios.post(`${API_URL}/login`, { username, password });
      
      const userData = { username: username }; // You might get more user details from the backend
      
      // Save the user to localStorage
      localStorage.setItem("user", JSON.stringify(userData));
      
      // Set the user in the state
      setUser(userData);

    } catch (error) {
      console.error("Login failed:", error.response.data);
      throw new Error(error.response.data);
    }
  };

  const logout = () => {
    // Remove the user from localStorage
    localStorage.removeItem("user");
    // Set the user in the state to null
    setUser(null);
  };

  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};