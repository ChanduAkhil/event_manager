import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);
const API_URL = "http://localhost:8082/api/auth";

export const AuthProvider = ({ children }) => {
  // Load user from localStorage if available
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [loading, setLoading] = useState(false);

  const login = async (username, password) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/login`, { username, password });
      console.log("Login response:", response.data); // Debug backend response

      // Backend does not return token, so we just save the username
      const userData = { username };
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);

    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      throw new Error("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const value = { user, login, logout, loading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
