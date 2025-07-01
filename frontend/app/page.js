"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import WhiteButton from "@/components/WhiteButton";
import AccentButton from "@/components/AccentButton";
import Input from "@/components/Input";
import { useState, useEffect, Suspense } from "react";
import { useParams } from "next/navigation";
import CreateAccountPopup from "./loginflow/CreateAccountPopup";
import UpdateUsernamePopup from "./loginflow/UpdateUsernamePopup";
import ConfirmEmailPopup from "./loginflow/ConfirmEmailPopup";
import { IoMdMenu } from "react-icons/io";
import Sidebar from "@/components/Sidebar2";
import { useSearchParams, useRouter } from "next/navigation";






const features = [
  {
    image: "/feature-image 1.png",
    caption: "Resource Library",
  },
  {
    image: "/feature-image 2.png",
    caption: "Financial Insights",
  },
  {
    image: "/feature-image 3.png",
    caption: "Security",
  },
  {
    image: "/feature-image 4.png",
    caption: "Have Fun",
  },
];

function Home() {
  const [signupStep, setSignupStep] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // const [pageIndex, setPageIndex] = useState(0);
  const searchParams = useSearchParams();
  const router = useRouter()


  const handleFormStep = (step) => {
  goToStep(step);
};

 useEffect(() => {
    const step = searchParams.get("signup");
    if (step === "step1") setSignupStep(step);
  }, [searchParams]);

  useEffect(() => {
    const step = searchParams.get("signup");
    if (step === "step4") {
      router.push("/onboarding");
    }
  }, [searchParams, router]);
  

const handleCloseSignup = () => {
  setSignupStep(null);
  const params = new URLSearchParams(window.location.search);
  params.delete('signup');
  window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
};

useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const step = params.get('signup');
  if (step) setSignupStep(step);
}, []);

