"use client"
import React from "react";
import Input from "@/components/Input";
import AccentButton from "@/components/AccentButton";
import Image from "next/image";
import { IoMdArrowBack } from "react-icons/io";

export default function UpdateUsernamePopup({handleFormStep, usernameMutation, username, setUsername}) {

    const handleNext = (e) => {
      e.preventDefault();
      if (!username) {
        alert("Please enter a username.");
        return;
      }
      handleFormStep("step3");
    };

const handlePrev = () => {
  handleFormStep("step2");
};


    
    
  return (
    <>
      <div className="fixed bg-gray-600 top-0 bottom-0 left-0 right- w-full h-full opacity-50 z-[1050]"></div>

      <div className="grid place-items-center z-[1100] fixed left-auto right-auto top-0 bottom-0 w-full h-full">
        <div className="w-[90%] md:w-[60em] h-[35em] max-sm:h-fit bg-white max-sm:rounded-[1em] rounded-[2.9em] shadow-xl md:grid grid-cols-2 flex flex-col">
          <div className="relative">
            <Image
              src="/signup-image2.png"
              alt="Login"
              layout="fill"
              unoptimized
            />
          </div>
          <div  className="py-[3.5em] max-sm:py-[1.8em] max-sm:px-4 px-10">
            {/*<button className="flex gap-1 items-center cursor-pointer text-2xl mb-8 font-baloo font-bold text-secondary" onClick={handlePrev}>
              <IoMdArrowBack stroke="10" className="text-secondary my-auto" />{" "}
              <span className="my-auto">Back</span>
            </button>*/}
            <h3 className="font-bold">{`Get your profile started!`}</h3>
            <p className="text-gray-700">{`Add a username that’s unique to you! this is how you will appear to others.`}</p>
            <form className="grid space-y-3 max-sm:w-full w-[22em] mt-6" onSubmit={(e) => {
          e.preventDefault();
          usernameMutation.mutate();
        }}>
              <Input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
              <small className="text-gray-600 text-center mx-auto">
                Build trust by using your full name or business name
              </small>
              <AccentButton
              disabled={usernameMutation.isPending}
              loading={usernameMutation.isPending}
                type="submit"
                label="Create My Account"
                className="w-full mt-3"
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
