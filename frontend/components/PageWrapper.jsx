"use client"
import React, { Suspense, useEffect, useState } from 'react'
import Sidebar from '@/components/Sidebar'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import { RiMenu2Fill } from "react-icons/ri";
import Sidebar2 from '@/components/Sidebar2'

function Dashboard({ page }) {
    const pathname = usePathname();
    const router = useRouter();
    const segments = pathname.split('/').filter(Boolean);
    const activeTab = segments.length > 1 ? segments[0] : "home";
    const [sidebarOpen, setSidebarOpen] = useState(false);

    function handleTabChange(newTab) {
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
        <main className='relative grid xl:grid-cols-[18em_auto] max-sm:h-fit max-md:h-fit h-fit xl:h-screen w-full'>
            
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
            <Sidebar activeTab={activeTab} handleTabChange={handleTabChange}/>
            <div className='grid max-sm:px-4 px-[2.4em] md:pt-[3.4em] lg:pb-[15em] max-sm:h-fit max-md:h-fit h-fit  lg:h-screen overflow-y-hidden max-sm:pt-[0.2em]  max-sm:pb-[67em] md:pb-[35em]  max-md:pb-[64em]'>
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
