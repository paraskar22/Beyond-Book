import axios from "axios";

// Base API configuration
const http = axios.create({
  baseURL: "http://localhost:8080/api", // 🔁 Change this if backend is deployed
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000, // 15s timeout to avoid hanging requests
});

// Attach JWT token to every request if available
http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request setup error:", error);
    return Promise.reject(error);
  }
);

// Global response logging and error handling
http.interceptors.response.use(
  (response) => {
    console.log(`✅ API Success: [${response.status}] ${response.config.url}`);
    return response;
  },
  (error) => {
    if (error.response) {
      // Server responded with a non-2xx status
      console.error(
        `❌ API Error Response: [${error.response.status}] ${error.config?.url}`,
        error.response.data
      );
    } else if (error.request) {
      // No response received from the server
      console.error("❌ API No Response:", error.config?.url, error.request);
    } else {
      // Something went wrong in setting up the request
      console.error("❌ API Request Setup Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default http;
