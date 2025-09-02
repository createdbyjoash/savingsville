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
}) {

  const router = useRouter();

  const [code, setCode] = React.useState("");
  const email = "johncollins12@gmail.com"; // Replace with dynamic email if available

  const handleNext = async (e) => {
    e.preventDefault();
    if (!code) {
      alert("Please enter the verification code.");
      return;
    }
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          otp: code
        })
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Verification failed.");
        return;
      }
      // Verification successful, proceed to onboarding
      router.push("/onboarding?tab=1");
    } catch (err) {
      alert("Network error. Please try again.");
    }
  };

const handlePrev = () => {
  handleFormStep("step2");
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
johncollins12@gmail.com`}</p>
                <form className="grid space-y-3 max-sm:w-full w-[22em] mt-6" onSubmit={handleNext}>
                  <Input placeholder="Enter Code" value={code} onChange={e => setCode(e.target.value)} required />
                  <AccentButton
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
