import React from "react";

export default function AdminSidebar({ activeTab, setActiveTab }) {
  const tabs = [
    { key: "overview", label: "Overview" },
    { key: "courses", label: "Courses" },
    { key: "analytics", label: "User Analytics" },
    { key: "profile", label: "Profile" },
  ];
  return (
    <aside className="bg-white shadow-lg h-full w-[220px] flex flex-col py-8 px-4">
      <h2 className="font-baloo text-xl font-bold text-secondary mb-8 text-center">Admin</h2>
      <nav className="flex flex-col gap-4">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`text-left px-4 py-2 rounded-lg font-semibold transition-colors ${
              activeTab === tab.key ? "bg-secondary text-white" : "hover:bg-gray-100 text-gray-700"
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
