"use client";
import React, { useState } from "react";
import Input from "@/components/Input";
import AccentButton from "@/components/AccentButton";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    // Simulate login success
    if (email === "admin@example.com" && password === "admin123") {
      router.push("/admin/dashboard");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="grid place-items-center h-screen bg-gray-100">
      <form
        className="bg-white p-8 rounded-xl shadow-md space-y-4 w-[350px]"
        onSubmit={handleLogin}
      >
        <h2 className="font-baloo text-2xl font-bold text-secondary mb-4 text-center">
          Admin Login
        </h2>
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          type="email"
        />
        <Input
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          type="password"
        />
        <AccentButton type="submit" label="Login" className="w-full" />
        {error && <p className="text-red-500 text-center">{error}</p>}
      </form>
    </div>
  );
}
