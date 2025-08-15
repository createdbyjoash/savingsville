"use client";
import React from "react";
import Link from "next/link";
import { IoMdClose } from "react-icons/io";
import { usePathname, useSearchParams } from "next/navigation";

// Default/global tabs (fallback when not on a "dashboard-like" route)
const fallbackTabs = [
  { label: "Analysis", link: "/analysis" },
  { label: "Tools", link: "/tools" },
  { label: "Forums", link: "/forums" },
];

// Dashboard-style tabs shown on specific route families
const dashboardTabs = [
  { icon: "/home.svg", label: "Home", tabId: "home" },
  { icon: "/advanced.svg", label: "Advanced", tabId: "advanced" },
  { icon: "/goals.svg", label: "Goals", tabId: "goals" },
  { icon: "/tracker.svg", label: "Tracker", tabId: "tracker" },
  { icon: "/games.svg", label: "Games", tabId: "games" },
  { icon: "/extra.svg", label: "Extra", tabId: "extra" },
];

// Any first path segment in this array will render the dashboardTabs
// e.g. /dashboard/*, /home/*, /about/*  → all show dashboardTabs
const dashboardRouteSegments = ["dashboard", "home", "about"];

export default function Sidebar({ isOpen, onSidebarClose }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Path parsing
  const segments = pathname.split("/").filter(Boolean); // e.g. "/home/course" -> ["home","course"]
  const baseSegment = segments[0] || "";                // "home" in the above example

  // Is this a route family that should show the dashboard-style tabs?
  const isDashboardRoute = dashboardRouteSegments.includes(baseSegment);

  // Decide active tab:
  // 1) prefer ?tab=...
  // 2) otherwise, if the first path segment itself is a known tabId (e.g. "/home/..."), use it
  // 3) otherwise default to "home" so something is highlighted on dashboard routes
  const tabIds = new Set(dashboardTabs.map(t => t.tabId));
  const tabFromQuery = searchParams.get("tab");
  const tabFromPath = tabIds.has(baseSegment) ? baseSegment : null;

  const currentTabId = isDashboardRoute
    ? (tabFromQuery || tabFromPath || "home")
    : null;

  // Build the list to render
  const tabsToRender = isDashboardRoute ? dashboardTabs : fallbackTabs;

  // Build links for dashboard tabs so they stay inside the current route family
  // Example: if you're on /home/course, clicking "Goals" goes to /home?tab=goals
  const baseRouteForLinks = isDashboardRoute ? `/${baseSegment}` : "";

  return (
    <>
      {isOpen && (
        <aside className="xl:hidden fixed px-2 py-6 backdrop-blur-lg bg-[#521e4f5b] border border-white/20 rounded-xl grid w-[13em] right-2 z-[100000] top-[2.2em] shadow">
          <ul className="grid w-[90%] gap-2 place-items-center mx-auto">
            {/* Close Button */}
            <li className="w-full grid">
              <button
                onClick={onSidebarClose}
                className="w-fit hover:bg-white/20 mr-0 ml-auto rounded-md p-1"
              >
                <IoMdClose size={24} />
              </button>
            </li>

            {/* Tabs */}
            {tabsToRender.map((item, index) => {
              // Determine href per tab
              const href = isDashboardRoute
                ? `/dashboard?tab=${item.tabId}`
                : item.link;

              // Active state:
              const isActive = isDashboardRoute 
                ? currentTabId === item.tabId
                : pathname === item.link.split("?")[0]; // match without query for fallback tabs

              return (
                <li
                  key={index}
                  className={`grid w-full rounded-md transition  ${
                    isActive ? baseSegment === "home" ? "hover:bg-white/20" : "bg-purple-600 shadow-lg" : "hover:bg-white/20"
                  }`}
                >
                  <Link
                    href={href}
                    onClick={onSidebarClose}
                    className="w-full text-gray-200 font-baloo font-bold flex items-center justify-center py-3 px-2"
                  >
                    {item.icon && (
                      <img
                        src={item.icon}
                        alt={`${item.label} icon`}
                        className="w-6 h-6 mr-2"
                      />
                    )}
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </aside>
      )}
    </>
  );
}
