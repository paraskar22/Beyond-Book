import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import BookClubs from "./pages/BookClubs";
import Recommendations from "./pages/Recommendations";
import AuthorEngagement from "./pages/AuthorEngagement";
import BookMarketplace from "./pages/BookMarketplace";
import UserProfile from "./pages/UserProfile";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import ForgotPasswordForm from "./components/auth/ForgotPasswordForm";
import ResetPasswordForm from "./components/auth/ResetPasswordForm";
import AuthLayout from "./components/auth/AuthLayout";
import PrivateRoute from "./components/auth/PrivateRoute";
import { AuthProvider } from "./hooks/useAuth";
import "./styles/auth.css";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main className="main-content">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<AuthLayout />}>
                <Route path="login" element={<LoginForm />} />
                <Route path="register" element={<RegisterForm />} />
                <Route path="forgot-password" element={<ForgotPasswordForm />} />
                <Route path="reset-password/:token" element={<ResetPasswordForm />} />
              </Route>

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <UserProfile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/book-clubs"
                element={
                  <PrivateRoute>
                    <BookClubs />
                  </PrivateRoute>
                }
              />
              <Route
                path="/recommendations"
                element={
                  <PrivateRoute>
                    <Recommendations />
                  </PrivateRoute>
                }
              />
              <Route
                path="/author-engagement"
                element={
                  <PrivateRoute>
                    <AuthorEngagement />
                  </PrivateRoute>
                }
              />
              <Route
                path="/book-marketplace"
                element={
                  <PrivateRoute>
                    <BookMarketplace />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <UserProfile />
                  </PrivateRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
