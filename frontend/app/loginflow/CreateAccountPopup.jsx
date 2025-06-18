import React from 'react'
import Input from '@/components/Input'
import Image from 'next/image'
import AccentButton from '@/components/AccentButton'

export default function CreateAccountPage({ handleFormStep }){
  
  function handleNext() {
    handleFormStep("step2")
  }
   return (
    <>
        <div className="fixed bg-gray-600 top-0 bottom-0 left-0 right- w-full h-full opacity-50 z-[1050]">
            
      </div>

      <div className="grid place-items-center z-[1100] fixed left-auto right-auto top-0 bottom-0 w-full h-full">
        <div className="w-[60em] h-[35em] bg-white rounded-[2.9em] shadow-xl grid grid-cols-2">
          <div className="relative">
            <Image
              src="/signup-image.png"
              alt="Login"
              layout="fill"
              unoptimized
            />
          </div>
          <div className="py-[3.5em] px-10">
            <h2 className="text-2xl mb-8 font-baloo font-bold text-secondary">Create an account</h2>
            <form className="space-y-3 w-[22em]">
            <Input placeholder="Name"></Input>
            <Input placeholder="Email"></Input>
            <Input placeholder="Password" type="password"></Input>
            <AccentButton type="button" label="Verify" onClick={handleNext} className="w-full mt-5"/>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
