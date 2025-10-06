import React from "react";
import { Calendar } from "lucide-react";
import Spinner from "./Spinner";
import { formatDate } from "../../data/mockData";

const DateRangePicker = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onSearch,
  isLoading,
}) => (
  <div className="flex flex-col sm:flex-row items-stretch sm:items-end space-y-3 sm:space-y-0 sm:space-x-4 bg-gray-700/50 p-4 rounded-lg border border-gray-600">
    <div className="flex-1 min-w-[150px]">
      <label
        htmlFor="startDate"
        className="block text-xs font-medium text-gray-400 mb-1"
      >
        Start Date
      </label>
      <input
        id="startDate"
        type="date"
        value={startDate}
        onChange={(e) => onStartDateChange(e.target.value)}
        className="w-full p-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-indigo-500 focus:border-indigo-500"
        max={formatDate(new Date())}
      />
    </div>
    <div className="flex-1 min-w-[150px]">
      <label
        htmlFor="endDate"
        className="block text-xs font-medium text-gray-400 mb-1"
      >
        End Date
      </label>
      <input
        id="endDate"
        type="date"
        value={endDate}
        onChange={(e) => onEndDateChange(e.target.value)}
        className="w-full p-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-indigo-500 focus:border-indigo-500"
        max={formatDate(new Date())}
      />
    </div>
    <button
      onClick={onSearch}
      disabled={isLoading}
      className="py-2.5 px-6 rounded-lg text-white font-bold bg-indigo-600 hover:bg-indigo-700 transition duration-200 disabled:opacity-50 disabled:cursor-wait flex justify-center items-center space-x-2 h-[42px]"
    >
      {isLoading ? (
        <Spinner className="w-5 h-5" />
      ) : (
        <Calendar className="w-5 h-5" />
      )}
      <span>{isLoading ? "Fetching..." : "Filter Records"}</span>
    </button>
  </div>
);

export default DateRangePicker;
