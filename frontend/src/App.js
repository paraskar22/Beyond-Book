import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
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
import PrivateRoute from "./components/auth/PrivateRoute";
import { AuthProvider } from "./hooks/useAuth";
import "./styles/auth.css";
import "./App.css";

function LayoutWrapper({ children }) {
  const location = useLocation();

  // Hide Navbar and Footer for specific auth routes
  const hideLayoutRoutes = ["/auth/login", "/auth/register"];
  const hideLayout = hideLayoutRoutes.includes(location.pathname);

  return (
    <div className="App">
      {!hideLayout && <Navbar />}
      <main className="main-content">{children}</main>
      {!hideLayout && <Footer />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <LayoutWrapper>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/auth/login" element={<LoginForm />} />
            <Route path="/auth/register" element={<RegisterForm />} />
            <Route
              path="/auth/forgot-password"
              element={<ForgotPasswordForm />}
            />
            <Route
              path="/auth/reset-password/:token"
              element={<ResetPasswordForm />}
            />

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
        </LayoutWrapper>
      </Router>
    </AuthProvider>
  );
}

export default App;
