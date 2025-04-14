import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../modules/auth/hooks/useAuth";
import "./Navbar.css";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        document.querySelector(".navbar").classList.add("scrolled");
      } else {
        document.querySelector(".navbar").classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Beyond the Book
        </Link>

        <div className="nav-links">
          <Link to="/book-clubs" className="nav-link">
            Book Clubs
          </Link>
          <Link to="/recommendations" className="nav-link">
            Recommendations
          </Link>
          <Link to="/author-engagement" className="nav-link">
            Author Engagement
          </Link>
          <Link to="/book-marketplace" className="nav-link">
            Marketplace
          </Link>
        </div>

        <div className="nav-auth">
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="nav-link">
                Profile
              </Link>
              <button onClick={handleLogout} className="auth-button logout">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="auth-button login">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
