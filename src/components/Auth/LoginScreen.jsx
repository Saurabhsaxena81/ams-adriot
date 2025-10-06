import React, { useState } from "react";
import { LogIn } from "lucide-react";
import Spinner from "../layout/Spinner";

const LoginScreen = ({ handleLogin, isLoading }) => {
  const [employeeId, setEmployeeId] = useState(""); // Default for testing
  const [password, setPassword] = useState(""); // Default for testing
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(employeeId, password);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700"
      >
        <div className="text-center mb-8">
          <LogIn className="w-12 h-12 text-indigo-500 mx-auto mb-3" />
          <h2 className="text-3xl font-bold text-white">Adroit Login</h2>
          <p className="text-gray-400 text-sm">Connects to API</p>
        </div>

        <div className="space-y-6">
          <div>
            <label
              htmlFor="employeeId"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Employee ID
            </label>
            <input
              id="employeeId"
              type="text"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              required
              className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-500 border border-gray-600 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-500 border border-gray-600 focus:ring-indigo-500 focus:border-indigo-500 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 top-6 flex items-center pr-3 text-gray-400 hover:text-white transition-colors"
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-eye-off"
                >
                  <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                  <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c4.77 0 8.35 1.77 10 5 0 .04 0 .09 0 .13m-3.4 3.4C16.73 14.88 14.37 16 12 16c-2.72 0-4.2-.86-5.52-1.98" />
                  <path d="M3 5.5s4 5.5 9 5.5c.36 0 .7-.01 1.03-.05M2 2l20 20" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-eye"
                >
                  <path d="M2 12s4-5.5 10-5.5S22 12 22 12s-4 5.5-10 5.5S2 12 2 12Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-lg text-white font-bold text-lg bg-indigo-600 hover:bg-indigo-700 transition duration-200 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center space-x-2"
          >
            {isLoading ? (
              <Spinner className="w-5 h-5" />
            ) : (
              <LogIn className="w-5 h-5" />
            )}
            <span>{isLoading ? "Authenticating..." : "Login"}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginScreen;
