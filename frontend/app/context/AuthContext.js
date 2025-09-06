"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);       // user info
  const [token, setToken] = useState(null);     // JWT token
  const [loading, setLoading] = useState(true);

  // Load auth data from localStorage when app starts
  useEffect(() => {
    const storedUser = localStorage.getItem("savingsville-user");
    const storedToken = localStorage.getItem("savingsville-token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  // Login (store user + token)
  const login = (user, token) => {
    setUser(user);
    setToken(token);

    localStorage.setItem("savingsville-user", JSON.stringify(user));
    localStorage.setItem("savingsville-token", token);
  };

  // Logout (clear everything)
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("savingsville-token");
    localStorage.removeItem("savingsville-token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
