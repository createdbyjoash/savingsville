"use client";
import React, { useState, Suspense } from "react";
import Sidebar from "../../../components/Sidebar";



function ProfilePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex min-h-screen bg-[#E2C6FF]">
      {/* Hamburger for mobile */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden bg-[#9B5398] p-2 rounded-full shadow-lg focus:outline-none"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open sidebar"
      >
        <svg width="28" height="28" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="8" x2="23" y2="8"/><line x1="5" y1="16" x2="23" y2="16"/></svg>
      </button>
      {/* Sidebar: mobile overlay or desktop static */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="flex-1 flex flex-col items-center py-2 px-1 sm:px-2 relative">
        {/* Breadcrumb + Top right stats icons */}
        <div className="w-full max-w-3xl mb-2 sm:mb-3 px-1 flex items-center justify-between mt-4 md:mt-0">
          <div className="flex items-center gap-2 text-base sm:text-lg font-heading">
            <span className="flex items-center gap-1 text-[#9B5398] font-bold">
              <img src="/home.svg" alt="Home" className="w-5 h-5" />
              <span className="hidden sm:inline">Home</span>
            </span>
            <span className="mx-1 text-[#9B5398] font-bold">»</span>
            <span className="text-[#9B5398] font-bold">Extra</span>
            <span className="mx-1 text-[#9B5398] font-bold">»</span>
            <span className="text-[#9B5398] font-bold">Settings</span>
          </div>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1">
              <img src="/streak.svg" alt="Streak" className="w-5 h-5" />
              <span className="font-bold text-[#ff7a00] text-base">0</span>
            </div>
            <div className="flex items-center gap-1">
              <img src="/lives.svg" alt="Lives" className="w-5 h-5" />
              <span className="font-bold text-[#ff3b3b] text-base">0</span>
            </div>
            <div className="flex items-center gap-1">
              <img src="/experince.svg" alt="Experience Coin" className="w-5 h-5" />
              <span className="font-bold text-[#ffbe2e] text-base">0</span>
            </div>
          </div>
        </div>
        {/* Profile Card */}
        <section className="w-full max-w-3xl bg-[#e2c6ff] rounded-2xl shadow-lg p-0 flex flex-col items-center mb-4 border-2 border-[#e6d2f7] overflow-hidden mt-2 md:mt-0">
          {/* Banner with avatar */}
          <div className="w-full bg-gradient-to-r from-[#cfa6f7] to-[#b48be0] h-28 md:h-36 flex items-end justify-center relative">
            <div className="absolute right-4 top-4 bg-white/30 rounded-full p-1 border-2 border-white/50 cursor-pointer">
              <img src="/edit_profile.svg" alt="Edit" className="w-5 h-5" />
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 translate-y-1/2">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#d1a8f7] flex items-center justify-center border-4 border-[#9B5398]">
                <img src="/demo_profile.svg" alt="Avatar" className="w-14 h-14 md:w-20 md:h-20 rounded-full object-cover" />
              </div>
            </div>
          </div>
          {/* User info */}
          <div className="mt-12 md:mt-16 w-full flex flex-col items-center pb-1">
            <h2 className="font-heading text-xl md:text-2xl font-bold mb-0.5 text-center">Khadijah Muthmainah</h2>
            <div className="text-[#9B5398] font-inter text-sm md:text-base mb-0.5 text-center">@Khadee_123</div>
            <div className="text-[#3d203c] font-inter mb-1 text-center text-xs md:text-sm">Joined May 2025</div>
          </div>
          {/* Stats */}
          <div className="w-full flex flex-col gap-3 px-1 sm:px-3 pb-4">
            {/* Row 1: Streak & Lives */}
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              {/* Streak */}
              <div className="flex-1 bg-[#e2c6ff] rounded-2xl shadow-lg flex flex-row items-center px-6 py-4 min-w-[180px] border border-[#e6d2f7] transition-colors duration-150 hover:bg-[#d1a8f7] hover:shadow-xl cursor-pointer">
                <div className="flex items-center justify-center w-9 h-9 rounded-xl">
                  <img src="/streak.svg" alt="Streak" className="w-6 h-6" />
                </div>
                <div className="ml-4">
                  <span className="font-bold text-lg text-[#3d203c]">23</span>
                  <div className="text-[#3d203c] font-heading text-xs font-semibold leading-tight opacity-60">Streak</div>
                </div>
              </div>
              {/* Lives */}
              <div className="flex-1 bg-[#e2c6ff] rounded-2xl shadow-lg flex flex-row items-center px-6 py-4 min-w-[180px] border border-[#e6d2f7] transition-colors duration-150 hover:bg-[#d1a8f7] hover:shadow-xl cursor-pointer">
                <div className="flex items-center justify-center w-9 h-9 rounded-xl">
                  <img src="/lives.svg" alt="Lives" className="w-6 h-6" />
                </div>
                <div className="ml-4">
                  <span className="font-bold text-lg text-[#3d203c]">8</span>
                  <div className="text-[#3d203c] font-heading text-xs font-semibold leading-tight opacity-60">Lives</div>
                </div>
              </div>
            </div>
            {/* Row 2: Experience Coin & Leaderboard */}
            <div className="flex flex-row gap-3 w-full">
              {/* Experience Coin */}
              <div className="flex-1 bg-[#e2c6ff] rounded-2xl shadow-lg flex flex-row items-center px-6 py-4 min-w-[180px] border border-[#e6d2f7] transition-colors duration-150 hover:bg-[#d1a8f7] hover:shadow-xl cursor-pointer">
                <div className="flex items-center justify-center w-9 h-9 rounded-xl">
                  <img src="/experince.svg" alt="Experience Coin" className="w-6 h-6" />
                </div>
                <div className="ml-4">
                  <span className="font-bold text-lg text-[#3d203c]">25,000</span>
                  <div className="text-[#3d203c] font-heading text-xs font-semibold leading-tight opacity-60">Experience Coin</div>
                </div>
              </div>
              {/* Leaderboard */}
              <div className="flex-1 bg-[#e2c6ff] rounded-2xl shadow-lg flex flex-row items-center px-6 py-4 min-w-[180px] border border-[#e6d2f7] transition-colors duration-150 hover:bg-[#d1a8f7] hover:shadow-xl cursor-pointer">
                <div className="flex items-center justify-center w-9 h-9 rounded-xl">
                  <img src="/leaderboard.svg" alt="Leaderboard" className="w-6 h-6" />
                </div>
                <div className="ml-4">
                  <span className="font-bold text-lg text-[#3d203c]">89<small className="text-xs">/1000</small></span>
                  <div className="text-[#3d203c] font-heading text-xs font-semibold leading-tight opacity-60">Leaderboard</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}



export default function Page() {
  return (
    <Suspense fallback={<div></div>}>
      <ProfilePage />
    </Suspense>
  );
}