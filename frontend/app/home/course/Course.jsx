"use client"
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PiNote } from "react-icons/pi";

const filter = [
  { id: 0, label: "ALL LESSONS" },
  { id: 1, label: "NOT STARTED" },
  { id: 2, label: "COMPLETED" },
  { id: 3, label: "PENDING" },
];
export default function Course() {
  const [activeFilter, setActiveFilter] = useState(0);
  return (
    <div className="w-full h-screen space-y-5 max-sm:pt-[3em] ">
      <div className="flex items-center gap-2 text-lg font-bold font-baloo">
        <Image
          src="/home.svg"
          alt="Home"
          width={28}
          height={28}
          className="inline-block"
        />
        <Link href="/dashboard?tab=home" className="text-secondary font-bold">
          Home
        </Link>
        <span className="mx-1">»</span>
        <Link href="#" className="text-black font-bold">
          Browse lesson
        </Link>
      </div>

      <section className="grid lg:grid-cols-[55%_42%] w-full gap-8">

        {/*Column 1 */}
        <section className=" w-full h-fit lg:h-screen  overflow-y-hidden ">
          <div className="relative space-y-4 lg:pb-[8.5em] h-fit lg:h-screen overflow-y-scroll scrollbar-hide">
            <p className="font-baloo font-bold max-sm:text-xl text-2xl flex flex-col">
              Course
              <span className="font-baloo font-bold max-sm:text-3xl text-5xl text-secondary">
                Investing Basics
              </span>
            </p>
            <div className="text-white w-full h-fit bg-secondary rounded-2xl px-6 py-6 space-y-2">
              <p className="font-baloo font-bold text-white opacity-60 text-xl">
                Course Description
              </p>
              <p className="opacity-90">{`Learn the basics of investing and what makes it special. Yow will also meet your friendly guide who will explain their approach to teaching investment.`}</p>

              <div className="flex flex-wrap gap-5 my-6">
                <div className="flex  gap-2">
                  <div className="bg-white h-8 w-8 rounded-full items-center">
                    <Image src={"/profile 3.png"} width={100} height={100} className="max-w-8 max-h-8"alt="image"/>
                  </div>
                  <p className="font-baloo font-bold my-auto">
                    Instructor Nicholas
                  </p>
                </div>

                <div className="flex gap-2">
                  <Image src="/time.png" alt="image" height={35} width={35} />
                  <p className="font-baloo font-bold my-auto">7.5mins</p>
                </div>
              </div>

              <hr className=" mb-4 border-t-[0.12em] opacity-60 border-dashed"></hr>
              <div className="flex flex-wrap justify-between">
                <p className="font-baloo font-bold my-auto">
                  Earn the following perks:
                </p>
                <div className="flex gap-[1.2em] text-2xl items-center font-baloo font-bold">
                  <div className="flex item-center gap-2 opacity-90">
                    <Image
                      src={"/streak.svg"}
                      alt="streak"
                      height={30}
                      width={30}
                    />
                    1
                  </div>
                  <div className="flex item-center gap-2 opacity-90">
                    <Image
                      src={"/lives.svg"}
                      alt="streak"
                      height={30}
                      width={30}
                    />
                    4
                  </div>
                  <div className="flex item-center gap-2 opacity-90">
                    <Image
                      src={"/coin.svg"}
                      alt="streak"
                      height={30}
                      width={30}
                    />
                    15
                  </div>
                </div>
              </div>
              <hr className=" mt-4 border-t-[0.12em] opacity-60 border-dashed"></hr>

              <div className="flex mt-6 gap-3">
                <Link href="/home/course/lesson" className="hover:bg-[#16161618]  transition my-auto font-baloo font-bold text-white px-4 py-3 items-center h-fit shadow-xl border-2 border-[#ffffff6e] cursor-pointer bg-[#fff1] rounded-xl flex gap-2">
                  <PiNote size={24} />
                  Get Started
                </Link>
                <p className="my-auto opacity-95">5 Lessons</p>
              </div>
            </div>

            <section>
              <p className="font-baloo font-bold">FILTER</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {filter.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveFilter(index)}
                    className={` ${index === activeFilter ? "bg-secondary text-white" : ""} transition cursor-pointer font-baloo font-bold border-[#75757552] border rounded-lg text-sm px-3 py-2 shadow-md`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </section>


            <div className=" rounded-[0.9em] px-[2em] py-[1em] bg-[#E2C6FF] border-2 shadow-md border-[#75757552] w-full h-fit">
              <p className="font-baloo my-auto font-bold flex gap-2"><Image
                      src={"/invest.png"}
                      alt="streak"
                      height={30}
                      width={30}
                    /> <span className="my-auto">What investment means</span></p>
            <p className="opacity-40 my-auto">{`What is investment? How is it different from traditional business? What makes it special?`}</p>
          </div>


          </div>
        </section>


        {/*Column 2 */}
        <section className="pb-[10em] h-screen lg:overflow-y-scroll scrollbar-hide">
          <div className="space-y-3 rounded-[0.9em] px-[2em] py-[1em] bg-[#E2C6FF] border-2 shadow-md border-[#75757552] w-full h-fit">
            <p className="opacity-40 my-auto">{`It can be hard to stay motivated so... Make cent is designed to be fun like a game!`}</p>
          </div>

          <Image
            src="/penguin_3.png"
            unoptimized
            height={600}
            width={600}
            className="mx-auto max-h-[15em] mt-6 max-w-[15em]"
            alt="image"
          />

          <div className="flex gap-1 rounded-[0.9em] px-3 py-[1em] bg-secondary border-2 shadow-md border-[#75757552] w-full h-fit">
            <Image
            src="/cartoon_file.png"
            unoptimized
            height={60}
            width={60}
           
            alt="image"
          />
            <div>
              <p className="font-baloo font-bold text-2xl text-white opacity-70">Progress</p>
            <p className=" text-white my-auto text-[0.95em]">{`Your overall progress report`}</p>
            </div>
          </div>


          <Image
            src="/speedometer.png"
            unoptimized
            height={500}
            width={500}
            className="mx-auto max-h-[12em] max-w-[12em] mt-9"
            alt="image"
            
          />

          <p className="text-center font-baloo font-bold text-3xl mt-[-2em]">2 OF 6</p>
        </section>
      </section>
    </div>
  );
}
