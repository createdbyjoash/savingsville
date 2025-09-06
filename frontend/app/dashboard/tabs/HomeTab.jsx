import React, { Suspense} from "react";
import Image from "next/image";
import Link from "next/link";
import { PiNote } from "react-icons/pi";
import { FaLongArrowAltLeft } from "react-icons/fa";
import ProfileHeader from "@/components/ProfileHeader";
import LessonPicker from "@/components/LessonPicker";
import { useAuth } from "@/app/context/AuthContext";


const lessons = [
  {
    id: 1,
    topic: 1,
    title: "Investing Basics",
    currentLesson: 1,
    completed: false,
    current: true,
    modules: [
      { id: 1, title: "Get Started", completed: true, current: true },
      { id: 2, title: "Lesson 2", completed: false, current: false },
      { id: 3, title: "Lesson 3", completed: false, current: false },
      { id: 4, title: "Lesson 4", completed: false, current: false },
      { id: 5, title: "Lesson 5", completed: false, current: false },
      { id: 6, title: "Finish", completed: false, current: false },
    ],
  },

  {
    id: 2,
    topic: 2,
    title: "Cryptocurrency",
    currentLesson: null,
    completed: false,
    current: false,
    modules: [
      { id: 1, title: "Get Started", completed: true, current: true },
      { id: 2, title: "Lesson 2", completed: false, current: false },
      { id: 3, title: "Lesson 3", completed: false, current: false },
      { id: 4, title: "Lesson 4", completed: false, current: false },
      { id: 5, title: "Lesson 5", completed: false, current: false },
      { id: 6, title: "Finish", completed: false, current: false },
    ],
  },

  {
    id: 3,
    topic: 3,
    title: "Savings",
    currentLesson: null,
    completed: false,
    current: false,
    modules: [
      { id: 1, title: "Get Started", completed: true, current: true },
      { id: 2, title: "Lesson 2", completed: false, current: false },
      { id: 3, title: "Lesson 3", completed: false, current: false },
      { id: 4, title: "Lesson 4", completed: false, current: false },
      { id: 5, title: "Lesson 5", completed: false, current: false },
      { id: 6, title: "Finish", completed: false, current: false },
    ],
  },

  {
    id: 4,
    topic: 4,
    title: "Inflation",
    currentLesson: null,
    completed: false,
    current: false,
    modules: [
      { id: 1, title: "Get Started", completed: true, current: true },
      { id: 2, title: "Lesson 2", completed: false, current: false },
      { id: 3, title: "Lesson 3", completed: false, current: false },
      { id: 4, title: "Lesson 4", completed: false, current: false },
      { id: 5, title: "Lesson 5", completed: false, current: false },
      { id: 6, title: "Finish", completed: false, current: false },
    ],
  },

  {
    id: 5,
    topic: 5,
    title: "Inflation",
    currentLesson: null,
    completed: false,
    current: false,
    modules: [
      { id: 1, title: "Get Started", completed: true, current: true },
      { id: 2, title: "Lesson 2", completed: false, current: false },
      { id: 3, title: "Lesson 3", completed: false, current: false },
      { id: 4, title: "Lesson 4", completed: false, current: false },
      { id: 5, title: "Lesson 5", completed: false, current: false },
      { id: 6, title: "Finish", completed: false, current: false },
    ],
  },
  {
    id: 6,
    topic: 6,
    title: "Inflation",
    currentLesson: null,
    completed: false,
    current: false,
    modules: [
      { id: 1, title: "Get Started", completed: true, current: true },
      { id: 2, title: "Lesson 2", completed: false, current: false },
      { id: 3, title: "Lesson 3", completed: false, current: false },
      { id: 4, title: "Lesson 4", completed: false, current: false },
      { id: 5, title: "Lesson 5", completed: false, current: false },
      { id: 6, title: "Finish", completed: false, current: false },
    ],
  },
];

function HomeTab() {

  const { user } = useAuth()

  return (
    <>
    {<div className="w-full h-screen flex flex-col gap-5 scrollbar-hide pt-[3em] xl:pt-0 ">
      <ProfileHeader username={user?.name} />

      <section className="grid lg:grid-cols-[55%_42%] w-full gap-8 ">

        {/*Column 1 */}
        <LessonPicker lessons={lessons} />        

        {/*Column 2 */}
        <section className="hidden lg:flex flex-col gap-4 pb-[10em] h-screen overflow-y-scroll scrollbar-hide">
          <div className="flex gap-3 rounded-[0.9em] font-baloo font-bold px-[2em] py-[1em] text-2xl bg-[#ffffff5b] border-2 border-[#ffffff52] w-full h-fit">
            <Image src={"/menu.svg"} alt="menu" height={28} width={28} />
            Topic
            <button className="mr-0 ml-auto cursor-pointer drop-shadow-2xl">
              <Image
                src={"/dropdown.svg"}
                alt="menu"
                height={28}
                width={28}
                className="hover:text-secondary-dark"
              />
            </button>
          </div>

          <div className="space-y-3 rounded-[0.9em] px-[2em] py-[1em] bg-[#E2C6FF] border-2 shadow-md border-[#75757552] w-full h-fit">
            <p className="font-baloo font-bold ">Unlock leaderboard</p>
            <div className="grid grid-cols-[4em_auto] gap-2">
              <div className="relative h-[3.5em] w-[3.5em]">
                <Image src="/padlock.png" fill alt="image" />
              </div>
              <p className="opacity-40 my-auto">{`Complete 5 more modules to start competing!`}</p>
            </div>
          </div>

          <div className="space-y-3 rounded-[0.9em] px-[2em] py-[1em] bg-[#E2C6FF] border-2 shadow-md border-[#75757552] w-full h-fit">
            <div className="flex justify-between">
              <p className="font-baloo font-bold ">Daily Goals</p>
              <button className="cursor-pointer font-baloo font-bold  text-secondary underline hover:text-secondary-hover transition">
                view all
              </button>
            </div>

            <div className="grid grid-cols-[4em_auto] gap-3">
              <div className="relative h-[4em] w-[4em]">
                <Image src="/dartboard.png" fill alt="image" />
              </div>
              <div className="space-y-1.5">
                <p className="font-baloo font-bold">Earn 15xp</p>
                <div className="w-full h-[1.3em] bg-[#b1b1b1af] rounded-xl relative">
                  <div className="w-[90%] absolute h-[1.5em] bg-secondary text-[#3a0333] rounded-xl text-sm grid place-items-center">
                    14/15
                    <Image
                      src={"/coin.svg"}
                      alt="streak"
                      height={50}
                      width={50}
                      className="absolute right-[-0.5em]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3 rounded-[0.9em] px-[2em] py-[1em] bg-[#E2C6FF] border-2 shadow-md border-[#75757552] w-full h-fit">
            <p className="font-baloo font-bold ">Unlock new games</p>
            <div className="grid grid-cols-[4em_auto] gap-2">
              <div className="relative h-[3.5em] w-[3.5em]">
                <Image src="/gamepad.png" fill alt="image" />
              </div>
              <p className="opacity-40 my-auto">{`Complete 14 more modules to unlock new games!`}</p>
            </div>
          </div>

          <Image
            src="/penguin_2.png"
            unoptimized
            height={600}
            width={600}
            className="mx-auto max-h-[15em] max-w-[15em]"
            alt="image"
          />
        </section>
      </section>
    </div>}

    </>
  );
}


export default function Page() {
  return (
    <Suspense fallback={<div></div>}>
      <HomeTab />
    </Suspense>
  );
}