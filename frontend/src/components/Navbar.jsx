import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "./Navbar.css";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { to: "/book-clubs", text: "Book Clubs" },
    { to: "/recommendations", text: "Recommendations" },
    { to: "/author-engagement", text: "Author Engagement" },
    { to: "/book-marketplace", text: "Marketplace" },
  ];

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Beyond the Book
        </Link>

        <button 
          className={`mobile-menu-btn ${isMobileMenuOpen ? 'open' : ''}`} 
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Desktop Navigation */}
        <div className="desktop-nav">
          <div className="nav-links">
            {navLinks.map((link) => (
              <Link 
                key={link.to} 
                to={link.to} 
                className={`nav-link ${location.pathname === link.to ? 'active' : ''}`}
              >
                {link.text}
              </Link>
            ))}
          </div>

          <div className="nav-auth">
            {user ? (
              <>
                <Link 
                  to="/dashboard" 
                  className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
                >
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="auth-button logout">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/auth/login" className="auth-button login">
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
          {navLinks.map((link) => (
            <Link 
              key={link.to} 
              to={link.to} 
              className={`nav-link ${location.pathname === link.to ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.text}
            </Link>
          ))}
          {user ? (
            <>
              <Link 
                to="/dashboard" 
                className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <button onClick={handleLogout} className="auth-button logout">
                Logout
              </button>
            </>
          ) : (
            <Link 
              to="/auth/login" 
              className="auth-button login"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;