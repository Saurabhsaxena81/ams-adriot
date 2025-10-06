import React, { useState, useEffect, useCallback } from "react";
import Spinner from "../layout/Spinner";

const DetailedAttendanceTable = ({ employeeId, apiClient, showToast }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    if (!employeeId) return;

    setLoading(true);
    try {
      // ✅ Correct endpoint (based on your Postman screenshot)
      const url = `/attendance`;

      // --- Fetch attendance records ---
      const response = await apiClient(url, { method: "GET" });
      console.log("Attendance Response:", response);

      // ✅ Handle both structures: { data: [...] } or [...]
      const allRecords = response.data || response || [];
      console.log("DetailedAttendanceTable loaded:", { employeeId });

      // ✅ Filter attendance for the logged-in employee
      const userRecords = allRecords.filter(
        (record) =>
          record.employeeID === employeeId || record.employeeId === employeeId
      );

      setData(userRecords);

      showToast(`Attendance data loaded for ${employeeId}`, "info");
    } catch (error) {
      console.error("Attendance Fetch Error:", error);
      showToast(`Failed to load attendance: ${error.message}`, "error");
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [employeeId, apiClient, showToast]);

  useEffect(() => {
    fetchData();
  }, []);

  if (loading)
    return (
      <div className="p-6 text-center">
        <Spinner className="w-8 h-8 text-indigo-500" />
      </div>
    );

  if (!data || data.length === 0)
    return (
      <div className="p-6 text-center text-gray-400">
        No attendance records found for this employee.
      </div>
    );

  const getStatusClass = (status) => {
    switch (status) {
      case "Present":
        return "bg-green-600";
      case "Half Day":
        return "bg-yellow-500";
      case "Absent":
        return "bg-orange-600";
      case "Week Off":
        return "bg-cyan-600";
      case "Holiday":
        return "bg-purple-600";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="overflow-x-auto rounded-xl">
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-700/70">
          <tr>
            {["Date", "Punch In", "Punch Out", "Status"].map((header) => (
              <th
                key={header}
                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {data.map((record, index) => (
            <tr
              key={index}
              className="hover:bg-gray-700 transition duration-150"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
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
                  className={`p-2 w-2/5  inline-flex justify-center text-xs leading-5 font-semibold rounded-full text-white ${getStatusClass(
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
  );
};

export default DetailedAttendanceTable;

// import React, { useState, useEffect, useCallback } from "react";
// import Spinner from "../layout/Spinner";

// const DetailedAttendanceTable = ({
//   employeeId,
//   apiClient,
//   showToast,
//   startDate,
//   endDate,
// }) => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const fetchData = useCallback(async () => {
//     // Prevent API call if we have no employee ID (e.g., initial search screen)
//     if (!employeeId) return;

//     setLoading(true);
//     try {
//       let url = `/attendance/detailed/${employeeId}`;
//       const queryParams = [];

//       // Add date filters only if provided
//       // if (startDate) {
//       //     queryParams.push(`startDate=${startDate}`);
//       // }
//       // if (endDate) {
//       //     queryParams.push(`endDate=${endDate}`);
//       // }

//       // if (queryParams.length > 0) {
//       //     url += `?${queryParams.join('&')}`;
//       // }

//       // --- REAL API CALL IS HERE ---
//       const response = await apiClient(url, { method: "GET" });

//       // Assuming the backend returns an object like { success: true, records: [...] }
//       setData(response.records || response.data || []);
//       showToast(`Attendance data loaded for ${employeeId}.`, "info");
//     } catch (error) {
//       // Show error message if API fails
//       showToast(
//         `Failed to load attendance for ${employeeId}: ${error.message}`,
//         "error"
//       );
//       setData([]);
//     } finally {
//       setLoading(false);
//     }
//   }, [employeeId, apiClient, showToast]);

//   useEffect(() => {
//     // Fetch data whenever employeeId, startDate, or endDate changes
//     fetchData();
//   }, [fetchData]);

//   if (loading)
//     return (
//       <div className="p-6 text-center">
//         <Spinner className="w-8 h-8 text-indigo-500" />
//       </div>
//     );
//   if (!data || data.length === 0)
//     return (
//       <div className="p-6 text-center text-gray-400">
//         No attendance records found for this period.
//       </div>
//     );

//   const getStatusClass = (status) => {
//     switch (status) {
//       case "Present":
//         return "bg-green-600";
//       case "Half Day":
//         return "bg-yellow-500";
//       case "Absent":
//         return "bg-red-600";
//       case "Week Off":
//         return "bg-blue-600";
//       case "Holiday":
//         return "bg-purple-600";
//       default:
//         return "bg-gray-500";
//     }
//   };

//   return (
//     <div className="overflow-x-auto rounded-xl">
//       <table className="min-w-full divide-y divide-gray-700">
//         <thead className="bg-gray-700/70">
//           <tr>
//             {["Date", "Punch In", "Punch Out", "Status", "Duration"].map(
//               (header) => (
//                 <th
//                   key={header}
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
//                 >
//                   {header}
//                 </th>
//               )
//             )}
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-gray-700">
//           {data.map((record, index) => (
//             <tr
//               key={index}
//               className="hover:bg-gray-700 transition duration-150"
//             >
//               {/* NOTE: Assuming 'date', 'punchInTime', 'punchOutTime', 'status', and 'loginTime' fields exist in the API response records */}
//               <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
//                 {record.date}
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
//                 {record.punchInTime}
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
//                 {record.punchOutTime}
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <span
//                   className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-white ${getStatusClass(
//                     record.status
//                   )}`}
//                 >
//                   {record.status}
//                 </span>
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
//                 {record.loginTime}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default DetailedAttendanceTable;

// import React from "react";

// const DetailedAttendanceTable = ({ attendance }) => {
//   return (
//     <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
//       <h2 className="text-xl font-semibold mb-4">Detailed Attendance</h2>
//       <div className="overflow-x-auto">
//         <table className="w-full border-collapse text-sm">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border p-2">Date</th>
//               <th className="border p-2">Punch In</th>
//               <th className="border p-2">Punch Out</th>
//               <th className="border p-2">Hours</th>
//               <th className="border p-2">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {attendance.map((a, idx) => (
//               <tr key={idx} className="hover:bg-gray-50">
//                 <td className="border p-2">{new Date(a.date).toLocaleDateString()}</td>
//                 <td className="border p-2">{a.punchIn || "-"}</td>
//                 <td className="border p-2">{a.punchOut || "-"}</td>
//                 <td className="border p-2">{a.workingHours}</td>
//                 <td className="border p-2">{a.status}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default DetailedAttendanceTable;
