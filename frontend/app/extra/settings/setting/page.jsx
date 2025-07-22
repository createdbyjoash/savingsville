"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Sidebar from "../../../../components/Sidebar";

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
      <div className="flex-1 flex flex-col px-4 pt-2 pb-6">
      {/* Breadcrumb + Stats */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-base font-bold">
          <Image src="/home.svg" alt="Home" width={22} height={22} className="inline-block" />
          <span className="text-[#ffb300] font-bold">Home</span>
          <span className="mx-1 text-[#7c3aed]">»</span>
          <span className="text-[#7c3aed] font-bold">Extra</span>
          <span className="mx-1 text-[#7c3aed]">»</span>
          <span className="text-[#7c3aed] font-bold">Settings</span>
        </div>
        <div className="flex items-center gap-3 text-sm font-bold">
          <span className="flex items-center gap-1 text-[#ffb300]">
            <Image src="/streak.svg" alt="Streak" width={16} height={16} /> 1
          </span>
          <span className="flex items-center gap-1 text-[#ff5a7b]">
            <Image src="/lives.svg" alt="Lives" width={16} height={16} /> 4
          </span>
          <span className="flex items-center gap-1 text-[#ffb300]">
            <Image src="/experince.svg" alt="Coins" width={16} height={16} /> 15
          </span>
        </div>
      </div>
      {/* Banner with search */}
      <div className="flex items-center justify-between bg-gradient-to-r from-[#c08bfa] to-[#a16ae8] rounded-2xl px-6 py-3 mb-6">
        <div>
          <div className="font-extrabold text-lg mb-1">Set Saving Ville to your taste</div>
          <div className="text-[#8c7fae] font-medium text-xs">Have the flexibility to customize<br />to your perfect taste</div>
        </div>
        <div className="flex items-center gap-2 bg-white rounded-full px-2 py-1">
          <Image src="/search.svg" alt="Search" width={18} height={18} />
          <input type="text" placeholder="Search settings..." className="bg-transparent outline-none text-xs px-1" />
        </div>
        <Image src="/settings.svg" alt="Settings" width={48} height={48} />
      </div>
      {/* Toggles */}
      <div className="flex flex-col gap-4 mb-6">
        {TOGGLES.map((toggle) => (
          <div key={toggle.key} className="flex items-center justify-between">
            <span className="font-extrabold text-sm text-black">{toggle.label}</span>
            <button
              aria-label={toggle.label}
              onClick={() => handleToggle(toggle.key)}
              className={`w-10 h-6 rounded-full border-2 border-[#c08bfa] flex items-center transition-colors duration-200 ${toggles[toggle.key] ? "bg-[#c08bfa]" : "bg-white"}`}
            >
              <span
                className={`block w-5 h-5 rounded-full shadow-md transform transition-transform duration-200 ${toggles[toggle.key] ? "translate-x-4 bg-[#7c3aed]" : "translate-x-1 bg-[#e6cafd]"}`}
              ></span>
            </button>
          </div>
        ))}
      </div>
      {/* Bottom nav */}
      <div className="flex items-center justify-between bg-[#f3e6ff] rounded-2xl px-6 py-3 mt-auto">
        <Link href="/extra/feedback" className="font-extrabold text-base text-[#7c3aed]">Feedback</Link>
        <span className="font-bold text-[#8c7fae] text-base">Help Centre</span>
      </div>
      </div>
    </div>
  );
}
