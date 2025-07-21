
"use client";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
const sidebarItems = [
  { icon: "/home.svg", label: "Home", link: "/dashboard?tab=home", tabId: "home" },
  { icon: "/advanced.svg", label: "Advanced", link: "/dashboard?tab=advanced", tabId: "advanced" },
  { icon: "/goals.svg", label: "Goals", link: "/dashboard?tab=goals", tabId: "goals" },
  { icon: "/tracker.svg", label: "Tracker", link: "/dashboard?tab=tracker", tabId: "tracker" },
  { icon: "/games.svg", label: "Games", link: "/dashboard?tab=games", tabId: "games" },
  { icon: "/extra.svg", label: "Extra", link: "/dashboard?tab=extra", tabId: "extra" },

];

export default function Sidebar({ isOpen = true, onClose, handleTabChange }) {
  const searchParams = useSearchParams();
      const tab = searchParams.get("tab");
  

  return (
    <div className="bg-[#E2C6FF] w-[18em] h-screen px-[2em] pt-[3em] py-[1.5em] shadow-2xl border-r-2 border-[#e6d2f7] rounded-r-2xl">
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity md:hidden ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />
      <aside
        className={`fixed md:static z-50 top-0 left-0 flex flex-col h-full transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        {/* Logo & Hamburger */}
        <div className="flex items-center gap-3 relative mb-[2em]">
          <img src="/logo_icon.png" alt="Logo" className="w-11 h-11" />
          <span className="font-heading text-2xl font-bold text-[#9B5398] tracking-tight">Savingsville</span>
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
        <nav className="flex-1 flex flex-col gap-3">
          {sidebarItems.map((item) => (
            <Link
            //onClick={() => handleTabChange(item.tabId)}
            href={item.link}
              key={item.label}
              className={`cursor-pointer flex items-center font-bold gap-4 px-5 py-3 rounded-xl text-base md:text-lg transition-all duration-150 w-full text-left ${
                item.tabId === tab
                  ? "bg-[#A994BF] text-white shadow-[0_2px_8px_0_rgba(155,83,152,0.10)] border-2 border-white"
                  : "bg-white/40 hover:bg-[#f3e6ff] border-2 border-transparent"
              }`}
             
            >
              <span className={`flex items-center justify-center w-8 h-8 rounded-lg ${item.active ? 'bg-[#e2c6ff]' : ''}`}>
                <img src={item.icon} alt={item.label + ' icon'} className="w-6 h-6" />
              </span>
              <span className="truncate font-heading tracking-tight">{item.label}</span>
            </Link>
          ))}
        </nav>
        {/* Log Out */}
        <div className="mt-auto pt-4">
          <button className="cursor-pointer flex items-center gap-4 px-5 py-3 rounded-xl text-base md:text-lg font-semibold text-[#9B5398] bg-white/40 hover:bg-[#f3e6ff] w-full font-heading tracking-tight border-2 border-transparent">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg">
              <img src="/logout.svg" alt="Logout icon" className="w-6 h-6" />
            </span>
            <span className="truncate">Log Out</span>
          </button>
        </div>
      </aside>
    </div>
  );
}
