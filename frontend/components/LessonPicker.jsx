"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FaLongArrowAltLeft } from 'react-icons/fa'
import { MdLockOutline } from "react-icons/md";
import { PiNote } from 'react-icons/pi'
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/app/context/AuthContext'
import { truncateForMobile } from '@/utilities/utils'
import axios from 'axios'


export const fetchTopics = async (token) => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/topics`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });
    
    return res.data.data.topics; 
  } catch (error) {
    console.error("Failed to fetch topics:", error);
    throw new Error("Failed to fetch topics");
  }
};

export const fetchUserData = async (token) => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/me`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });
    
    return res.data; 
  } catch (error) {
    console.error("Failed to fetch topics:", error);
    throw new Error("Failed to fetch topics");
  }
};

export default function LessonPicker({ lessons }) {

  const { token } = useAuth()
  const [topics, setTopics] = useState(null)
  const [userData, setUserData] = useState(null);

  const { data: fetchedTopics, isLoading } = useQuery({
    queryKey: ["topics"],
    queryFn: () => fetchTopics(token),
    refetchOnWindowFocus: false,
  });

  const { data: fetchedUser, isUserLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => fetchUserData(token),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (fetchedTopics) {
      setTopics(fetchedTopics);
      console.log("topics: ", fetchedTopics)
    }
  }, [fetchedTopics]);


  useEffect(() => {
    if (fetchedUser) {
      setUserData(fetchedUser.data);
      console.log("user data: ", fetchedUser)
    }
  }, [fetchedUser]);

  return (
    <>
        <section className=" w-full h-screen  overflow-y-hidden ">
                  <div className="relative space-y-[2em] pb-[14em] h-screen overflow-y-scroll scrollbar-hide">
                    {topics && topics.map(
                      (topic, index) => {
                        var currentTopic = null
                        if (topic?._id === userData?.current_topic?._id) currentTopic = true
                       return (<section key={index}>
                          <div
                            className={`${
                              topic?._id === userData?.current_topic?._id ? "bg-secondary" : "bg-accent"
                            } w-full h-fit p-6 max-sm:py-4 rounded-2xl flex flex-wrap justify-between`}
                          >
                            <div className="md:space-y-2">
                              <button className="font-baloo font-bold md:text-xl text-white/60 flex gap-2 items-center">
                                <FaLongArrowAltLeft size={18} />
                                TOPIC {index + 1}
                                {/*<span className='block max-sm:hidden'>{currentTopic && `, LESSONS: ${/*currentLesson""}`}</span>*/}
                              </button>
                              <p className="font-baloo max-sm:text-[0.9em] font-bold text-white">{truncateForMobile(topic.title ?? "", 18)}</p>
                            </div>
        
                            <button className="hover:bg-[#16161618]  transition my-auto font-baloo font-bold text-white px-4 max-sm:px-2 py-3 max-sm:py-2 items-center h-fit shadow-xl border-2 border-[#ffffff6e] cursor-pointer bg-[#fff1] rounded-xl max-sm:text-sm flex gap-2">
                              {currentTopic ? <PiNote size={24} />: <MdLockOutline size={20} />} 
                              {currentTopic ? "Get Started" : "Unlock" }
                            </button>
                          </div>
                          <div className="relative mt-6 grid grid-cols-3 gap-[7vw] max-sm:gap-[10vw]  h-fit place-items-center z-50">
                            {topic && topic?.lessons?.map((lesson, index) =>
                            {
                              var currentLesson
                              if (lesson?._id === userData?.current_lesson?._id) currentLesson = true
                              return currentLesson ? (
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
                                      alt={`Lesson ${lesson._id}`}
                                      width={100}
                                      height={100}
                                      unoptimized
                                      className="rounded-lg max-sm:max-w-[4em] max-sm:max-h-[4em]"
                                    />
                                  </Link>
                                  <Link href="/home/course" className="hover:bg-[#ffffff5b] cursor-pointer text-sm max-sm:text-[0.71em] items-center font-baloo font-bold w-fit border border-[#49384b28] px-3 max-sm:px-2 py-1.5 rounded-md shadow-md">
                                    {`Lesson ${index + 1}`}
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
                                      alt={`Lesson ${lesson._id}`}
                                      width={100}
                                      height={100}
                                      unoptimized
                                      className="rounded-lg max-sm:max-w-[4em] max-sm:max-h-[4em]"
                                    />
                                  </Link>
                                  <Link href="/home/course" className="hover:bg-[#ffffff5b] cursor-pointer text-sm max-sm:text-[0.71em] items-center font-baloo font-bold w-fit bg-primary border border-[#49384b28] px-3 max-sm:px-2 py-1.5 rounded-md shadow-md">
                                    {`Lesson ${index + 1}`}
                                  </Link>
                                </div>
                              )}
                            )}
        
                            <div className="z-20 absolute w-[90%] max-sm:w-[100%] h-[90%] max-sm:h-[100%] ">
                              <Image
                                src={"/path.svg"}
                                fill
                                alt="image"
                                className="mt-[-1.3em] hidden"
                              />
                              <hr className='w-[85%] mx-auto border-dashed border-0 border-t-[4px] border-secondary mt-[2.5em]'></hr>
                            </div>
                          </div>
                        </section>)
                        }
                    )}
                  </div>
                </section>
    </>
  )
}
