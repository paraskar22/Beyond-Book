import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>Oops! The page you're looking for doesn't exist.</p>
        <Link to="/" className="btn primary">
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound; 