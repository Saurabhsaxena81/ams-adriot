const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

export const apiClient = async (endpoint, options = {}) => {
  const defaultHeaders = { "Content-Type": "application/json" };
  const token = localStorage.getItem("token");
  if (token) defaultHeaders["Authorization"] = `Bearer ${token}`;

  const config = { method: "GET", headers: defaultHeaders, ...options };

  if (options.body instanceof FormData) {
    delete config.headers["Content-Type"];
  } else if (config.body) {
    config.body = JSON.stringify(config.body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || data.message || `Error: ${response.status}`);
    }

    return data.data || data;
  } catch (error) {
    console.error("API Error:", error.message);
    throw error;
  }
};
