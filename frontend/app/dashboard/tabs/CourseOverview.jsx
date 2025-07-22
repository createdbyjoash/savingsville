import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { PiNote } from 'react-icons/pi'

export default function CourseOverview() {
  return (
    <div className="w-full h-screen space-y-5">
        <div className="flex items-center gap-2 text-lg font-bold font-baloo">
        <Image
          src="/home.svg"
          alt="Home"
          width={28}
          height={28}
          className="inline-block"
        />
        <Link href="/dashboard?tab=home" className="text-secondary font-bold">Home</Link>
        <span className="mx-1">»</span>
        <Link href="#" className="text-black font-bold">Browse lesson</Link>
      </div>


      <section className="grid grid-cols-[55%_42%] w-full gap-8">
        <section className=" w-full h-screen  overflow-y-hidden pt-4 space-y-4">
            
            <p className='font-baloo font-bold text-2xl flex flex-col'>Course
            <span className='font-baloo font-bold text-5xl text-secondary'>Investing Basics</span>
            </p>
            <div className='text-white w-full h-fit bg-secondary rounded-2xl px-6 py-6 space-y-2'>
                <p className='font-baloo font-bold text-white opacity-60 text-xl'>Course Description</p>
                <p className='opacity-90'>{`Learn the basics of investing and what makes it special. Yow will also meet your friendly guide who will explain their approach to teaching investment.`}</p>

            <div className='flex gap-5 my-6'>
                <div className='flex gap-2'>
                    <div className='bg-white h-8 w-8 rounded-full'></div>
                    <p className='font-baloo font-bold my-auto'>Instructor Nicholas</p>
                </div>

                <div className='flex gap-2'>
                    <div className='bg-white h-8 w-8 rounded-full'></div>
                    <p className='font-baloo font-bold my-auto'>7.5mins</p>
                </div>
            </div>

            <hr className=' mb-4 border-t-[0.12em] opacity-60 border-dashed'></hr>
            <div className='flex justify-between'>
                <p className='font-baloo font-bold my-auto'>Earn the following perks:</p>
                <div className="flex gap-[1.2em] text-2xl items-center font-baloo font-bold">
                              <div className="flex item-center gap-2 opacity-90">
                                <Image src={"/streak.svg"} alt="streak" height={30} width={30} />1
                              </div>
                              <div className="flex item-center gap-2 opacity-90">
                                <Image src={"/lives.svg"} alt="streak" height={30} width={30} />4
                              </div>
                              <div className="flex item-center gap-2 opacity-90">
                                <Image src={"/coin.svg"} alt="streak" height={30} width={30} />
                                15
                              </div>
                            </div>
            </div>
            <hr className=' mt-4 border-t-[0.12em] opacity-60 border-dashed'></hr>

            <div className='flex mt-6 gap-3'>
            <button className="hover:bg-[#16161618]  transition my-auto font-baloo font-bold text-white px-4 py-3 items-center h-fit shadow-xl border-2 border-[#ffffff6e] cursor-pointer bg-[#fff1] rounded-xl flex gap-2">
                                  <PiNote size={24} />
                                  Get Started
                                </button>
                                <p className='my-auto opacity-95'>5 Lessons</p>
            </div>
                

            </div>
        </section>

        <section></section>
      </section>
    </div>
  )
}
