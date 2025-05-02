import { useState, useEffect, createContext, useContext } from "react";
import axios from "../config/axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  console.log("API URL:", process.env.REACT_APP_API_URL);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    
    if (token && storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setUser(user);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } catch (error) {
        console.error("Error parsing stored user data:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      console.log("Attempting login with:", { email, password });
      const response = await axios.post("/auth/login", { email, password });
      console.log("Login response:", response.data);

      const { accessToken, userId, email: userEmail } = response.data;

      if (!accessToken) {
        throw new Error("No access token received");
      }

      const user = {
        id: userId,
        email: userEmail,
      };

      localStorage.setItem("token", accessToken);
      localStorage.setItem("user", JSON.stringify(user));
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      setUser(user);
      return user;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Login failed. Please check your credentials.";
      console.error("Login error:", error.response?.data || error.message);
      throw new Error(errorMessage);
    }
  };

  const register = async (name, username, email, password) => {
    try {
      console.log("Attempting registration with:", { name, username, email });
      const response = await axios.post("/auth/register", {
        name,
        username,
        email,
        password,
      });

      if (!response.data.success) {
        throw new Error(response.data.message || "Registration failed");
      }

      const { token, user } = response.data.data;

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setUser(user);
      }

      return user;
    } catch (error) {
      console.error("Registration error:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Registration failed. Please try again.";
      throw new Error(errorMessage);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