const goToStep = (step) => {
  setSignupStep(step);
  const params = new URLSearchParams(window.location.search);
  params.set('signup', step);
  window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
};


  return (
    <main className="relative">
      <header className=" py-4 w-[80%] max-sm:w-[90%] mx-auto mt-5 font-heading font-bold flex justify-between items-center">
              <Link href="#" className="flex w-fit mt-3">
                <Image
                  src="/logo_icon.png"
                  alt="Logo"
                  width={10}
                  height={10}
                  className="my-auto max-lg:w-[60px] max-lg:h-[60px] w-[90px] h-[90px]"
                  unoptimized
                />
                <h1 className="max-sm:text-xl max-sm:pt-1 max-lg:mt-2 mt-5 font-heading font-bold text-3xl font-display text-center text-secondary ml-[-4px]">
                  Savingsville
                </h1>
              </Link>
    
              <button className="items-center max-h-[25px] max-w-[25px] h-full w-full  mr-0 ml-auto">
                <IoMdMenu onClick={() => setSidebarOpen(true)} className="hidden max-sm:block w-full h-full  text-secondary"/>
              </button>
    
              <div className="space-x-8 text-2xl">
                <Link href="#" className="max-lg:hidden opacity-40 hover:opacity-80 transition">
                  Analysis
                </Link>
                <Link href="#" className="max-lg:hidden opacity-40 hover:opacity-80 transition">
                  Tools
                </Link>
                <Link href="#" className="max-md:hidden opacity-40 hover:opacity-80 transition">
                  Forums
                </Link>
                <WhiteButton onClick={() => handleFormStep("step1")} label={"Get Started"} className="max-sm:hidden "/>
              </div>
    
              
              
            </header>
            <Sidebar isOpen={sidebarOpen} onSidebarClose={() => setSidebarOpen(false)}/>
      <div className="space-y-8 w-full lg:max-w-[1920px] mx-auto">
        

        <section className="max-sm:mt-8 max-sm:text-center md:px-[4em] lg:px-[7em] xl:px-[12em] w-full mx-auto max-sm:w-[95%]  mt-[5em]">
          <div className="flex justify-center items-center max-lg:gap-[4em] max-lg:flex-col lg:grid grid-cols-2">
            <div className="z-50">
              <h2 className="max-md:mt-0 text-4xl  lgxx:text-[3em] lgxx:mt-[-2.6em] font-heading font-bold leading-[1.2em] max-sm:max-w-[95%] max-w-[75%] md:max-w-[15em] xl:w-[13.5em] max-sm:mb-[1em] max-md:text-center md:text-center md:mb-[1em] lg:mb-0 md:text-[2.6em] lg:text-left mx-auto xl:ml-0">
                Savingsville <span className="text-[#00C7A8]">Your Path </span>
                 to Smart Money Moves
              </h2>
              <div className="cursor-pointer icon grid grid-cols-[80px_auto] rounded-3xl bg-[#ffffff59] shadow-lg mt-6 px-4 py-3 max-sm:w-full w-[29em] mx-auto lg:mx-0">
                <div className="my-auto h-[80px] w-[80px] flex relative justify center">
                  <Image
                    src="/image.png"
                    alt="Logo"
                    layout="fill"
                    className=""
                    unoptimized
                  />
                </div>
                <div className="my-auto mr-1">
                  <h2 className=" text-left md:text-2xl font-heading font-bold">
                    Interactive Budget Builder
                  </h2>
                  <p className="font-inter font-normal max-sm:text-sm text-left">
                    Customize and track your budget in real time.
                  </p>
                </div>
              </div>

              <div className="cursor-pointer icon grid grid-cols-[80px_auto] rounded-3xl bg-[#ffffff11] border-2 border-white max-sm:w-full w-[29em] mt-6 px-4 py-3 mx-auto lg:mx-0">
                <div className="my-auto h-[80px] w-[80px] flex relative justify center">
                  <Image
                    src="/image 2.png"
                    alt="Logo"
                    layout="fill"
                    className=""
                    unoptimized
                  />
                </div>
                <div className="my-auto mr-1">
                  <h2 className="text-left md:text-2xl font-heading font-bold">
                    Gamified Learning Modules
                  </h2>
                  <p className="font-inter font-normal max-sm:text-sm text-left">
                    Learn essential financial concepts through mini-games,
                    quizzes.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative grid w-full place-items-center">
              <div>
                <Image
                  src="/landing-page-avatar.png"
                  alt="Logo"
                  width={650}
                  height={650}
                  className="mt-[-6em]"
                  unoptimized
                />
              </div>

              <div className="absolute top-[50%] left-0 max-sm:left-0 lg:left-[20%] xl:left-[39%] cursor-pointer icon grid grid-cols-[80px_auto] rounded-3xl  w-[23em] max-sm:w-full px-4 py-3">
                <div className="z-40 my-auto h-[80px] w-[80px] flex relative justify center">
                  <Image
                    src="/image 3.png"
                    alt="Logo"
                    layout="fill"
                    className=""
                    unoptimized
                  />
                </div>

                <div className="z-40 my-auto mr-1">
                  <h2 className="text-left text-xl md:text-2xl font-heading font-bold">
                    Goal Tracker And Progress Dashboard
                  </h2>
                </div>

                <div className="z-10 absolute cursor-pointer grid grid-cols-[80px_auto] rounded-3xl w-[23em] h-[6.5em] px-4 py-3 shadow-md bg-white/10 backdrop-blur-xl border border-gray-300 max-sm:w-full"></div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid w-[90%] md:w-[80%] mx-auto py-[2em] max-sm:pb-0 items-center space-y-4">
          <h2 className="mx-auto font-baloo text-3xl md:text-4xl font-bold">
            Cool Features
          </h2>
          <p className="text-center mx-auto max-sm:max-w-[95%] md:max-w-[55%]">{`Whether you’re just starting your money journey or looking to sharpen your skills, Saving Ville! empowers you to make confident decisions, build healthy habits, and reach your goals-one cent at a time.`}</p>

          <div className="bg-white max-md:w-fit w-full mx-auto h-fit px-[5em] py-[2.5em] rounded-[2.4em] shadow-xl mt-5 flex flex-wrap gap-[1.8em] justify-between max-sm:flex-col max-md:flex-col">
            {features.map(({ image, caption }, index) => (
              <div className="md:mt-3 mt-0 grid space-y-3 place-items-center" key={index}>
                <Image
                  src={image}
                  alt="Logo"
                  height={150}
                  width={150}
                  className=""
                  unoptimized
                />
                <p className="text-center font-baloo font-bold text-xl md:text-2xl">
                  {caption}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-wrap md:grid grid-cols-[1.2fr_1fr] w-[80%] mx-auto py-8 max-sm:mb-5">
          <div>
            <Image
              src="/money-bag-image.png"
              alt="Logo"
              width={580}
              height={580}
              unoptimized
            />
          </div>

          <div className="h-fit my-auto space-y-4">
            <h2 className="text-3xl md:text-5xl leading-[1.2em] font-baloo font-bold">
              Turn Pennies into{" "}
              <span className="text-accent">Possibilities!</span>
            </h2>
            <p>{`Money doesn’t have to be boring! Saving Ville! transforms everyday cents into big wins with interactive tools, friendly challenges, and bite-sized lessons that make learning about money feel like a game.`}</p>
            <WhiteButton label={"Give it a try!"} onClick={() => handleFormStep("step1")}/>
          </div>
        </section>
      </div>

      <footer className="w-full px-[2em] py-[4em] lg:px-[6em] bg-secondary h-fit ">
        <div className="w-full lg:max-w-[2000px] flex gap-3 justify-between mx-auto flex-wrap max-sm:flex-col">
          <div className="my-auto w-[95%] md:w-[60%] space-y-3 max-sm:mx-auto">
            <h2 className="font-baloo text-3xl md:text-4xl font-bold text-secondary-dark max-sm:text-center">
              Unlock Your Financial Potential
            </h2>
            <p className="text-white opacity-70 font-inter max-sm:text-center">{`Discover how easy and enjoyable managing money can be. With Make Cent!, you’ll gain the knowledge, confidence, and tools you need to make informed choices, build lasting wealth, and turn your financial dreams into reality-no matter where you’re starting from.`}</p>
          </div>

          <AccentButton className="my-auto max-md:mt-4 max-sm:mx-auto" label={"Get Started!"} />
        </div>
      </footer>

      {signupStep === "step1" && <CreateAccountPopup handleFormStep={handleFormStep} />}

      {signupStep === "step2" && <UpdateUsernamePopup handleFormStep={handleFormStep} />}

      {signupStep === "step3" && <ConfirmEmailPopup handleFormStep={handleFormStep} />}

      
    </main>
    
  );
}


export default function Page() {
  return (
    <Suspense fallback={<div></div>}>
      <Home />
    </Suspense>
  );
}