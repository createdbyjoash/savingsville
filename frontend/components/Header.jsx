"use client";
import React from 'react'
import WhiteButton from './WhiteButton'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { IoMdMenu } from 'react-icons/io';
import Sidebar from './Sidebar2';
import Image from 'next/image';
import CreateAccountPopup from '@/app/loginflow/CreateAccountPopup';
import UpdateUsernamePopup from '@/app/loginflow/UpdateUsernamePopup';
import ConfirmEmailPopup from '@/app/loginflow/ConfirmEmailPopup';
import { usePathname } from 'next/navigation';



export default function Header() {

    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [signupStep, setSignupStep] = useState(null);
    const pathname = usePathname(); 

    const hiddenRoutes = [
        '/onboarding'
    ];

    if (hiddenRoutes.includes(pathname)) return null;

    const handleFormStep = (step) => {
  goToStep(step);
};

useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const step = params.get('signup');
  if (step) setSignupStep(step);
}, []);

const goToStep = (step) => {
  setSignupStep(step);
  const params = new URLSearchParams(window.location.search);
  params.set('signup', step);
  window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
};
  return (
    <>
    <header className=" py-4 w-[80%] max-sm:w-[90%] mx-auto mt-5 font-heading font-bold flex justify-between items-center">
              <Link href="#" className="flex w-fit mt-3">
                <Image
                  src="/logo_icon.png"
                  alt="Logo"
                  width={10}
                  height={10}
                  className="my-auto max-lg:w-[60px] max-lg:h-[60px] w-[90px] h-[90px]"
                  unoptimized
                />
                <h1 className="max-sm:text-xl max-sm:pt-1 max-lg:mt-2 mt-5 font-heading font-bold text-3xl font-display text-center text-secondary ml-[-4px]">
                  Savingsville
                </h1>
              </Link>
    
              <button className="items-center max-h-[25px] max-w-[25px] h-full w-full  mr-0 ml-auto">
                <IoMdMenu onClick={() => setSidebarOpen(true)} className="hidden max-sm:block w-full h-full  text-secondary"/>
              </button>
    
              <div className="space-x-8 text-2xl">
                <Link href="#" className="max-lg:hidden opacity-40 hover:opacity-80 transition">
                  Analysis
                </Link>
                <Link href="#" className="max-lg:hidden opacity-40 hover:opacity-80 transition">
                  Tools
                </Link>
                <Link href="#" className="max-md:hidden opacity-40 hover:opacity-80 transition">
                  Forums
                </Link>
                <WhiteButton onClick={() => handleFormStep("step1")} label={"Get Started"} className="max-sm:hidden "/>
              </div>
    
              
              
            </header>
            <Sidebar isOpen={sidebarOpen} onSidebarClose={() => setSidebarOpen(false)}/>
                
            </>
  )
}
