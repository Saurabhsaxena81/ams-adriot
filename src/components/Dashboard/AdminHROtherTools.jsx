import React from "react";
import { UserPlus, UploadCloud } from "lucide-react";

const AdminHROtherTools = ({ user, apiClient, showToast }) => {
  const handleRegisterHR = async (e) => {
    e.preventDefault();
    const form = e.target;
    const employeeId = form.elements.hrId.value;
    const password = form.elements.hrPassword.value;

    try {
      if (user.role !== "Admin") {
        showToast("Only Admin users can register new HR accounts.", "error");
        return;
      }

      // --- MOCK Endpoint: Replace with real /admin/register-hr ---
      // await apiClient('/admin/register-hr', { method: 'POST', body: { employeeId, password } });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      showToast(
        `HR user ${employeeId} registered successfully (MOCKED).`,
        "success"
      );
      form.reset();
    } catch (error) {
      showToast(`HR Registration failed: ${error.message}`, "error");
    }
  };

  const handleUploadAttendance = async (e) => {
    e.preventDefault();
    const fileInput = e.target.elements.attendanceFile;
    if (!fileInput.files.length) return;

    try {
      const file = fileInput.files[0];
      if (!file.name.endsWith(".csv") && !file.name.endsWith(".xlsx")) {
        showToast("Only CSV or XLSX files are supported.", "error");
        return;
      }

      // --- MOCK Endpoint: Replace with real /attendance/upload ---
      // const formData = new FormData();
      // formData.append('file', file);
      // await apiClient('/attendance/upload', { method: 'POST', body: formData, headers: {} });
      await new Promise((resolve) => setTimeout(resolve, 1500));
      showToast(
        `Attendance file uploaded and processed successfully (MOCKED).`,
        "success"
      );
      e.target.reset();
    } catch (error) {
      showToast(`File upload failed: ${error.message}`, "error");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      {/* HR Registration Form (Admin Only) */}
      {user.role === "Admin" && (
        <div className="bg-gray-800 p-6 rounded-xl shadow-2xl border border-pink-700">
          <h3 className="text-xl font-bold text-pink-400 mb-4 flex items-center space-x-2">
            <UserPlus className="w-5 h-5" />
            <span>Register HR User (Mock)</span>
          </h3>
          <form onSubmit={handleRegisterHR} className="space-y-4">
            <input
              type="text"
              name="hrId"
              placeholder="HR Employee ID"
              required
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-500"
            />
            <input
              type="password"
              name="hrPassword"
              placeholder="Initial Password"
              required
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-500"
            />
            <button
              type="submit"
              className="w-full py-3 rounded-lg text-white font-bold bg-pink-600 hover:bg-pink-700 transition duration-200"
            >
              Create HR User
            </button>
          </form>
        </div>
      )}

      {/* Bulk Attendance Upload Form */}
      <div
        className={`bg-gray-800 p-6 rounded-xl shadow-2xl border border-cyan-700 ${
          user.role !== "Admin" ? "lg:col-span-2" : ""
        }`}
      >
        <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center space-x-2">
          <UploadCloud className="w-5 h-5" />
          <span>Bulk Attendance Upload (Mock)</span>
        </h3>
        <form onSubmit={handleUploadAttendance} className="space-y-4">
          <input
            type="file"
            name="attendanceFile"
            accept=".csv,.xlsx"
            required
            className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-cyan-600 file:text-white hover:file:bg-cyan-700 transition duration-150"
          />
          <button
            type="submit"
            className="w-full py-3 rounded-lg text-white font-bold bg-cyan-600 hover:bg-cyan-700 transition duration-200"
          >
            Upload & Process File
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminHROtherTools;
