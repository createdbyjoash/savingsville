import React from "react";
import Image from "next/image";

export default function SquareButton({
    image,
    alt,
    label,
    onClick, 
    active,
    smallText

}) {
  return (
    <>
      <button
        type="button"
        className={` p-2 xl:p-3 transition grid place-items-center cursor-pointer items-center max-sm:rounded-[1em] pt-5 rounded-[2em] max-sm:w-[6.3em] max-md:w-[8em] md:w-[8em] xl:w-[9em] space-y-4 max-sm:shadow-2xl max-sm:border-2 border-[#ffffff71]  ${
          active
            ? "bg-secondary text-white"
            : "bg-white text-black"
        }`}
        onClick={onClick}
      >
        <div className="relative">
          <Image
            src={image}
            alt={alt}
            width={10}
            height={10}
            className="max-sm:max-w-[2.8em] max-sm:max-h-[2.8em] max-w-[6.7em] max-h-[6.5em] xl:max-w-[8em] xl:max-h-[8em] w-full h-full"
            unoptimized
          />
        </div>
        <p className="leading-[1em] break-words max-w-[6em] font-baloo font-bold max-sm:text-[0.9em] text-[1em] xl:text-xl text-center mb-4">
          {label}<br></br>
          <small className="font-baloo font-bold text-center text-sm mt-[-1em]">{smallText}</small>
        </p>
        
      </button>
    </>
  );
}
