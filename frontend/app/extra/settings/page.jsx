"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Sidebar from "../../../components/Sidebar";

const TOGGLES = [
  { label: "Sound effects", key: "sound" },
  { label: "Parental Guide", key: "parental" },
  { label: "Notifications", key: "notifications" },
  { label: "Motivational messages", key: "motivation1" },
  { label: "Motivational messages", key: "motivation2" },
];

export default function SettingsPage() {
  const [toggles, setToggles] = useState({
    sound: false,
    parental: false,
    notifications: false,
    motivation1: false,
    motivation2: true,
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleToggle = (key) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex min-h-screen bg-[#e6cafd]">
      {/* Hamburger for mobile */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden bg-[#9B5398] p-2 rounded-full shadow-lg focus:outline-none"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open sidebar"
      >
        <svg width="28" height="28" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="8" x2="23" y2="8"/><line x1="5" y1="16" x2="23" y2="16"/></svg>
      </button>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col px-6 pt-4 pb-8">
      {/* Breadcrumb + Stats */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-lg font-bold">
          <Image src="/home.svg" alt="Home" width={28} height={28} className="inline-block" />
          <span className="text-[#ffb300] font-bold">Home</span>
          <span className="mx-1 text-[#7c3aed]">»</span>
          <span className="text-[#7c3aed] font-bold">Extra</span>
          <span className="mx-1 text-[#7c3aed]">»</span>
          <span className="text-[#7c3aed] font-bold">Settings</span>
        </div>
        <div className="flex items-center gap-4 text-base font-bold">
          <span className="flex items-center gap-1 text-[#ffb300]">
            <Image src="/streak.svg" alt="Streak" width={22} height={22} /> 1
          </span>
          <span className="flex items-center gap-1 text-[#ff5a7b]">
            <Image src="/lives.svg" alt="Lives" width={22} height={22} /> 4
          </span>
          <span className="flex items-center gap-1 text-[#ffb300]">
            <Image src="/experince.svg" alt="Coins" width={22} height={22} /> 15
          </span>
        </div>
      </div>
      {/* Banner */}
      <div className="flex items-center justify-between bg-gradient-to-r from-[#c08bfa] to-[#a16ae8] rounded-2xl px-8 py-6 mb-8">
        <div>
          <div className="font-extrabold text-2xl mb-1">Set Saving Ville to your taste</div>
          <div className="text-[#8c7fae] font-medium text-base">Have the flexibility to customize<br />to your perfect taste</div>
        </div>
        <Image src="/settings.svg" alt="Settings" width={90} height={90} />
      </div>
      {/* Toggles */}
      <div className="flex flex-col gap-6 mb-8">
        {TOGGLES.map((toggle) => (
          <div key={toggle.key} className="flex items-center justify-between">
            <span className="font-extrabold text-lg text-black">{toggle.label}</span>
            <button
              aria-label={toggle.label}
              onClick={() => handleToggle(toggle.key)}
              className={`w-14 h-8 rounded-full border-2 border-[#c08bfa] flex items-center transition-colors duration-200 ${toggles[toggle.key] ? "bg-[#c08bfa]" : "bg-white"}`}
            >
              <span
                className={`block w-6 h-6 rounded-full shadow-md transform transition-transform duration-200 ${toggles[toggle.key] ? "translate-x-6 bg-[#7c3aed]" : "translate-x-1 bg-[#e6cafd]"}`}
              ></span>
            </button>
          </div>
        ))}
      </div>
      {/* Bottom nav */}
      <div className="flex items-center justify-between bg-[#f3e6ff] rounded-2xl px-8 py-4 mt-auto">
        <Link href="/extra/feedback" className="font-extrabold text-lg text-[#7c3aed]">Feedback</Link>
        <span className="font-bold text-[#8c7fae] text-lg">Help Centre</span>
      </div>
      </div>
    </div>
  );
}
