"use client"
import React, { use } from 'react'
import Input from "@/components/Input";
import AccentButton from "@/components/AccentButton";
import Image from "next/image";
import { IoMdArrowBack } from "react-icons/io";
import { useRouter } from 'next/navigation';


export default function ConfirmEmailPopup({
  handleFormStep,
  handlePrevPage,
  email,
  otp,
  setOtp,
  otpMutation
}) {

const handlePrev = () => {
  handleFormStep("step1");
};

  return (
    <>
          <div className="fixed bg-gray-600 top-0 bottom-0 left-0 right- w-full h-full opacity-50 z-[1050]"></div>
    
          <div className="grid place-items-center z-[1100] fixed left-auto right-auto top-0 bottom-0 w-full h-full">
            <div className="w-[90%] md:w-[60em] h-[35em] max-sm:h-fit bg-white max-sm:rounded-[1em]  rounded-[2.9em] shadow-xl md:grid grid-cols-2 flex flex-col">
              <div className="relative">
                <Image
                  src="/signup-image3.png"
                  alt="Login"
                  layout="fill"
                  unoptimized
                />
              </div>
              <div onClick={handlePrevPage} className="py-[3.5em] max-sm:py-[1.8em] max-sm:px-4 px-10">
                <button className="flex gap-1 items-center cursor-pointer text-2xl mb-8 font-baloo font-bold text-secondary" onClick={handlePrev}>
                  <IoMdArrowBack stroke="10" className="text-secondary my-auto" />{" "}
                  <span className="my-auto">Back</span>
                </button>
                <h3 className="font-bold">{`Confirm your email`}</h3>
                <p className="text-gray-700">{`Enter the verification code we emailed to:
${email}`}</p>
                <form className="grid space-y-3 max-sm:w-full w-[22em] mt-6" 
                        onSubmit={(e) => {
                  e.preventDefault();
                  otpMutation.mutate();
                }}>
                  <Input type="text" placeholder="Enter Code" value={otp} onChange={e => setOtp(e.target.value)} required />
                  <AccentButton
                    disabled={otpMutation.isPending}
                    loading={otpMutation.isPending}
                    type="submit"
                    label="Create My Account"
                    className="w-full mt-3"
                  />
                </form>
              </div>
            </div>
          </div>
        </>
  )
}
