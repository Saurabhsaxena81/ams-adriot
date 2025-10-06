import React, { useState } from "react";
import { Search } from "lucide-react";
import Spinner from "../layout/Spinner";

const SearchTool = ({ apiClient, showToast }) => {
  const [employeeId, setEmployeeId] = useState("");
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  // Utility: Background color by status
  const getStatusClass = (status) => {
    switch (status) {
      case "Present":
        return "bg-green-600";
      case "Half Day":
        return "bg-yellow-500";
      case "Absent":
        return "bg-red-600";
      case "Week Off":
        return "bg-cyan-600";
      case "Holiday":
        return "bg-purple-600";
      default:
        return "bg-gray-500";
    }
  };

  // Fetch attendance data
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!employeeId.trim()) return;

    setLoading(true);
    setRecords([]);

    try {
      const url = `/attendance/?employeeId=${employeeId.trim()}`;
      const response = await apiClient(url, { method: "GET" });

      if (response.success) {
        setRecords(response.data || []);
        showToast(`Attendance data fetched for ${employeeId}`, "info");
      } else {
        showToast("No data found for this Employee ID", "warning");
      }
    } catch (err) {
      console.error(err);
      showToast("Failed to fetch attendance data", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-700 space-y-6">
      <h3 className="text-xl font-bold text-white flex items-center space-x-2">
        <Search className="w-5 h-5 text-indigo-400" />
        <span>Employee Attendance Search</span>
      </h3>

      {/* Search Form */}
      <form
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4"
      >
        <input
          type="text"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          placeholder="Enter Employee ID (e.g., ASPL20540)"
          className="flex-grow p-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="py-3 px-6 rounded-lg text-white font-bold bg-indigo-600 hover:bg-indigo-700 transition duration-200 disabled:opacity-50 disabled:cursor-wait flex justify-center items-center space-x-2"
        >
          {loading ? (
            <Spinner className="w-5 h-5" />
          ) : (
            <Search className="w-5 h-5" />
          )}
          <span>{loading ? "Searching..." : "Search"}</span>
        </button>
      </form>

      {/* Results Table */}
      {records.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-700 divide-y divide-gray-700 mt-6">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Punch In
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Punch Out
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {records.map((record) => (
                <tr
                  key={record._id}
                  className="hover:bg-gray-700 transition duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                    {new Date(record.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {record.punchInTime || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {record.punchOutTime || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full text-white ${getStatusClass(
                        record.status
                      )}`}
                    >
                      {record.status || "N/A"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* No Results Message */}
      {!loading && records.length === 0 && (
        <p className="text-gray-400 text-sm text-center mt-4">
          No attendance data found.
        </p>
      )}
    </div>
  );
};

export default SearchTool;

// import React, { useState } from "react";
// import { Search, CheckCircle, X, Info } from "lucide-react";
// import Spinner from "../layout/Spinner";
// import SummaryCard from "./SummaryCard";
// import DetailedAttendanceTable from "./DetailedAttendanceTable";
// import DateRangePicker from "../layout/DateRangePicker";
// import {
//   MOCK_ATTENDANCE_SUMMARY,
//   defaultStartDate,
//   defaultEndDate,
// } from "../../data/mockData";

// const SearchTool = ({
//   user,
//   searchData,
//   setSearchData,
//   apiClient,
//   showToast,
// }) => {
//   const [resultStartDate, setResultStartDate] = useState(defaultStartDate);
//   const [resultEndDate, setResultEndDate] = useState(defaultEndDate);
//   const [isFiltering, setIsFiltering] = useState(false);
//   // console.log(user);
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const employeeId = e.target.elements.searchId.value.trim();
//     if (!employeeId) return;

//     setSearchData({ ...searchData, employeeId, loading: true, result: null });

//     try {
//       // Fetch attendance data from API
//       // const response = await apiClient.get(
//       //   `/api/v1/attendance/?employeeId=${employeeId}`
//       // );
//       // ✅ Correct endpoint (based on your Postman screenshot)
//       const url = `/attendance/?employeeId=${employeeId}`;
//       // const token = localStorage.getItem("token");
//       // --- Fetch attendance records ---
//       const response = await apiClient(url, {
//         method: "GET",
//       });

//       console.log("Attendance Response:", response);
//       const { data } = response; // Assuming response.data.data is your array

//       console.log(data);

//       const records = data || [];

//       // Calculate summary statistics
//       const totalPresents = records.filter(
//         (r) => r.status === "Present"
//       ).length;
//       const totalAbsents = records.filter((r) => r.status === "Absent").length; // If "Absent" possible
//       const totalHalfDays = records.filter(
//         (r) => r.status === "Half Day"
//       ).length;
//       const totalWeekOffs = records.filter(
//         (r) => r.status === "Week Off"
//       ).length;
//       const totalHolidays = records.filter(
//         (r) => r.status === "Holiday"
//       ).length;

//       // Extract name and info if you have a reference
//       const name = `Employee ${employeeId}`; // Customize as needed

//       const resultUser = {
//         id: employeeId,
//         name,
//         totalPresents,
//         totalAbsents,
//         totalHalfDays,
//         totalWeekOffs,
//         totalHolidays,
//         records,
//       };

//       setSearchData({ ...searchData, result: resultUser, loading: false });
//       showToast(`Found user ${employeeId}.`, "info");
//       setResultStartDate(defaultStartDate);
//       setResultEndDate(defaultEndDate);
//     } catch (error) {
//       setSearchData({ ...searchData, result: null, loading: false });
//       showToast(`Search failed: ${error.message}`, "error");
//     }
//   };

//   // Handler to trigger the fetch for the searched user
//   const handleResultFilterSearch = () => {
//     // Changing state triggers the table component to re-fetch with new dates
//     setIsFiltering(true);
//     setTimeout(() => setIsFiltering(false), 50);
//   };
//   const getStatusClass = (status) => {
//     switch (status) {
//       case "Present":
//         return "bg-green-600";
//       case "Half Day":
//         return "bg-yellow-500";
//       case "Absent":
//         return "bg-orange-600";
//       case "Week Off":
//         return "bg-cyan-600";
//       case "Holiday":
//         return "bg-purple-600";
//       default:
//         return "bg-gray-500";
//     }
//   };

//   return (
//     <div className="bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-700 space-y-6">
//       <h3 className="text-xl font-bold text-white flex items-center space-x-2">
//         <Search className="w-5 h-5 text-indigo-400" />
//         <span>Employee Attendance Search</span>
//       </h3>

//       {/* Search Form */}
//       <form
//         onSubmit={handleSubmit}
//         className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4"
//       >
//         <input
//           type="text"
//           id="searchId"
//           placeholder="Enter Employee ID (e.g., ASPL20540)"
//           defaultValue={searchData.employeeId}
//           required
//           className="flex-grow p-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500"
//         />
//         <button
//           type="submit"
//           disabled={searchData.loading}
//           className="py-3 px-6 rounded-lg text-white font-bold bg-indigo-600 hover:bg-indigo-700 transition duration-200 disabled:opacity-50 disabled:cursor-wait flex justify-center items-center space-x-2"
//         >
//           {searchData.loading ? (
//             <Spinner className="w-5 h-5" />
//           ) : (
//             <Search className="w-5 h-5" />
//           )}
//           <span>{searchData.loading ? "Searching..." : "Search"}</span>
//         </button>
//       </form>

//       {/* Search Results and Filtering UI */}
//       {searchData.result && (
//         <div className="pt-6 border-t border-gray-700 mt-6 space-y-6">
//           <h4 className="text-lg font-semibold text-white">
//             Results for: {searchData.result.name} ({searchData.result.id})
//           </h4>

//           {/* Summary Cards for Result */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <SummaryCard
//               title="Presents"
//               value={searchData.result.totalPresents}
//               color="bg-green-600/90"
//               icon={CheckCircle}
//             />
//             <SummaryCard
//               title="Absents"
//               value={searchData.result.totalAbsents}
//               color="bg-red-600/90"
//               icon={X}
//             />
//             <SummaryCard
//               title="Half Days"
//               value={searchData.result.totalHalfDays}
//               color="bg-yellow-600/90"
//               icon={Info}
//             />
//           </div>

//           <h5 className="text-md font-semibold text-gray-300 pt-4 border-t border-gray-700">
//             Detailed Records Filter
//           </h5>

//           {/* Date Picker for Search Result */}
//           <DateRangePicker
//             startDate={resultStartDate}
//             endDate={resultEndDate}
//             onStartDateChange={setResultStartDate}
//             onEndDateChange={setResultEndDate}
//             onSearch={handleResultFilterSearch}
//             isLoading={isFiltering}
//           />

//           <div className="mt-6"></div>
//           <tbody className="divide-y divide-gray-700">
//             {record.map((record, index) => (
//               <tr
//                 key={index}
//                 className="hover:bg-gray-700 transition duration-150"
//               >
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
//                   {new Date(record.date).toLocaleDateString()}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
//                   {record.punchInTime || "-"}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
//                   {record.punchOutTime || "-"}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <span
//                     className={`p-2 w-2/5  inline-flex justify-center text-xs leading-5 font-semibold rounded-full text-white ${getStatusClass(
//                       records.status
//                     )}`}
//                   >
//                     {records.status || "N/A"}
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchTool;
