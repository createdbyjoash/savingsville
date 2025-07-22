"use client";
import React from "react";
import Sidebar from "../../../../components/Sidebar";
import Image from "next/image";
import Link from "next/link";

export default function InstructorDetailPage() {
  // Dummy data for instructor detail
  const instructor = {
    name: "Ms. Ada Okafor",
    bio: "Ms. Ada is passionate about helping kids become money-smart from an early age. With her bright smile and endless patience, she makes saving and budgeting fun for everyone. She believes that every child can be a money master with the right guidance and a little encouragement!",
    specialty: "Saving & Smart Spending",
    age: 32,
    achievements: [
      "Winner of the 'Young Educator of the Year' award (2023)",
      "Creator of the 'Piggy Bank Challenge' that helped over 10,000 kids start their first savings jar",
      "Featured guest on 'Smart Kids, Smart Money' radio show"
    ],
    tip: "Save first, spend later! Even a little bit saved today can grow into something big tomorrow",
    style: "Ms. Ada uses games, stories, and real-life examples to show how saving money can be exciting. She's always ready with a high-five and a word of encouragement for every effort, big or small.",
    funFacts: [
      "Can solve a Rubik's Cube in under a minute",
      "Loves baking cupcakes and often brings them to class",
      "Has a pet parrot named Penny who can say 'Save your money!'"
    ],
    img: "/ada.png"
  };

  return (
    <div className="flex min-h-screen bg-[#e6cafd]">
      <div className="sticky top-0 h-screen">
        <Sidebar />
      </div>
      <main className="flex-1 flex flex-col px-4 md:px-10 py-6 overflow-x-hidden">
        {/* Breadcrumb + Stats + Name */}
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-lg font-heading font-bold">
              <Image src="/home.svg" alt="Home" width={32} height={32} className="mr-2" />
              <Link href="/" className="text-[#7c3aed] opacity-60">Home</Link>
              <span className="mx-1 text-[#7c3aed] opacity-60">»</span>
              <span className="text-[#7c3aed] opacity-60">Extra</span>
              <span className="mx-1 text-[#7c3aed] opacity-60">»</span>
              <span className="text-black font-extrabold">Instructors</span>
            </div>
            <div className="flex items-center gap-6 text-lg font-bold">
            <span className="flex items-center gap-2">
              <Image src="/streak.svg" alt="Streak" width={22} height={22} />
              <span className="text-[#ffb300]">1</span>
            </span>
            <span className="flex items-center gap-2">
              <Image src="/lives.svg" alt="Lives" width={22} height={22} />
              <span className="text-[#ff5a7b]">4</span>
            </span>
            <span className="flex items-center gap-2">
              <Image src="/experince.svg" alt="Coins" width={22} height={22} />
              <span className="text-[#ffb300]">15</span>
            </span>
            </div>
          </div>
          <div className="font-heading font-extrabold text-3xl text-black mt-2 mb-4">{instructor.name}</div>
        </div>
        <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl mx-auto">
          {/* Main Info*/}
          <div className="flex flex-row gap-8 w-full">
            {/* Left Side: Main Info */}
            <div className="flex-1 flex flex-col gap-4 justify-start order-2 md:order-1">
              <div className="bg-[#a16ae8] rounded-2xl p-8 flex flex-col gap-6 shadow-lg h-full">
                <div className="font-heading font-bold text-base text-white mb-2">BIO</div>
                <div className="font-inter text-white text-base mb-4">{instructor.bio}</div>
                <div className="flex gap-4 items-center mb-4">
                  <span className="flex items-center gap-2 font-heading text-white text-lg drop-shadow font-extrabold">
                    <span>Specialty:</span>
                    <span className="font-inter font-semibold text-[#cbb6d6]">{instructor.specialty}</span>
                  </span>
                  <span className="flex items-center gap-2 font-heading text-white text-lg drop-shadow font-extrabold">
                    <span className="flex items-center"><Image src="/age.svg" alt="Age" width={32} height={32} className="drop-shadow-lg" /></span>
                    <span>Age:</span>
                    <span className="font-inter font-semibold text-[#cbb6d6]">{instructor.age}</span>
                  </span>
                </div>
                <div className="font-heading font-bold text-base text-white mb-2">ACHIEVEMENTS</div>
                <ul className="font-inter text-white text-base list-disc pl-6 mb-4">
                  {instructor.achievements.map((ach, i) => (
                    <li key={i}>{ach}</li>
                  ))}
                </ul>
                <div className="font-heading font-bold text-base text-white mb-2">FAVORITE MONEY TIP</div>
                <div className="font-inter italic text-white text-base mb-4">"{instructor.tip}"</div>
                <div className="font-heading font-bold text-base text-white mb-2">TEACHING STYLE</div>
                <div className="font-inter text-white text-base">{instructor.style}</div>
              </div>
            </div>
            {/* Right Side: Avatar + Fun Fact, vertical stack, centered */}
            <div className="flex flex-col gap-8 w-full md:w-[340px] items-center order-1 md:order-2">
              {/* Avatar */}
              <div className="bg-white rounded-2xl shadow-lg p-0 flex flex-col items-center w-full">
                <Image src={instructor.img} alt={instructor.name} width={300} height={300} className="rounded-[32px] object-cover w-full h-[300px]" style={{borderRadius: '32px'}} />
              </div>
              {/* Fun Fact Card with pointer */}
              <div className="relative w-full flex flex-col items-center">
                {/* Pointer */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <svg width="40" height="20" viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 0L40 20H0L20 0Z" fill="#e6d6fa" />
                  </svg>
                </div>
                <div className="bg-[#e6d6fa] rounded-2xl shadow-lg p-6 pt-8 w-full mt-4 flex flex-col items-start">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl">😆</span>
                    <span className="font-heading font-bold text-xl text-black">Fun fact</span>
                  </div>
                  <ul className="font-inter text-[#8c7fae] text-base list-disc pl-6">
                    {instructor.funFacts.map((fact, i) => (
                      <li key={i} className="mb-2">{fact}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
