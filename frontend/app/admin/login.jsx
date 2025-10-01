"use client";
import React, { useState } from "react";
import Input from "@/components/Input";
import AccentButton from "@/components/AccentButton";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/login`,
        { email, password }
      );

      if (res?.data?.success) {
        const { token, admin } = res.data.data;

        // Store token if needed
        localStorage.setItem("adminToken", token);

        console.log("Admin logged in:", admin);
        router.push("/admin/dashboard");
      } else {
        setError(res?.data?.message || "Invalid credentials");
      }
    } catch (err) {
      console.error("Admin login error:", err);
      if (err.response) {
        setError(err.response.data.message || "Invalid credentials");
      } else {
        setError("Server error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#F6F4FF] to-[#E2C6FF]">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-10 flex flex-col items-center">
        <h1 className="font-baloo text-3xl font-bold text-secondary mb-2">
          SavingsVille Admin
        </h1>
        <span className="text-gray-400 font-medium mb-6">
          Sign in to your admin account
        </span>
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
          <AccentButton
            type="submit"
            label={loading ? "Logging in..." : "Login"}
            className="w-full mt-2"
            disabled={loading}
            loading={loading}
          />
          {error && (
            <p className="text-red-500 text-center mt-2">{error}</p>
          )}
        </form>
      </div>
    </div>
  );
}
