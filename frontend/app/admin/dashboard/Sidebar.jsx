import React from "react";

export default function AdminSidebar({ activeTab, setActiveTab }) {
  const tabs = [
    { key: "overview", label: "Dashboard", icon: "/dashboard.svg" },
    { key: "courses", label: "Courses", icon: "/courses.svg" },
    { key: "students", label: "Students", icon: "/students.svg" },
    { key: "settings", label: "Settings", icon: "/settings.svg" },
  ];
  return (
  <aside className="bg-white shadow-lg h-full w-full max-w-[220px] flex flex-col py-8 px-4 md:w-[220px]">
      <h2 className="font-baloo text-xl font-bold text-primary mb-8 text-center">SavingsVille</h2>
  <nav className="flex flex-col gap-2 w-full">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`flex items-center gap-3 text-left px-4 py-2 rounded-lg font-semibold transition-colors w-full ${
              activeTab === tab.key ? "bg-primary text-white" : "hover:bg-gray-100 text-gray-700"
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.icon && (
              <img src={tab.icon} alt={tab.label} className="w-5 h-5 opacity-80" />
            )}
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
