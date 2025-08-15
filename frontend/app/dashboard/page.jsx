"use client"
import React, { Suspense, useState } from 'react'
import Sidebar from '@/components/Sidebar'
import { useSearchParams, useRouter } from 'next/navigation'
import HomeTab from './tabs/HomeTab'
import AdvancedTab from './tabs/AdvancedTab'
import GoalsTab from './tabs/GoalsTab'
import TrackerTab from './tabs/TrackerTab'
import GamesTab from './tabs/GamesTab'
import ExtraTab from './tabs/ExtraTab'
import { RiMenu2Fill } from "react-icons/ri";
import Image from 'next/image'
import Sidebar2 from '@/components/Sidebar2'

 function Dashboard() {
    const searchParams = useSearchParams();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const tab = searchParams.get("tab");
    const router = useRouter();

    function handleTabChange(newTab) {
        const url = new URL(window.location.href);
        if (newTab) {
            url.searchParams.set("tab", newTab);
        } else {
            url.searchParams.delete("tab");
        }
        router.push(url.pathname + url.search);
    }

  return (
    <main className='grid xl:grid-cols-[18em_auto] h-screen  w-full'>
      <header className='bg-primary w-full fixed top-0 bottom-auto z-[5000] px-4 md:px-[2em] pt-6 pb-1 xl:hidden flex justify-between gap-3'>
                      
                      <div className='flex items-center'>
                          <Image src="/logo_icon.png" alt="Logo" height={100} width={100} className="w-13 h-13" />
                          <span className="font-heading text-xl mt-[-0.1em] font-bold text-[#9B5398] tracking-tight">Savingsville</span>
                      </div>
                      <button onClick={() => setSidebarOpen(true)} className='mr-3 ml-auto'>
                          <RiMenu2Fill size={22} className='mt-[-0.5em] text-secondary-medium' />
                      </button>
                  </header>
                  <Sidebar2 isOpen={sidebarOpen} onSidebarClose={() => setSidebarOpen(false)}/>
        <Sidebar activeTab={tab} handleTabChange={handleTabChange}/>
        <div className='grid px-4 md:px-[2.4em] pt-[3.4em] h-screen overflow-y-hidden'>
            {(!tab || tab === "home") && <HomeTab />}
            {tab === "advanced" && <AdvancedTab/>}
            {tab === "goals" && <GoalsTab />}
            {tab === "tracker" && <TrackerTab />}
            {tab === "games" && <GamesTab />}
            {tab === "extra" && <ExtraTab />}
        </div>
    </main>
  )
}

export default function Page() {
  return (
    <Suspense fallback={<div></div>}>
      <Dashboard />
    </Suspense>
  );
}