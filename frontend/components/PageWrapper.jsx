"use client"
import React, { Suspense, useEffect } from 'react'
import Sidebar from '@/components/Sidebar'
import { usePathname, useRouter } from 'next/navigation'

function Dashboard({ page }) {
    const pathname = usePathname();
    const router = useRouter();

    // Parse pathname segments
    // Example pathname: /dashboard/course/lesson
    const segments = pathname.split('/').filter(Boolean); // ["dashboard", "course", "lesson"]

    // The first segment is "dashboard" (your base route)
    // The second segment is your active tab
    const activeTab = segments.length > 1 ? segments[0] : "home";

    function handleTabChange(newTab) {
        // Construct new URL path keeping "dashboard" as base
        // and replacing second segment with newTab
        const newSegments = [...segments];
        if (newSegments.length > 1) {
            newSegments[1] = newTab;
        } else {
            newSegments.push(newTab);
        }
        const newPath = '/' + newSegments.join('/');

        router.push(newPath);
    }

    useEffect(() => {
        console.log("Active Tab from Pathname:", activeTab);
    }, [activeTab]);

    return (
        <main className='grid xl:grid-cols-[18em_auto] h-screen w-full'>
            <Sidebar activeTab={activeTab} handleTabChange={handleTabChange}/>
            <div className='grid max-sm:px-4 px-[2.4em] pt-[3.4em] h-screen xl:overflow-y-hidden max-sm:pb-[20em]'>
                {page}
            </div>
        </main>
    )
}

export default function PageWrapper({ page }) {
  return (
    <Suspense fallback={<div></div>}>
      <Dashboard page={page}/>
    </Suspense>
  );
}
