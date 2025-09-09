import React from 'react'
import Image from 'next/image'

export default function ProfileHeader({ username }) {
  return (
    <section className="flex flex-wrap justify-between gap-3 items-center">
            <div className="flex gap-2 items-center">
              <div className="bg-white grid place-items-center h-15 w-15 max-sm:max-w-[50px] max-sm:max-h-[50px] rounded-full">
                <Image
                  src="/profile.png"
                  alt="Profile"
                  width={64}
                  height={64}
                  className="rounded-full max-sm:max-w-[50px] max-sm:max-h-[50px] object-cover"
                />
              </div>
              <h1 className="max-sm:text-2xl text-3xl font-baloo font-bold">Hello 👋 , {username || ""}</h1>
            </div>
    
            <div className="hidden md:flex gap-[1.5em] text-2xl items-center font-baloo font-bold">
              <div className="flex item-center gap-2 text-orange-400">
                <Image src={"/streak.svg"} alt="streak" height={30} width={30} />0
              </div>
              <div className="flex item-center gap-2 text-red-500">
                <Image src={"/lives.svg"} alt="streak" height={30} width={30} />0
              </div>
              <div className="flex item-center gap-2 text-yellow-500">
                <Image src={"/coin.svg"} alt="streak" height={30} width={30} />
                0
              </div>
            </div>
          </section>
  )
}
