import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FaLongArrowAltLeft } from 'react-icons/fa'
import { MdLockOutline } from "react-icons/md";
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
                            } w-full h-fit p-6 max-sm:py-4 rounded-2xl flex flex-wrap justify-between`}
                          >
                            <div className="md:space-y-2">
                              <button className="font-baloo font-bold md:text-xl text-white/60 flex gap-2 items-center">
                                <FaLongArrowAltLeft size={18} />
                                TOPIC {topic}
                                <span className='block max-sm:hidden'>{currentLesson && `, LESSONS: ${currentLesson}`}</span>
                              </button>
                              <p className="font-baloo max-sm:text-[0.9em] font-bold text-white">{title}</p>
                            </div>
        
                            <button className="hover:bg-[#16161618]  transition my-auto font-baloo font-bold text-white px-4 max-sm:px-2 py-3 max-sm:py-2 items-center h-fit shadow-xl border-2 border-[#ffffff6e] cursor-pointer bg-[#fff1] rounded-xl max-sm:text-sm flex gap-2">
                              {currentLesson ? <PiNote size={24} />: <MdLockOutline size={20} />} 
                              {currentLesson ? "Get Started" : "Unlock" }
                            </button>
                          </div>
                          <div className="relative mt-6 grid grid-cols-3 gap-[7vw] max-sm:gap-[10vw]  h-fit place-items-center z-50">
                            {modules.map((lesson, index) =>
                              lesson.current ? (
                                <div
                                  className="relative max-sm:mb-4 flex flex-col gap-2 items-center  z-50"
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
                                      className="rounded-lg max-sm:max-w-[4em] max-sm:max-h-[4em]"
                                    />
                                  </Link>
                                  <Link href="/home/course" className="hover:bg-[#ffffff5b] cursor-pointer text-sm max-sm:text-[0.71em] items-center font-baloo font-bold w-fit border border-[#49384b28] px-3 max-sm:px-2 py-1.5 rounded-md shadow-md">
                                    {lesson.title}
                                  </Link>
                                  {currentLesson && (
                                    <div className="absolute border-5 max-sm:border-2 z-10 border-secondary h-[6em] w-[6em]  max-sm:max-w-[4.2em] max-sm:max-h-[4.2em] rounded-full max-sm:top-0 top-[-0.2em]"></div>
                                  )}
                                </div>
                              ) : (
                                <div
                                  className="flex flex-col gap-2 max-sm:mb-4  items-center  z-50"
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
                                      className="rounded-lg max-sm:max-w-[4em] max-sm:max-h-[4em]"
                                    />
                                  </Link>
                                  <Link href="/home/course" className="hover:bg-[#ffffff5b] cursor-pointer text-sm max-sm:text-[0.71em] items-center font-baloo font-bold w-fit bg-primary border border-[#49384b28] px-3 max-sm:px-2 py-1.5 rounded-md shadow-md">
                                    {lesson.title}
                                  </Link>
                                </div>
                              )
                            )}
        
                            <div className="z-20 absolute w-[90%] max-sm:w-[100%] h-[90%] max-sm:h-[100%] ">
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
