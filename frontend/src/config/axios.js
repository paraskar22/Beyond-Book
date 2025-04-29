import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080/api", // No trailing slash!
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});
