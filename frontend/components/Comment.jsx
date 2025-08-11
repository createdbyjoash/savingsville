import React from "react";
import Image from "next/image";

export default function Comment({ imageUrl, mainText, label }) {
  return (
    
      <div className="backdrop-blur-md space-y-3 rounded-[0.9em] px-[1em] py-[1em] bg-white/30 border-2 shadow-xl border-[#ecececfd] w-full h-fit">
        <div className="flex gap-2">
          <div className="grid h-12 w-12 rounded-md">
            <Image
              src={imageUrl}
              height={200}
              width={200}
              className="w-full h-full rounded-md object-cover"
              alt="image"
            />
          </div>
          <div>
            <p className="text-[0.9em] text-gray-600 font-medium">{label}</p>
            <h3 className="font-baloo font-bold">{mainText}</h3>
          </div>
        </div>
      </div>
   
  );
}
