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
    image: "/budgeting.png",
    alt: "Budgeting",
    label: "Budgeting",
  },
  {
    image: "/saving.png",
    alt: "Saving",
    label: "Saving",
  },
  {
    image: "/investing.png",
    alt: "investing",
    label: "Investing",
  },
  {
    image: "/crypto.png",
    alt: "cryptocurrency",
    label: "Cryptocurrency",
  },
  {
    image: "/credit.png",
    alt: "credit & loans",
    label: "Credit & Loans",
  },
  {
    image: "/earning.png",
    alt: "earning",
    label: "Earning",
  },
  {
    image: "/spending.png",
    alt: "spending smarter",
    label: "Spending Smarter",
  },
  {
    image: "/financial.png",
    alt: "financial planning",
    label: "Financial Planning",
  },
  {
    image: "/taxes.png",
    alt: "taxes",
    label: "Taxes",
  },
  {
    image: "/insurance.png",
    alt: "insurance",
    label: "Insurance",
  },
];
export default function Step2() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [error, setError] = useState("");
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
                    i === 2 ? "bg-secondary" : "bg-secondary opacity-35"
                  } h-[6px] w-[2.5em] rounded-md`}
                />
              ))}
            </span>
            <small className="text-secondary font-medium">3 of 6</small>
          </div>

          <h2 className="font-baloo font-bold max-sm:text-2xl text-4xl md:max-w-[15em] max-sm:w-[90vw]">
            Tell us {" "}
            <span className="text-secondary">a topic</span> you want to explore today?
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
            <WhiteButton label="Back" onClick={() => router.push(`?tab=2`)} />
            <AccentButton
              label="Continue"
              onClick={() => {
                if (activeIndex === null) {
                  alert("Please select a topic before continuing.");
                  return;
                }
                setError("");
                router.push(`?tab=4`);
              }}
            />
          </div>
          {error && <p className="text-red-500 font-medium mt-2">{error}</p>}
      </section>

      
    </main>
  );
}
