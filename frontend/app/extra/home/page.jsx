"use client";
import React, { useState } from "react";
import Sidebar from "../../../components/Sidebar";
import Image from "next/image";

export default function HomeExtraPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
      <main className="flex-1 flex flex-col px-4 md:px-10 py-6 overflow-x-hidden">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-base font-extrabold mb-4">
          <Image src="/home.svg" alt="Home" width={20} height={20} />
          <span className="text-[#ffb300] text-[1rem]">Home</span>
          <span className="mx-1 text-[#7c3aed] text-[1rem]">»</span>
          <span className="text-[#7c3aed] text-[1rem]">Extra</span>
        </div>
        {/* Banner with search */}
        <div className="flex items-center justify-between bg-gradient-to-r from-[#c08bfa] to-[#a16ae8] rounded-2xl px-8 py-4 mb-8">
          <div>
            <div className="font-extrabold text-lg mb-1">Explore Extra Features</div>
            <div className="text-[#8c7fae] font-medium text-xs">Find more ways to learn and grow</div>
          </div>
          <div className="flex items-center gap-2 bg-white rounded-full px-3 py-1">
            <Image src="/search.svg" alt="Search" width={18} height={18} />
            <input type="text" placeholder="Search extras..." className="bg-transparent outline-none text-xs px-2" />
          </div>
        </div>
        {/* Cards for extra features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#f3e6ff] rounded-2xl shadow p-4 flex flex-col items-center">
            <Image src="/instructors.svg" alt="Instructors" width={40} height={40} />
            <span className="font-bold text-[#7c3aed] mt-2 text-sm">Instructors</span>
          </div>
          <div className="bg-[#f3e6ff] rounded-2xl shadow p-4 flex flex-col items-center">
            <Image src="/parental.svg" alt="Parental" width={40} height={40} />
            <span className="font-bold text-[#7c3aed] mt-2 text-sm">Parental</span>
          </div>
          <div className="bg-[#f3e6ff] rounded-2xl shadow p-4 flex flex-col items-center">
            <Image src="/settings.svg" alt="Settings" width={40} height={40} />
            <span className="font-bold text-[#7c3aed] mt-2 text-sm">Settings</span>
          </div>
        </div>
      </main>
    </div>
  );
}
