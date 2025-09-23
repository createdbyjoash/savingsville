import React from "react";

export default function OverviewCards({ totalUsers, totalCourses }) {
  return (
    <div className="grid grid-cols-2 gap-6 mb-8">
      <div className="bg-white shadow rounded-xl p-6 flex flex-col items-center">
        <span className="font-baloo text-lg text-gray-600">Total Users</span>
        <span className="font-bold text-3xl text-secondary mt-2">{totalUsers}</span>
      </div>
      <div className="bg-white shadow rounded-xl p-6 flex flex-col items-center">
        <span className="font-baloo text-lg text-gray-600">Total Courses</span>
        <span className="font-bold text-3xl text-secondary mt-2">{totalCourses}</span>
      </div>
    </div>
  );
}
