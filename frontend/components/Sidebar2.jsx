import React from "react";
import Link from "next/link";
import { IoMdClose } from "react-icons/io";



const tabs = [
  { label: "Analysis", link: "#" },
  { label: "Tools", link: "#" },
  { label: "Forums", link: "#" },
  //{label: "Get Started", link: "/about"},
];

export default function Sidebar({ isOpen, onSidebarClose }) {

  return (
    <>
      {isOpen && (
        <aside className=" hidden fixed px-2 py-6 bg-[#692c77] rounded-xl max-sm:grid w-[13em] right-2 z-[100] top-[2.2em] shadow">
          <ul className="grid w-[90%] gap-2 place-items-center mx-auto">
            <li className="w-full grid">
              <button
                onClick={onSidebarClose}
                className="w-fit hover:bg-[#ffffff27] mr-0 ml-auto rounded-md">
                <IoMdClose size={24} />
              </button>
            </li>
            {tabs.map((item, index) => (
              <li
                key={index}
                className="hover:bg-[#ffffff1c] grid w-full rounded-md">
                <Link
                  href={item.link}
                  onClick={() => onSidebarClose()}
                  className="w-full text-gray-200 font-baloo font-bold flex justify-center py-3">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      )}
    </>
  );
};


