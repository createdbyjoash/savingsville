import React from "react";
import Image from "next/image";
import { PiNote } from "react-icons/pi";
import { FaLongArrowAltLeft } from "react-icons/fa";

const lessons = [
  { id: 1, title: "Get Started", completed: true, current: true },
  { id: 2, title: "Lesson 2", completed: false, current: false },
  { id: 3, title: "Lesson 3", completed: false, current: false },
  { id: 4, title: "Lesson 4", completed: false, current: false },
  { id: 5, title: "Lesson 5", completed: false, current: false },
  { id: 6, title: "Finish", completed: false, current: false },
];

const lessonsss = [
  {
    id: 1,
    topic: 3,
    currentlesson: 1,
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
];

export default function HomeTab() {
  return (
    <div className="w-full h-full flex flex-col gap-8">
      <section className="flex justify-between gap-3 items-center">
        <div className="flex gap-2 items-center">
          <div className="bg-white grid place-items-center h-15 w-15 rounded-full">
            <Image
              src="/profile.png"
              alt="Profile"
              width={64}
              height={64}
              className="rounded-full"
            />
          </div>
          <h1 className="text-3xl font-baloo font-bold">Hello 👋 , Khadija</h1>
        </div>

        <div className="flex gap-[1.5em] text-2xl items-center font-baloo font-bold">
          <div className="flex item-center gap-2 text-orange-400">
            <Image src={"/streak.svg"} alt="streak" height={30} width={30} />1
          </div>
          <div className="flex item-center gap-2 text-red-500">
            <Image src={"/lives.svg"} alt="streak" height={30} width={30} />4
          </div>
          <div className="flex item-center gap-2 text-yellow-500">
            <Image src={"/coin.svg"} alt="streak" height={30} width={30} />
            15
          </div>
        </div>
      </section>

      <section className="grid grid-cols-[50%_47%] w-full h-full gap-8">
        <section className=" w-full h-full">
          <div className="bg-secondary w-full h-fit p-6 rounded-2xl flex justify-between">
            <div className="space-y-2">
              <button className="font-baloo font-bold text-xl text-white/60 flex gap-2 items-center">
                <FaLongArrowAltLeft size={18} />
                TOPIC 3, LESSONS: 5
              </button>
              <p className="font-baloo font-bold text-white">
                Investing basics
              </p>
            </div>

            <button className="my-auto font-baloo font-bold text-white px-4 py-3 items-center h-fit shadow-xl border-2 border-[#ffffff6e] cursor-pointer bg-secondary rounded-xl flex gap-2">
              <PiNote size={24} />
              Get Started
            </button>
          </div>

          <div className="relative">



            <div className="relative mt-3 grid grid-cols-3 gap-[7vw]  h-fit place-items-center z-50">
            {lessons.map((lesson, index) =>
              lesson.current ? (
              <div className="flex flex-col gap-2 items-center  z-50" key={index}>
                  <button className="" key={index}>
                    <Image
                      src="/level.png"
                      alt={`Lesson ${lesson.id}`}
                      width={100}
                      height={100}
                      unoptimized
                      className="rounded-lg"
                    />
                  </button>
                  <div className="text-sm font-baloo font-bold w-fit">
                    {lesson.title}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-2 items-center z-50" key={index}>
                  <button className="" key={index}>
                    <Image
                      src="/level.png"
                      alt={`Lesson ${lesson.id}`}
                      width={100}
                      height={100}
                      unoptimized
                      className="rounded-lg"
                    />
                  </button>
                  <div className="text-sm font-baloo font-bold w-fit">
                    {lesson.title}
                  </div>
                </div>
              )
            )}

            <div className="z-20 absolute w-full h-full">
              <Image src={"/path.svg"} fill alt="image" className="mt-[-1.3em]"
              />
            </div>
          </div>




         {/* <div className="absolute w-full h-full top-0 z-40 grid grid-cols-3">
            <div className="grid  place-items-center h-full w-full items-center ">
              <hr className="border-t-3 border-gray-400 border-dashed w-[35%] mr-0 ml-auto"></hr>
            </div>

            {/*<div className="grid place-items-center h-full w-full  items-center">
              <hr className="border-t-3 border-gray-400 border-dashed w-full"></hr>
              
            </div>/}

            {/*<div className="grid place-items-center  rounded-br-lg h-full w-[90%] mb-0 mt-auto items-center">
              <hr className="border-[0px] h-[0px] border-gray-400 border-dashed w-1/2 ml-0 mr-auto opacity-0"></hr>
              <div className=" border-r-3 border-dashed w-full border-t-3 h-full border-gray-400 rounded-tr-lg mr-0 ml-auto"></div>
            </div>/}

            

             {/-----------------------------------------/}

             {/* <div className=" w-[56%] mr-2 ml-auto h-full "></div>
              <div className=" w-full h-full border-gray-400 border-b-3 mr-2 border-dashed"></div>
              <div className=" w-[90%] border-gray-400 ml-0 mr-auto h-full  border-b-3  border-r-3 rounded-br-lg border-dashed mt-[-0.1px]"></div>
             /}


            {/-----------------------------------------/}



            <div className="grid place-items-center h-[53.35%] w-[58%] border-t-3 border-b-3 border-gray-400 border-dashed border-l-3 rounded-tl-lg mt-[-0.14em] mr-0 ml-auto items-center ">
              {/*<hr className="border-2 border-gray-400 border-dashed w-1/2 mr-0 ml-auto"></hr>/}
            </div>

            <div className="grid place-items-center h-[6em] mt-[2em] w-full items-center">
              <hr className="border-2 border-gray-400 border-dashed w-full "></hr>
            </div>

            <div className="grid place-items-center h-[6em] mt-[2.5em] w-full items-center">
              <hr className="border-2 border-gray-400 border-dashed w-1/2 ml-0 mr-auto"></hr>
            </div>
            
            
          </div>*/}
          </div>
          
        </section>

        <section className="flex flex-col">
          <div className="flex gap-3 rounded-[0.9em] font-baloo font-bold px-[2em] py-[1em] text-2xl bg-[#ffffff5b] border-2 border-[#ffffff52] w-full h-fit">
            <Image src={ "/menu.svg"} alt="menu" height={28} width={28} />Topic</div>
        </section>
        
      </section>
    </div>
  );
}
