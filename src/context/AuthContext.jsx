import React, { createContext, useState, useEffect } from "react";
import { apiClient } from "../api/apiClient";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  const fetchMe = async (currentToken) => {
    try {
      return await apiClient("/auth/me", {
        method: "GET",
        headers: { Authorization: `Bearer ${currentToken}` },
      });
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      if (token && !user) {
        const data = await fetchMe(token);
        if (data) setUser(data);
        else logout();
      }
    };
    checkAuth();
  }, [token]);

  const login = (jwtToken, userData) => {
    setToken(jwtToken);
    setUser(userData);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
