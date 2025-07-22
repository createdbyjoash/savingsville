import React, { Suspense} from "react";
import Image from "next/image";
import Link from "next/link";
import { PiNote } from "react-icons/pi";
import { FaLongArrowAltLeft } from "react-icons/fa";
import ProfileHeader from "@/components/ProfileHeader";
import { useSearchParams } from "next/navigation";
import CourseOverview from "./CourseOverview";


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
];

function HomeTab() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("state");


  return (
    <>
    {!tab && <div className="w-full h-screen flex flex-col gap-5 scrollbar-hide ">
      <ProfileHeader />

      <section className="grid grid-cols-[55%_42%] w-full gap-8">
        <section className=" w-full h-screen  overflow-y-hidden ">
          <div className="relative space-y-[2em] pb-[14em] h-screen overflow-y-scroll scrollbar-hide">
            {lessons.map(
              (
                { current, id, topic, currentLesson, title, modules },
                index
              ) => (
                <section key={index}>
                  <div
                    className={`${
                      currentLesson ? "bg-secondary" : "bg-accent"
                    } w-full h-fit p-6 rounded-2xl flex justify-between`}
                  >
                    <div className="space-y-2">
                      <button className="font-baloo font-bold text-xl text-white/60 flex gap-2 items-center">
                        <FaLongArrowAltLeft size={18} />
                        TOPIC {topic}
                        {currentLesson && `, LESSONS: ${currentLesson}`}
                      </button>
                      <p className="font-baloo font-bold text-white">{title}</p>
                    </div>

                    <button className="hover:bg-[#16161618]  transition my-auto font-baloo font-bold text-white px-4 py-3 items-center h-fit shadow-xl border-2 border-[#ffffff6e] cursor-pointer bg-[#fff1] rounded-xl flex gap-2">
                      <PiNote size={24} />
                      Get Started
                    </button>
                  </div>
                  <div className="relative mt-6 grid grid-cols-3 gap-[7vw]  h-fit place-items-center z-50">
                    {modules.map((lesson, index) =>
                      lesson.current ? (
                        <div
                          className="relative flex flex-col gap-2 items-center  z-50"
                          key={index}
                        >
                          <button
                            className="cursor-pointer icon z-50"
                            key={index}
                          >
                            <Image
                              src="/level.png"
                              alt={`Lesson ${lesson.id}`}
                              width={100}
                              height={100}
                              unoptimized
                              className="rounded-lg"
                            />
                          </button>
                          <Link href="http://localhost:3000/dashboard?tab=home&state=course_overview" className="hover:bg-[#ffffff5b] cursor-pointer text-sm font-baloo font-bold w-fit border border-[#49384b28] px-3 py-1.5 rounded-md shadow-md">
                            {lesson.title}
                          </Link>
                          {currentLesson && (
                            <div className="absolute border-5 z-10 border-secondary h-[6em] w-[6em] rounded-full top-[-0.2em]"></div>
                          )}
                        </div>
                      ) : (
                        <div
                          className="flex flex-col gap-2 items-center  z-50"
                          key={index}
                        >
                          <button className="cursor-pointer icon" key={index}>
                            <Image
                              src={
                                lesson.id === 6 ? "/treasure.png" : "/level.png"
                              }
                              alt={`Lesson ${lesson.id}`}
                              width={100}
                              height={100}
                              unoptimized
                              className="rounded-lg"
                            />
                          </button>
                          <Link href="http://localhost:3000/dashboard?tab=home&state=course_overview" className="hover:bg-[#ffffff5b] cursor-pointer text-sm font-baloo font-bold w-fit bg-primary border border-[#49384b28] px-3 py-1.5 rounded-md shadow-md">
                            {lesson.title}
                          </Link>
                        </div>
                      )
                    )}

                    <div className="z-20 absolute w-[90%] h-[90%]">
                      <Image
                        src={"/path.svg"}
                        fill
                        alt="image"
                        className="mt-[-1.3em]"
                      />
                    </div>
                  </div>
                </section>
              )
            )}
          </div>
        </section>

        <section className="flex flex-col gap-4 pb-[10em] h-screen overflow-y-scroll scrollbar-hide">
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

    {tab === "course_overview" && <CourseOverview />}
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