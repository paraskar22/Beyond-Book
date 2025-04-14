import { useState, useEffect } from "react";
import { validateEmail, validatePassword } from "../utils/validation";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated");
    const userEmail = localStorage.getItem("userEmail");
    if (auth === "true" && userEmail) {
      setIsAuthenticated(true);
      setUser({ email: userEmail });
    }
  }, []);

  const login = async ({ email, password }) => {
    // Basic validation
    if (!email || !password) {
      throw new Error("Please fill in all fields");
    }

    if (!validateEmail(email)) {
      throw new Error("Please enter a valid email address");
    }

    if (!validatePassword(password)) {
      throw new Error("Password must be at least 6 characters long");
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // For demo purposes
    if (email === "demo@example.com" && password === "password123") {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userEmail", email);
      setIsAuthenticated(true);
      setUser({ email });
    } else {
      throw new Error("Invalid email or password");
    }
  };

  const logout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    setIsAuthenticated(false);
    setUser(null);
  };

  const resetPassword = async (email) => {
    if (!email) {
      throw new Error("Please enter your email address");
    }

    if (!validateEmail(email)) {
      throw new Error("Please enter a valid email address");
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return {
    isAuthenticated,
    user,
    login,
    logout,
    resetPassword,
  };
}
