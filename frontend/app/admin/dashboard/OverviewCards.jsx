import React from "react";
import Image from "next/image";

export default function OverviewCards({ totalUsers, totalCourses, onCoursesClick, onUsersClick }) {
  return (
    <div className="grid grid-cols-2 gap-6 mb-8">
      <div
        className="bg-gradient-to-br from-[#E2C6FF] to-[#fff] shadow-lg rounded-2xl p-6 flex flex-col items-center relative cursor-pointer"
        onClick={onUsersClick}
      >
        <Image src="/leaderboard.png" alt="Users" width={48} height={48} className="absolute top-4 right-4 opacity-80" />
        <span className="font-baloo text-lg text-gray-700">Total Users</span>
        <span className="font-bold text-4xl text-secondary mt-2 drop-shadow">{totalUsers}</span>
      </div>
      <div
        className="bg-gradient-to-br from-[#C6F7FF] to-[#fff] shadow-lg rounded-2xl p-6 flex flex-col items-center relative cursor-pointer"
        onClick={onCoursesClick}
      >
        <Image src="/courses.svg" alt="Courses" width={48} height={48} className="absolute top-4 right-4 opacity-80" />
        <span className="font-baloo text-lg text-gray-700">Total Courses</span>
        <span className="font-bold text-4xl text-secondary mt-2 drop-shadow">{totalCourses}</span>
      </div>
    </div>
  );
}
