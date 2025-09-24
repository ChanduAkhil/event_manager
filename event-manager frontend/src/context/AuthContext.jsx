import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

// Mock users for demonstration
const MOCK_USERS = [
  { username: 'admin', password: 'admin123', role: 'admin' },
  { username: 'user', password: 'user123', role: 'user' },
  { username: 'gopi', password: 'babu', role: 'user' },
  { username: 'rakesh', password: 'password123', role: 'user' }
];

export const AuthProvider = ({ children }) => {
  // Load user from localStorage if available
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [loading, setLoading] = useState(false);

  const login = async (username, password) => {
    setLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      // Accept any username/password combination
      if (username && password) {
        // Check if it's a predefined admin user
        const foundUser = MOCK_USERS.find(u => u.username === username && u.password === password);
        const role = foundUser ? foundUser.role : 'user';
        
        const userData = { 
          username: username, 
          role: role 
        };
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        console.log("Login successful:", userData);
      } else {
        throw new Error("Username and password are required");
      }
    } catch (error) {
      console.error("Login failed:", error.message);
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
