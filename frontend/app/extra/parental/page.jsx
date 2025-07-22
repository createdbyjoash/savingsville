"use client";
import React, { useState, Suspense } from "react";
import Sidebar from "../../../components/Sidebar";
import Image from "next/image";

const stats = [
  { icon: "/assignment.svg", label: "Assignment", value: 3 },
  { icon: "/quiz.svg", label: "Quiz", value: 1 },
  { icon: "/courses.svg", label: "Courses", value: 5 },
  { icon: "/practice.svg", label: "Practice", value: 2 },
  { icon: "/game.svg", label: "Game", value: 3 },
];
const comms = [
  { icon: "/chat.svg", label: "Chat", value: 3 },
  { icon: "/email.svg", label: "Email", value: 1 },
];

function ParentalPage() {
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
      <main className="flex-1 flex flex-col px-4 md:px-10 py-6">
        {/* Breadcrumb + Stats */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-lg font-bold">
            <Image src="/home.svg" alt="Home" width={28} height={28} className="inline-block" />
            <span className="text-[#ffb300] font-bold">Home</span>
            <span className="mx-1 text-[#7c3aed]">»</span>
            <span className="text-[#7c3aed] font-bold">Extra</span>
            <span className="mx-1 text-[#7c3aed]">»</span>
            <span className="text-black font-bold">Parental System</span>
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
        <div className="flex items-center justify-between bg-gradient-to-r from-[#c08bfa] to-[#a16ae8] rounded-2xl px-8 py-8 mb-8">
          <div>
            <div className="font-extrabold text-2xl mb-1">Welcome, Super Parent! <span role='img' aria-label='star'>✨</span></div>
            <div className="text-[#8c7fae] font-medium text-base">Thanks for helping your child<br />become a money hero.</div>
          </div>
          <Image src="/parent.svg" alt="Parental" width={110} height={110} />
        </div>
        {/* Kid's Statistics */}
        <div className="font-bold text-base mb-2">Kid's Statistics</div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-6">
          {stats.map((item) => (
            <div key={item.label} className="bg-white rounded-2xl shadow p-4 flex flex-col items-center min-w-[110px]">
              <span className="font-extrabold text-2xl text-[#7c3aed] mb-1">{item.value}</span>
              <Image src={item.icon} alt={item.label} width={40} height={40} className="mb-1" />
              <span className="font-bold text-[#7c3aed] text-base text-center">{item.label}</span>
            </div>
          ))}
        </div>
        {/* Communication */}
        <div className="font-bold text-base mb-2">Communication</div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-4">
          {comms.map((item) => (
            <div key={item.label} className="bg-white rounded-2xl shadow p-4 flex flex-col items-center min-w-[110px]">
              <span className="font-extrabold text-2xl text-[#7c3aed] mb-1">{item.value}</span>
              <Image src={item.icon} alt={item.label} width={40} height={40} className="mb-1" />
              <span className="font-bold text-[#7c3aed] text-base text-center">{item.label}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}


export default function Page() {
  return (
    <Suspense fallback={<div></div>}>
      <ParentalPage />
    </Suspense>
  );
}