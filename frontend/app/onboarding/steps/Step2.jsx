"use client"
import React from 'react'
import { useState } from 'react';
import WhiteButton from "@/components/WhiteButton";
import AccentButton from "@/components/AccentButton";
import Image from "next/image";
import SquareButton from "@/components/SquareButton";
import { useRouter } from 'next/navigation';

const reasons = [
  {
    image: "/image.png",
    alt: "placeholder",
    label: "Core Money & Finance Interests",
  },
  {
    image: "/image 2.png",
    alt: "placeholder",
    label: "Lifestyle & Specialized Interests",
  },
  {
    image: "/image 3.png",
    alt: "placeholder",
    label: "Behavioral & Skill Interests",
  },
];

export default function Step2() {
const [activeIndex, setActiveIndex] = useState(null);
const router = useRouter();

  return (
    <main className="grid items-center xl:max-w-[1600px] mx-auto">
      <section className="grid min-[875px]:grid-cols-2 gap-2 lg:w-[85%] xl:w-[80%]  mx-auto w-[95%] my-auto h-[100vh]">
        <div className="max-[901px]:w-fit max-[901px]:mx-auto space-y-8 mt-[3.5em] max-sm:w-[90vw]">
          <div className="flex">
            <Image
              src="/logo_icon.png"
              alt="Logo"
              width={10}
              height={10}
              className="my-auto max-lg:w-[60px] max-lg:h-[60px] w-[50px] h-[50px]"
              unoptimized
            />
            <h1 className="max-sm:text-xl mt-2 font-heading font-bold text-xl font-display text-center text-secondary ml-[-4px]">
              Savingsville
            </h1>
          </div>

          <div className="space-y-2 w-fit">
            <span className="flex gap-2">
                {[...Array(6)].map((_, i) => (
                <div key={i} className={` ${i === 1 ? "bg-secondary" : "bg-secondary opacity-35"} h-[6px] w-[2.5em] rounded-md`} />
            ))}
            </span>
            <small className="text-secondary font-medium">2 of 6</small>
          </div>


          <h2 className="font-baloo font-bold max-sm:text-2xl text-4xl md:max-w-[15em] max-sm:w-[90vw]">
            Why are you learning about  <span className="text-secondary">money?</span>
          </h2>
          <div className="flex flex-col gap-4">
            {reasons.map((item, index) => (

<button onClick={() => {
                    console.log(index)
                    setActiveIndex(index)
                }} key={index} className={`cursor-pointer grid max-sm:grid-cols-[50px_auto] grid-cols-[80px_auto] rounded-3xl  border  max-sm:w-full md:w-[29em] max-md:w-full p-1 ${activeIndex === index ? "bg-secondary text-white border-[#fff0]" : "bg-[#ffffff11] text-black border-white"} max-md:mx-auto `}>
                            <div className="my-auto max-sm:h-[50px] max-sm:w-[50px] h-[80px] w-[80px] flex relative justify center">
                              <Image
                                src={item.image}
                                alt={item.alt}
                                layout="fill"
                                className=""
                                unoptimized
                              />
                            </div>
                            <div className="my-auto mr-1">
                              <h2 className="text-[1em] text-left w-fit md:text-2xl font-heading font-bold">
                                {item.label}
                              </h2>
                            </div>
                          </button>
            ))}
            
            
          </div>

          <div className="flex gap-3 w-fit">
            <WhiteButton label="Back" onClick={() => router.push(`?tab=1`)} />
            <AccentButton label="Continue" onClick={() => router.push(`?tab=3`)}/>
          </div>
        </div>

        <div className="max-[890px]:hidden max-md:hidden   grid w-full h-full place-items-center">
          <div className="grid min-[901px]:w-[60%] min-[950px]:w-[75%] h-[90%] relative object-cover items-center mx-auto  xl:min-h-[380px] ">
            <Image
              src="/onboarding-2.png"
              alt="onboarding"
              fill
              unoptimized
              className="object-cover rounded-[2em]"
            />
          </div>
        </div>
      </section>
    </main>
  )
}
