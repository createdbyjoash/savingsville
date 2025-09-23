import React from "react";

export default function UserAnalytics({ ageGroups }) {
  // Example ageGroups: [{ label: "18-25", count: 20 }, { label: "26-35", count: 15 }]
  return (
    <div className="bg-white rounded-xl shadow p-6 mt-8">
      <h3 className="font-baloo text-xl font-bold mb-4">User Age Group Distribution</h3>
      <div className="grid grid-cols-2 gap-4">
        {ageGroups.map((group) => (
          <div key={group.label} className="flex flex-col items-center">
            <span className="font-baloo text-lg text-gray-600">{group.label}</span>
            <span className="font-bold text-2xl text-secondary mt-1">{group.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
