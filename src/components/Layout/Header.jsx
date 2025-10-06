// import React from "react";
import { User, LogOut } from "lucide-react";

const Header = ({ user, handleLogout }) => (
  <header className="bg-gray-900 shadow-lg sticky top-0 z-10 border-b border-gray-700">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-2 text-white">
        <User className="w-6 h-6 text-indigo-400" />
        <h1 className="text-xl font-bold">Attendance Hub</h1>
      </div>
      {user && (
        <div className="flex items-center space-x-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-gray-300">{user.name}</p>
            <p
              className={`text-xs font-medium ${
                user.role === "Admin"
                  ? "text-yellow-400"
                  : user.role === "HR"
                  ? "text-pink-400"
                  : "text-indigo-400"
              }`}
            >
              {user.role} ({user.employeeId})
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 rounded-full bg-red-600 hover:bg-red-700 text-white transition-colors flex items-center shadow-md"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  </header>
);

export default Header;
