import { CheckCircle, X, Info } from "lucide-react";
import SummaryCard from "./SummaryCard";
import DetailedAttendanceTable from "./DetailedAttendanceTable";
import { MOCK_ATTENDANCE_SUMMARY } from "../../data/mockData";

const AgentDashboard = ({ user, apiClient, showToast }) => {
  // Mock summary data for now
  console.log(user)
  const summary = MOCK_ATTENDANCE_SUMMARY;
  console.log();
  return (
    <div className="space-y-10">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
        <SummaryCard
          title="Presents"
          value={user.totalPresents}
          color="bg-green-600/90"
          icon={CheckCircle}
        />
        <SummaryCard
          title="Absents"
          value={user.totalAbsents}
          color="bg-orange-600/90"
          icon={X}
        />
        <SummaryCard
          title="Half Days"
          value={user.totalHalfDays}
          color="bg-yellow-600/90"
          icon={Info}
        />
        <SummaryCard
          title="Week Offs"
          value={user.totalWeekOffs}
          color="bg-cyan-600/90"
          icon={Info}
        />
        <SummaryCard
          title="Holidays"
          value={user.totalHolidays}
          color="bg-purple-600/90"
          icon={Info}
        />
      </div>

      {/* Attendance Table */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-3">
          Complete Attendance Records
        </h2>

        <DetailedAttendanceTable
          employeeId={user.employeeId} // ✅ Correct key
          apiClient={apiClient}
          showToast={showToast}
        />
      </div>
    </div>
  );
};

export default AgentDashboard;

// import { useState } from "react";
// import { CheckCircle, X, Info } from "lucide-react";
// import SummaryCard from "./SummaryCard";
// import DetailedAttendanceTable from "./DetailedAttendanceTable";
// import DateRangePicker from "../layout/DateRangePicker";
// import {
//   MOCK_ATTENDANCE_SUMMARY,
//   defaultStartDate,
//   defaultEndDate,
// } from "../../data/mockData";

// const AgentDashboard = ({ user, apiClient, showToast }) => {
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   // State for date range filtering (defaults to last 30 days)

//   // const [startDate, setStartDate] = useState(defaultStartDate);
//   // const [endDate, setEndDate] = useState(defaultEndDate);
//   const [isFetching, setIsFetching] = useState(false); // Used to control the filter button loading state

//   // For the purpose of this example, we use mock summary data
//   const summary = MOCK_ATTENDANCE_SUMMARY;

//   // Handler to trigger the fetch when the user clicks 'Filter Records'
//   const handleFilterSearch = () => {
//     // By changing the state here, it triggers the useEffect/fetchData in DetailedAttendanceTable
//     setIsFetching(true);
//     setTimeout(() => setIsFetching(false), 50); // Small delay to show button loading
//   };

//   return (
//     <div className="space-y-10">
//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
//         <SummaryCard
//           title="Presents"
//           value={summary.totalPresents}
//           color="bg-green-600/90"
//           icon={CheckCircle}
//         />
//         <SummaryCard
//           title="Absents"
//           value={summary.totalAbsents}
//           color="bg-orange-600/90"
//           icon={X}
//         />
//         <SummaryCard
//           title="Half Days"
//           value={summary.totalHalfDays}
//           color="bg-yellow-600/90"
//           icon={Info}
//         />
//         <SummaryCard
//           title="Week Offs"
//           value={summary.totalWeekOffs}
//           color="bg-cyan-600/90"
//           icon={Info}
//         />
//         <SummaryCard
//           title="Holidays"
//           value={summary.totalHolidays}
//           color="bg-purple-600/90"
//           icon={Info}
//         />
//       </div>

//       <div className="bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-700">
//         <h2 className="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-3">
//           Detailed Attendance Records
//         </h2>

//         <DateRangePicker
//           startDate={startDate}
//           endDate={endDate}
//           onStartDateChange={setStartDate}
//           onEndDateChange={setEndDate}
//           onSearch={handleFilterSearch}
//           isLoading={isFetching}
//         />

//         <div className="mt-6">
//           <DetailedAttendanceTable
//             employeeId={user.id}
//             apiClient={apiClient}
//             showToast={showToast}
//             // startDate={startDate} // Pass new start date
//             // endDate={endDate} // Pass new end date
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AgentDashboard;

// import React, { useEffect, useState } from "react";
// import { apiClient } from "../../api/apiClient";
// import AttendanceSummary from "./AttendanceSummary";
// import DetailedAttendanceTable from "./DetailedAttendanceTable";
// import LoadingSpinner from "../Common/LoadingSpinner";

// const AgentDashboard = () => {
//   const [attendance, setAttendance] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     apiClient("/attendance")
//       .then((data) => {
//         setAttendance(data);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, []);

//   if (loading) return <LoadingSpinner />;

//   const stats = {
//     total: attendance.length,
//     present: attendance.filter((a) => a.status === "Present").length,
//     absent: attendance.filter((a) => a.status === "Absent").length,
//     halfDay: attendance.filter((a) => a.status === "Half Day").length,
//   };

//   return (
//     <div className="p-6">
//       <AttendanceSummary stats={stats} />
//       <DetailedAttendanceTable attendance={attendance} />
//     </div>
//   );
// };

// export default AgentDashboard;
