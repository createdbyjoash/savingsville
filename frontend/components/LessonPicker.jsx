import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FaLongArrowAltLeft } from 'react-icons/fa'
import { PiNote } from 'react-icons/pi'

export default function LessonPicker({ lessons }) {
  return (
    <>
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
                                  <Link href="/home/course"
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
                                  </Link>
                                  <Link href="/home/course" className="hover:bg-[#ffffff5b] cursor-pointer text-sm font-baloo font-bold w-fit border border-[#49384b28] px-3 py-1.5 rounded-md shadow-md">
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
                                  <Link href="/home/course" className="cursor-pointer icon" key={index}>
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
                                  </Link>
                                  <Link href="/home/course" className="hover:bg-[#ffffff5b] cursor-pointer text-sm font-baloo font-bold w-fit bg-primary border border-[#49384b28] px-3 py-1.5 rounded-md shadow-md">
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
    </>
  )
}
