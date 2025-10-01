"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);       // user info
  const [token, setToken] = useState(null);     // JWT token
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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

  // Login (localStorage + call API + redirect)
  const login = async (user, token) => {
    setUser(user);
    setToken(token);

    localStorage.setItem("savingsville-user", JSON.stringify(user));
    localStorage.setItem("savingsville-token", token);

    await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user, token }),
    });
    
    router.push("/dashboard");
  };

  // Logout (clear localStorage + clear server cookie)
  const logout = async () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("savingsville-user");
    localStorage.removeItem("savingsville-token");

    await fetch("/api/auth/logout", { method: "POST" });
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
