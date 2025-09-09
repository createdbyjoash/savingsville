import React from "react";
import ProfileHeader from "@/components/ProfileHeader";
import { useAuth } from "@/app/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { TiArrowForward } from "react-icons/ti";

const options = [
  {id: 1,
    title: "Practice Hub",
    caption: "Jump in and keep your skills sharp!",
    background: "grid bg-[linear-gradient(45deg,_#9B5398,_#E4B2E2)]",
    imageUrl: "/calender.png"
  },

  {id: 2,
    title: "Past Lessons",
    caption: "Refresh what you’ve learned anytime",
    background: "grid bg-[linear-gradient(45deg,_#00C7A8,_#B1FEF2)]",
    imageUrl: "/brain.png"
  },

  {id: 3,
    title: "Exercise",
    caption: "Boost your knowledge with quick drills.",
    background: "grid bg-[linear-gradient(45deg,_#FFC526,_#FFE6A0)]",
    imageUrl: "/human_brain.png"
  },

  {id: 4,
    title: "Resources",
    caption: "Explore handy guides and tips.",
    background: "grid bg-[linear-gradient(45deg,_#FFC526,_#FFE6A0)]",
    imageUrl: "/book.png"
  },

  {id: 5,
    title: "Practice Quiz",
    caption: "Jump in and keep your skills sharp!",
    background: "grid bg-[linear-gradient(45deg,_#EA2989,_#FFB1BD)]",
    imageUrl: "/question.png"
  },

  {id: 6,
    title: "Leaderboard",
    caption: "Test yourself and track your progress!",
    background: "grid bg-[linear-gradient(45deg,_#9B5398,_#E4B2E2)]",
    imageUrl: "/leaderboard.png"
  },
]


export default function AdvancedTab() {
  const { user } = useAuth();
  return (
    <div className="w-full h-screen space-y-5 pt-[3em] xl:pt-0">
      <ProfileHeader username={user?.name} />
      <div className="hidden lg:flex items-center gap-2 text-lg font-bold font-baloo">
        <Image
          src="/home.svg"
          alt="Home"
          width={28}
          height={28}
          className="inline-block"
        />
        <Link href="/dashboard?tab=home" className="text-secondary font-bold">Home</Link>
        <span className="mx-1">»</span>
        <Link href="#" className="text-black font-bold">Advanced</Link>
      </div>
    <div className="flex h-screen flex-col gap-5 scrollbar-hide overflow-y-scroll pb-[14em]">
      

      



      <section className="grid max-sm:grid-cols-1 max-md:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        
        {options.map((items, index) => <div key={index} className={`grid ${items.background} shadow-md rounded-[2em] max-md:h-[10em] md:h-[19em] w-full bg-secondary px-6 pr-8 pb-6 md:pb-[1.7em] max-md:pt-7 md:pt-[4em] text-white`}>
          <div className="flex flex-col">
            <p className="w-fit font-baloo font-bold text-xl text-white">{items.title}</p>
            <p className="text-[0.9em]">{items.caption}</p>
            <div className="mb-0 mt-auto flex justify-between">
              <button className="mb-0 mt-auto opacity-60 text-black w-fit flex items-center gap-2">open <TiArrowForward /></button>
              <Image src={items.imageUrl} height={70} width={70} alt="image" className="max-md:max-h-[50px] max-md:max-w-[50px]" />
            </div>
            
          </div>
          
        </div>)}
       
      </section>
    </div>
    </div>
  );
}
