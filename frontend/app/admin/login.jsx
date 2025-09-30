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
    if (email === "admin@example.com" && password === "admin123") {
      router.push("/admin/dashboard");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#F6F4FF] to-[#E2C6FF]">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-10 flex flex-col items-center">
        <h1 className="font-baloo text-3xl font-bold text-secondary mb-2">SavingsVille Admin</h1>
        <span className="text-gray-500 font-semibold mb-6">Sign in to your admin account</span>
        <form className="w-full space-y-5" onSubmit={handleLogin}>
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            className="w-full"
          />
          <Input
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            className="w-full"
          />
          <AccentButton type="submit" label="Login" className="w-full mt-2" />
          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
}
