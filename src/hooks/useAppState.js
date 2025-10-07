import { useState, useEffect, useCallback } from "react";
// import { API_BASE_URL } from "../data/mockData";
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

const useAppState = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [searchData, setSearchData] = useState({
    employeeId: "",
    result: null,
    loading: false,
  });
  const [isAuthReady, setIsAuthReady] = useState(false);

  const showToast = (message, type = "info") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setSearchData({ employeeId: "", result: null, loading: false });
    showToast("Successfully logged out.", "info");
  };

  const apiClient = useCallback(
    async (endpoint, options = {}) => {
      const url = `${API_BASE_URL}${endpoint}`;

      const headers = {
        "Content-Type": "application/json",
        ...options.headers,
      };

      // Do not add Authorization header for the login endpoint
      if (token && !endpoint.includes("/auth/login")) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const fetchOptions = {
        method: options.method || "GET",
        headers: headers,
        body: options.body ? JSON.stringify(options.body) : undefined,
      };

      try {
        const response = await fetch(url, fetchOptions);

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error(
              "Session expired or unauthorized. Please log in again."
            );
          }
          const errorData = await response
            .json()
            .catch(() => ({ message: response.statusText }));
          throw new Error(errorData.message || `API Error: ${response.status}`);
        }

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          return await response.json();
        }
        return {};
      } catch (error) {
        console.error("API Call Failed:", error);
        if (error.message.includes("Session expired")) {
          handleLogout();
        }
        throw error;
      }
    },
    [token]
  );

  const handleLogin = async (employeeId, password) => {
    setIsLoading(true);
    if (!employeeId || !password) {
      setIsLoading(false);
      showToast("Please enter both Employee ID and Password.", "error");
      return;
    }

    try {
      const data = await apiClient("/auth/login", {
        method: "POST",
        body: { employeeId, password },
        headers: { "Content-Type": "application/json" },
      });

      if (!data.success || !data.token || !data.user) {
        throw new Error(data.message || "Invalid credentials provided.");
      }

      localStorage.setItem("token", data.token);
      setToken(data.token);
      setUser(data.user);

      showToast(`Welcome back, ${data.user.name}!`, "success");
    } catch (error) {
      console.error("Login error:", error.message);
      showToast(error.message, "error");
      setToken(null);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const validateToken = async () => {
      if (token) {
        try {
          const profileData = await apiClient("/user/profile", {
            method: "GET",
          });
          setUser(profileData.user);
          showToast(`Session restored for ${profileData.user.name}.`, "info");
        } catch (error) {
          console.error(
            "Token validation failed, forcing logout:",
            error.message
          );
          handleLogout();
        }
      }
      setIsLoading(false);
      setIsAuthReady(true);
    };

    if (token && !user) {
      validateToken();
    } else {
      setIsLoading(false);
      setIsAuthReady(true);
    }
  }, [token, apiClient, user]);

  return {
    user,
    token,
    isLoading,
    isAuthReady,
    toast,
    searchData,
    apiClient,
    handleLogin,
    handleLogout,
    showToast,
    setSearchData,
  };
};

export default useAppState;
