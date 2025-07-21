import React from 'react'
import Image from 'next/image'
import Link from 'next/link'


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
        <section className=" w-full h-screen  overflow-y-hidden pt-4 space-y-3">
            
            <p className='font-baloo font-bold text-2xl flex flex-col'>Course
            <span className='font-baloo font-bold text-5xl text-secondary'>Investing Basics</span>
            </p>
            <div className='text-white w-full h-[10em] bg-secondary rounded-2xl px-6 py-6 space-y-2'>
                <p className='font-baloo font-bold text-white opacity-60 text-xl'>Course Description</p>
                <p className='opacity-90'>{`Learn the basics of investing and what makes it special. Yow will also meet your friendly guide who will explain their approach to teaching investment.`}</p>
            </div>
        </section>

        <section></section>
      </section>
    </div>
  )
}
