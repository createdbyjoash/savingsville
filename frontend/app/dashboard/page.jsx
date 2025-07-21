"use client"
import React, { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import { useSearchParams, useRouter } from 'next/navigation'
import HomeTab from './tabs/HomeTab'
import AdvancedTab from './tabs/AdvancedTab'
import GoalsTab from './tabs/GoalsTab'
import TrackerTab from './tabs/TrackerTab'
import GamesTab from './tabs/GamesTab'
import ExtraTab from './tabs/ExtraTab'

export default function Dashboard() {
    const searchParams = useSearchParams();
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
    <main className='grid grid-cols-[18em_auto] h-screen  w-full'>
        <Sidebar handleTabChange={handleTabChange}/>
        <div className='grid px-[2.4em] pt-[3.4em] h-screen overflow-y-hidden'>
            {(!tab || tab === "home") && <HomeTab />}
            {tab === "advanced" && <AdvancedTab />}
            {tab === "goals" && <GoalsTab />}
            {tab === "tracker" && <TrackerTab />}
            {tab === "games" && <GamesTab />}
            {tab === "extra" && <ExtraTab />}
        </div>
    </main>
  )
}
