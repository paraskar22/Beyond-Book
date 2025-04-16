import axios from "axios";

// Set base URL to match your backend - adjust this URL if your backend is hosted elsewhere
const http = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-type": "application/json",
  },
  // Add timeout to prevent endless waiting
  timeout: 15000,
});

// Add a request interceptor to include the auth token in the headers
http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
http.interceptors.response.use(
  (response) => {
    console.log("API Success:", response.config.url, response.status);
    return response;
  },
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // outside of the range of 2xx
      console.error(
        "API Error Response:",
        error.config?.url,
        error.response.status,
        error.response.data
      );
    } else if (error.request) {
      // The request was made but no response was received
      console.error("API No Response:", error.config?.url, error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("API Request Setup Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default http;
