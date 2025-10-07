import React from "react";
import AgentDashboard from "./components/Dashboard/AgentDashboard";
import SearchTool from "./components/Dashboard/SearchTool";
import AdminHROtherTools from "./components/Dashboard/AdminHROtherTools";

const Dashboard = ({
  user,
  apiClient,
  showToast,
  searchData,
  setSearchData,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-4xl font-extrabold text-white mb-4">
        {user.name} Dashboard
      </h1>
      <p className="text-gray-400 mb-8 border-b border-gray-700 pb-4">
        Welcome, {user.name}. Your ID is {user.employeeId}.
      </p>

      {user.role === "Agent" && (
        <AgentDashboard
          user={user}
          apiClient={apiClient}
          showToast={showToast}
        />
      )}

      {(user.role === "Admin" || user.role === "HR") && (
        <>
          <SearchTool
            user={user}
            searchData={searchData}
            setSearchData={setSearchData}
            apiClient={apiClient}
            showToast={showToast}
          />
          <AdminHROtherTools
            user={user}
            apiClient={apiClient}
            showToast={showToast}
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;
