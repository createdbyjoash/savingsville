
"use client";
import React, { useState } from "react";

const sidebarItems = [
  { icon: "/home.svg", label: "Home" },
  { icon: "/advanced.svg", label: "Advanced" },
  { icon: "/goals.svg", label: "Goals" },
  { icon: "/tracker.svg", label: "Tracker" },
  { icon: "/games.svg", label: "Games" },
  { icon: "/extra.svg", label: "Extra", active: true },
];

export default function Sidebar({ isOpen = true, onClose }) {
  // Responsive sidebar: show/hide on mobile
  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity md:hidden ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />
      <aside
        className={`fixed md:static z-50 top-0 left-0 h-full bg-[#E2C6FF] min-h-screen w-[230px] md:w-64 p-0 rounded-tr-3xl rounded-br-3xl shadow-xl border-r-2 border-[#e6d2f7] flex flex-col transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
        style={{ maxWidth: 280 }}
      >
        {/* Logo & Hamburger */}
        <div className="flex items-center gap-3 px-7 pt-8 pb-10 relative">
          <img src="/logo_icon.png" alt="Logo" className="w-11 h-11" />
          <span className="font-heading text-2xl font-bold text-[#9B5398] tracking-tight">Saving Ville</span>
          {/* Hamburger close button (mobile) */}
          {onClose && (
            <button
              className="absolute right-2 top-2 md:hidden p-2 rounded-full hover:bg-[#e6d2f7] focus:outline-none"
              onClick={onClose}
              aria-label="Close sidebar"
            >
              <svg width="24" height="24" fill="none" stroke="#9B5398" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          )}
        </div>
        {/* Nav */}
        <nav className="flex-1 flex flex-col gap-2 px-4">
          {sidebarItems.map((item) => (
            <button
              key={item.label}
              className={`flex items-center gap-4 px-5 py-3 rounded-xl text-base md:text-lg font-semibold transition-all duration-150 w-full text-left ${
                item.active
                  ? "bg-white/80 text-[#9B5398] shadow-[0_2px_8px_0_rgba(155,83,152,0.10)] border-2 border-[#9B5398]"
                  : "bg-white/40 text-[#3d203c] hover:bg-[#f3e6ff] border-2 border-transparent"
              }`}
              style={{ boxShadow: item.active ? '0 4px 16px 0 #e2c6ff' : undefined }}
            >
              <span className={`flex items-center justify-center w-8 h-8 rounded-lg ${item.active ? 'bg-[#e2c6ff]' : ''}`}>
                <img src={item.icon} alt={item.label + ' icon'} className="w-6 h-6" />
              </span>
              <span className="truncate font-heading tracking-tight">{item.label}</span>
            </button>
          ))}
        </nav>
        {/* Log Out */}
        <div className="mt-auto px-4 pb-8 pt-4">
          <button className="flex items-center gap-4 px-5 py-3 rounded-xl text-base md:text-lg font-semibold text-[#9B5398] bg-white/40 hover:bg-[#f3e6ff] w-full font-heading tracking-tight border-2 border-transparent">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg">
              <img src="/logout.svg" alt="Logout icon" className="w-6 h-6" />
            </span>
            <span className="truncate">Log Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
