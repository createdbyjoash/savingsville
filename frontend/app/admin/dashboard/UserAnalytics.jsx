import React from "react";
import Image from "next/image";

function PieChart({ data }) {
  // Simple SVG pie chart
  const total = data.reduce((sum, d) => sum + d.count, 0);
  let startAngle = 0;
  const colors = ["#A3E635", "#FBBF24", "#818CF8"];
  return (
    <svg width="120" height="120" viewBox="0 0 120 120">
      {data.map((d, i) => {
        const angle = (d.count / total) * 360;
        const x1 = 60 + 50 * Math.cos((Math.PI * startAngle) / 180);
        const y1 = 60 + 50 * Math.sin((Math.PI * startAngle) / 180);
        startAngle += angle;
        const x2 = 60 + 50 * Math.cos((Math.PI * startAngle) / 180);
        const y2 = 60 + 50 * Math.sin((Math.PI * startAngle) / 180);
        const largeArc = angle > 180 ? 1 : 0;
        const pathData = `M60,60 L${x1},${y1} A50,50 0 ${largeArc},1 ${x2},${y2} Z`;
        return (
          <path key={d.label} d={pathData} fill={colors[i % colors.length]} stroke="#fff" strokeWidth="2" />
        );
      })}
    </svg>
  );
}

export default function UserAnalytics({ ageGroups }) {
  const icons = {
    Kids: "/kid.png",
    Teens: "/teen.png",
    Adults: "/adult.png",
  };
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
      <h3 className="font-baloo text-2xl font-bold mb-6 flex items-center gap-2">
        <Image src="/leaderboard.svg" alt="Analytics" width={32} height={32} />
        User Age Group Distribution
      </h3>
      <div className="flex gap-8 items-center">
        <PieChart data={ageGroups} />
        <div className="grid grid-cols-1 gap-4">
          {ageGroups.map((group) => (
            <div key={group.label} className="flex items-center gap-3">
              <Image src={icons[group.label] || "/kid.png"} alt={group.label} width={32} height={32} />
              <span className="font-baloo text-lg text-gray-700">{group.label}</span>
              <span className="font-bold text-xl text-secondary ml-2">{group.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
