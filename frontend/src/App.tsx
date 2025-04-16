import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./components/auth/LoginForm";
import Register from "./components/auth/RegisterForm";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import UserService from "./services/UserService";

// Protected Route component
const ProtectedRoute = ({ children }: { children: any }) => {
  try {
    const user = UserService.getCurrentUser();
    if (!user) {
      return <Navigate to="/login" />;
    }
    return <>{children}</>;
  } catch (error) {
    console.error("Error in ProtectedRoute:", error);
    return <Navigate to="/login" />;
  }
};

function App() {
  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        aria-label="Toast notifications"
      />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={<ProtectedRoute children={<Dashboard />}></ProtectedRoute>}
        />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
