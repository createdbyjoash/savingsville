"use client";
import React from "react";
import { useState } from "react";
import WhiteButton from "@/components/WhiteButton";
import AccentButton from "@/components/AccentButton";
import Image from "next/image";
import SquareButton from "@/components/SquareButton";
import { useRouter } from "next/navigation";

const categories = [
  {
    image: "/spanish.png",
    alt: "Spanish",
    label: "Spanish",
  },
  {
    image: "/french.png",
    alt: "French",
    label: "French",
  },
  {
    image: "/english.png",
    alt: "English",
    label: "English",
  },
  {
    image: "/russian.svg",
    alt: "Russian",
    label: "Russian",
  },
  {
    image: "/italian.svg",
    alt: "Italian",
    label: "Italian",
  },
  {
    image: "/german.svg",
    alt: "German",
    label: "German",
  },
  {
    image: "/greek.svg",
    alt: "Greek",
    label: "Greek",
  },
  {
    image: "/chinese.svg",
    alt: "Chinese",
    label: "Chinese",
  },
  {
    image: "/indian.svg",
    alt: "Indian",
    label: "Indian",
  },
  {
    image: "/japanese.svg",
    alt: "Japanese",
    label: "Japanese",
  },
];
export default function Step5() {
  const [activeIndex, setActiveIndex] = useState(null);
  const router = useRouter();

  return (
    <main className="grid items-center xl:max-w-[1600px] mx-auto">
      <section className="grid gap-2 lg:w-[85%] xl:w-[80%]  mx-auto w-[95%] my-auto h-fit">
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
                <div
                  key={i}
                  className={` ${
                    i === 4 ? "bg-secondary" : "bg-secondary opacity-35"
                  } h-[6px] w-[2.5em] rounded-md`}
                />
              ))}
            </span>
            <small className="text-secondary font-medium">5 of 6</small>
          </div>

          <h2 className="font-baloo font-bold max-sm:text-2xl text-4xl md:max-w-[15em] max-sm:w-[90vw]">
            Which {" "}
            <span className="text-secondary">Language</span> Do You Prefer?
          </h2>
          <div className="flex max-md:w-full md:max-w-[85%] flex-wrap gap-3 w-fit md:gap-5  max-sm:mx-auto ">
                      {categories.map((item, index) => (
                          
                        
          
                        <SquareButton 
                          key={index}
                          image={item.image}
                          alt={item.alt}
                          label={item.label}
                          onClick={() => {
                              console.log(index)
                              setActiveIndex(index)
                          }}
                          active={activeIndex === index ? true : false}
                        />
                        
                      ))}
          
                      
                    </div>

                    

       
        </div>
        

      </section>

      <hr className="mt-[2em] border-white bg-white border-[1.4px]"></hr>

      <section className="lg:w-[85%] xl:w-[80%]  mx-auto w-[95%] py-[2em] my-auto h-fit">
        <div className="flex gap-3 w-full justify-between">
            <WhiteButton label="Back" onClick={() => router.push(`?tab=4`)} />
            <AccentButton
              label="Continue"
              onClick={() => router.push(`?tab=6`)}
            />
          </div>
      </section>

      
    </main>
  );
}
