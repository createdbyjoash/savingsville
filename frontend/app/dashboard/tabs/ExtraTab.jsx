import React from "react";
import ProfileHeader from "@/components/ProfileHeader";
import Image from "next/image";
import Link from "next/link";
import { TiArrowForward } from "react-icons/ti";

const options = [
  {id: 1,
    title: "Live Sessions",
    caption: "Jump in and keep your skills sharp!",
    background: "grid bg-[linear-gradient(45deg,_#9B5398,_#E4B2E2)]",
    imageUrl: "/live.svg"
  },

  {id: 2,
    title: "Instructors",
    caption: "Refresh what you’ve learned anytime",
    background: "grid bg-[linear-gradient(45deg,_#00C7A8,_#B1FEF2)]",
    imageUrl: "/instructor.svg"
  },

  {id: 3,
    title: "Parental Systems",
    caption: "Boost your knowledge with quick drills.",
    background: "grid bg-[linear-gradient(45deg,_#FFC526,_#FFE6A0)]",
    imageUrl: "/parental_system.svg"
  },

  {id: 4,
    title: "Budget Tracking",
    caption: "Explore handy guides and tips.",
    background: "grid bg-[linear-gradient(45deg,_#FFC526,_#FFE6A0)]",
    imageUrl: "/budget_tracking.svg"
  },

  {id: 5,
    title: "Settings",
    caption: "Jump in and keep your skills sharp!",
    background: "grid bg-[linear-gradient(45deg,_#EA2989,_#FFB1BD)]",
    imageUrl: "/sett.svg"
  },

  {id: 6,
    title: "Profile",
    caption: "Test yourself and track your progress!",
    background: "grid bg-[linear-gradient(45deg,_#9B5398,_#E4B2E2)]",
    imageUrl: "/profile.svg"
  },
]


export default function ExtraTab() {
  return (
    <div className="w-full h-screen space-y-5">
      <ProfileHeader />
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
        <Link href="#" className="text-black font-bold">Extra</Link>
      </div>
    <div className="flex h-screen flex-col gap-5 scrollbar-hide overflow-y-scroll pb-[14em]">
      

      



      <section className="grid grid-cols-4 gap-4 w-full">
        
        {options.map((items, index) => <div key={index} className={`grid ${items.background} shadow-md rounded-[2em] h-[19em] w-full bg-secondary px-6 pr-8 pb-[1.7em] pt-[4em] text-white`}>
          <div className="flex flex-col">
            <p className="w-fit font-baloo font-bold text-xl text-white">{items.title}</p>
            <p className="text-[0.9em]">{items.caption}</p>
            <div className="mb-0 mt-auto flex justify-between">
              <Image src={items.imageUrl} height={70} width={70} alt="image" />
            </div>
            
          </div>
          
        </div>)}
       
      </section>
    </div>
    </div>
  );
}
