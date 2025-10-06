import React from "react";

const SummaryCard = ({ title, value, color, icon: Icon }) => (
  <div
    className={`p-6 rounded-xl shadow-xl border border-gray-700 transition duration-300 hover:scale-[1.03] ${color}`}
  >
    <div className="flex justify-between items-center">
      <div>
        <p className="text-sm font-medium text-white/80 uppercase">{title}</p>
        <p className="text-4xl font-extrabold text-white mt-1">{value}</p>
      </div>
      <Icon className="w-10 h-10 text-white/50" />
    </div>
  </div>
);

export default SummaryCard;
