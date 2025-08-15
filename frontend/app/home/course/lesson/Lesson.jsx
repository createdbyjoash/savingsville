import Image from "next/image";
import Link from "next/link";
import React from "react";
import VideoPlayer from "@/components/VideoPlayer";
import { CgPlayTrackPrev, CgPlayTrackNext } from "react-icons/cg";
import { RiSendPlaneFill } from "react-icons/ri";
import AutoResizeTextarea from "@/components/AutoResizeTextarea";
import Comment from "@/components/Comment";

const comments = [
  {
    profileUrl: "/instructor.png",
    comment: "What do you guys think?",
    user: "Micheal B Jordan"
  },
  {
    profileUrl: "/ada.png",
    comment: "Very insightfull, thank you!",
    user: "Eve Boyle"
  },
  {
    profileUrl: "/teen.png",
    comment: "Can we have more of this?",
    user: "Cathy Smith"
  },
  {
    profileUrl: "/tayo.png",
    comment: "hmnnn...",
    user: "Lola Stone"
  }
]

export default function Lesson() {
  return (
    <div className="w-full h-screen space-y-5 max-sm:pt-[3.5em] max-md:pt-[2em] md:pt-[2.4em] lg:pt-[3em] xl:pt-0">
      <div>
        <div className="max-sm:hidden flex flex-wrap items-center gap-2 text-lg font-bold font-baloo">
          <Image
            src="/home.svg"
            alt="Home"
            width={28}
            height={28}
            className="inline-block"
          />
          <Link href="/dashboard?tab=home" className="text-secondary font-bold">
            Home
          </Link>
          <span className="mx-1">»</span>
          <Link href="/home/course" className=" font-bold text-secondary">
            Browse lesson
          </Link>
          <span className="mx-1">»</span>
          <Link href="#" className="text-black font-bold">
            Investing basics
          </Link>
        </div>

        <section className="md:pb-[10em] w-full max-md:h-fit max-sm:h-fit h-fit xl:h-screen   grid">
        <section className="w-full lg:h-screen  mt-7 grid lg:grid-cols-[62%_35%] gap-6 scrollbar-hide">

          {/*First Column */}
          <section className="flex flex-col  lg:pb-[14em] max-sm:h-fit max-md:h-fit md:h-fit lg:h-screen overflow-y-scroll scrollbar-hide">
            
              <VideoPlayer src="/test video.mp4" />

              <section className="mr-0 ml-auto mb-5 w-fit max-sm:w-full justify-between mt-5 flex gap-4">
                <button className="shadow-md text-secondary border border-[#62226436] px-4 py-2 rounded-md hover:bg-white/40 transition font-baloo font-bold cursor-pointer flex gap-1 items-center justify-center">
                  <CgPlayTrackPrev size={25} className="" />
                  Previous
                </button>

                <button className="bg-secondary flex gap-1 text-white px-4 py-2 rounded-md font-baloo font-bold items-center hover:bg-secondary-medium cursor-pointer shadow-md">
                  Next
                  <CgPlayTrackNext size={25} className="" />
                </button>
              </section>

              <section className="max-sm:space-y-1 space-y-4 max-sm:mt-2">
                <h2 className="font-baloo font-bold max-sm:text-3xl text-5xl text-secondary">
                  Investing Basics
                </h2>
                <p className="text-secondary-dark opacity-80">{`Investing is simply putting your money to work with the goal of growing it over time. While it might sound complicated, you don’t need to be a math whiz or a financial expert to get started. The key is understanding the different types of investments—like cash, bonds, and stocks—and how each one offers its own mix of risks and rewards. Think of investing as climbing a ladder: At the bottom are the safest options, like savings accounts and cash, which keep your money secure but usually grow slowly. Next up are bonds, where you lend money to a company or government in exchange for regular interest payments.`}</p>
              </section>
            
          </section>

          {/*Second Column */}
           <section className="pb-[14em] space-y-4 h-screen lg:overflow-y-scroll scrollbar-hide">
            <div className="flex gap-1 rounded-[0.9em] px-3 py-[1em] bg-secondary border-2 shadow-md border-[#75757552] w-full h-fit">
                      <Image
                      src="/comment.png"
                      unoptimized
                      height={65}
                      width={65}
                     
                      alt="image"
                    />
                      <div>
                        <p className="font-baloo font-bold text-2xl text-white opacity-70">Comments</p>
                      <p className=" text-white my-auto text-[0.95em]">{`Overall comments from users`}</p>
                      </div>
                    </div>

                    <Comment 
                      imageUrl={"/instructor.png"} 
                      mainText={"Micheal B Jordan"} 
                      label={"Instructor"} 
                    />
                    

                    <div className="flex flex-col w-full rounded-2xl max-h-[240px] overflow-hidden backdrop-blur bg-white/60 border-2 border-[#ad46b185] shadow-xl ">
                     <AutoResizeTextarea maxHeight="240px"/>
                     <button className="bg-white w-fit p-2.5 rounded-md shadow-md border mr-4 ml-auto mb-4 mt-[-2em] border-[#62226436] hover:bg-secondary-medium text-secondary hover:text-white transition cursor-pointer">
                      <RiSendPlaneFill size={24} />
                     </button>
                    
                      
                    </div>

                    <h3 className="text-2xl font-baloo font-bold mt-7">Comments</h3>

                    <section className="space-y-3">
                      {comments.map((item, index) => (
                        <Comment 
                          key={index}
                          imageUrl={item.profileUrl} 
                          mainText={item.user} 
                          label={item.comment} 
                        />
                      ))}
                    </section>     
                  </section>
        </section>
        </section>
      </div>
    </div>
  );
}
