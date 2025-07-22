"use client";
import React, { useState } from "react";
import Sidebar from "../../../components/Sidebar";
import Image from "next/image";
import Link from "next/link";

const instructors = [
  {
    id: "ada",
    name: "Ms. Ada Okafor",
    desc: "Savings and Smart Spending",
    img: "/ada.png",
    alt: "Ada",
  },
  {
    id: "tunde",
    name: "Mr Tunde",
    desc: "Entrepreneurship Guide",
    img: "/tunde.png",
    alt: "Tunde",
  },
  {
    id: "tayo",
    name: "Ms. Tayo",
    desc: "Investing Tutor",
    img: "/tayo.png",
    alt: "Tayo",
  },
];

export default function InstructorsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [rows, setRows] = useState([instructors]);

  const handleLoadMore = () => {
    setRows((prev) => [...prev, instructors]);
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
      <div className="sticky top-0 h-screen">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>
      <main className="flex-1 flex flex-col px-4 md:px-10 py-6 overflow-x-hidden">
        {/* Top bar: avatar, greeting, stats, breadcrumb */}
        <div className="flex flex-col gap-2 w-full max-w-5xl mx-auto mb-2">
          <div className="flex items-center gap-4">
            <Image src="/demo_profile.svg" alt="Avatar" width={44} height={44} className="rounded-full border-2 border-[#e6cafd] bg-white" />
            <span className="font-extrabold text-xl md:text-2xl text-black">Hello <span className="inline-block">👋</span>, Khadija</span>
            <div className="flex items-center gap-4 ml-auto">
              <span className="flex items-center gap-1 font-bold text-base text-[#ffb300]">
                <Image src="/streak.svg" alt="Streak" width={22} height={22} /> 1
              </span>
              <span className="flex items-center gap-1 font-bold text-base text-[#ff5a7b]">
                <Image src="/lives.svg" alt="Lives" width={22} height={22} /> 4
              </span>
              <span className="flex items-center gap-1 font-bold text-base text-[#ffb300]">
                <Image src="/experince.svg" alt="Coins" width={22} height={22} /> 15
              </span>
            </div>
          </div>
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-base font-extrabold mt-2">
            <Image src="/home.svg" alt="Home" width={24} height={24} />
            <span className="text-[#ffb300]">Home</span>
            <span className="mx-1 text-[#7c3aed]">»</span>
            <span className="text-[#7c3aed]">Extra</span>
            <span className="mx-1 text-[#7c3aed]">»</span>
            <span className="text-black">Instructors</span>
          </div>
        </div>
        {/* Banner gradient section */}
        <div className="w-full max-w-5xl mx-auto mb-8">
          <div className="relative w-full">
            <div className="absolute left-1/45 top-1/2 -translate-y-1/2 z-10">
              <Image src="/book_left.svg" alt="Book Left" width={250} height={250} className="drop-shadow-lg" style={{marginLeft: '-40px', marginTop: '-30px'}} />
            </div>
            <div className="absolute right-1/30 top-1/2 -translate-y-1/2 z-10">
              <Image src="/book_right.svg" alt="Book Right" width={200} height={200} className="drop-shadow-lg" style={{marginRight: '-40px', marginTop: '-30px'}} />
            </div>
            <div className="w-full rounded-2xl px-6 py-5 flex flex-col items-center justify-center" style={{background: "linear-gradient(90deg, #b16ae8 0%, #a16ae8 100%)"}}>
              <div className="font-heading font-bold text-2xl md:text-3xl text-white mb-0 text-center">Meet your Instructors</div>
              <div className="font-inter text-white/80 font-medium text-sm text-center mt-1 mb-0">Explore handy guides and tips.</div>
              <div className="w-full max-w-md mt-2 mb-0">
                <div className="relative w-full">
                  <input type="text" placeholder="Search" className="w-full pl-10 pr-4 py-2 rounded-xl border border-white/40 bg-white/20 text-white font-inter font-semibold focus:outline-none placeholder:text-white/70 text-base" />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2">
                    <Image src="/search.svg" alt="Search" width={20} height={20} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Tabs */}
        <div className="flex gap-3 mb-6">
          <button className="px-6 py-2 rounded-xl font-heading font-bold bg-[#a16ae8] text-white shadow">ALL</button>
          <button className="px-6 py-2 rounded-xl font-heading font-bold bg-[#f3e6ff] text-black shadow">POPULAR</button>
          <button className="px-6 py-2 rounded-xl font-heading font-bold bg-[#f3e6ff] text-black shadow">TOPICS</button>
        </div>
        {/* Instructor Cards */}
        <div className="flex flex-col gap-6 mb-8">
          {rows.map((row, idx) => (
            <div key={idx} className="flex flex-row gap-8 justify-center">
              {row.map((inst) => (
                <Link href="/extra/instructors/detail" key={inst.id} className="bg-white rounded-2xl shadow p-0 flex flex-col items-center w-[300px] min-w-[220px] max-w-[340px] overflow-hidden border border-[#e6d2f7] cursor-pointer transition hover:scale-[1.03] hover:shadow-xl" prefetch={false}>
                  <div className="w-full h-[180px] rounded-t-2xl overflow-hidden flex items-center justify-center" style={{background: 'linear-gradient(90deg, #f3e6ff 0%, #e6cafd 100%)'}}>
                    <Image src={inst.img} alt={inst.alt} width={300} height={180} className="object-cover w-full h-full" />
                  </div>
                  <div className="w-full px-4 py-1 flex flex-col items-center">
                    <div className="font-heading font-bold text-base text-black text-center mb-0">{inst.name}</div>
                    <div className="font-inter text-[#3d203c] text-sm text-center mt-0 mb-0">{inst.desc}</div>
                  </div>
                </Link>
              ))}
            </div>
          ))}
        </div>
        {/* Load More Button */}
        <div className="flex justify-center mb-4">
          <button
            className="bg-gradient-to-r from-[#00e38c] to-[#00c7a8] hover:from-[#00b86b] hover:to-[#00a97a] text-white font-heading font-bold text-lg px-8 py-3 rounded-full shadow-lg transition"
            onClick={handleLoadMore}
          >
            Load more
          </button>
        </div>
      </main>
    </div>
  );
}
