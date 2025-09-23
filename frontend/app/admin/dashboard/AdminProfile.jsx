import React, { useState } from "react";
import Input from "@/components/Input";
import AccentButton from "@/components/AccentButton";

export default function AdminProfile() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (!password || !confirm) {
      setMessage("Please fill in both fields.");
      return;
    }
    if (password !== confirm) {
      setMessage("Passwords do not match.");
      return;
    }
    setMessage("Password changed successfully (simulated)");
    setPassword("");
    setConfirm("");
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 max-w-md mx-auto mt-8">
      <h3 className="font-baloo text-xl font-bold mb-4">Admin Profile</h3>
      <div className="mb-4">
        <div className="font-baloo text-lg text-gray-600">Name</div>
        <div className="font-bold text-xl">Admin User</div>
        <div className="font-baloo text-lg text-gray-600 mt-2">Email</div>
        <div className="font-bold text-xl">admin@example.com</div>
      </div>
      <form className="space-y-4" onSubmit={handleChangePassword}>
        <Input
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          type="password"
        />
        <Input
          placeholder="Confirm Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
          type="password"
        />
        <AccentButton type="submit" label="Change Password" className="w-full" />
        {message && <p className="text-secondary text-center mt-2">{message}</p>}
      </form>
    </div>
  );
}
