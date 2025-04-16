import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../services/UserService";
import { toast } from "react-toastify";
import "./Dashboard.css";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = () => {
      try {
        const currentUser = UserService.getCurrentUser();
        if (!currentUser) {
          console.log("No user found, redirecting to login");
          navigate("/login");
          return;
        }
        setUser(currentUser);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to load user data");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    UserService.logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="dashboard-loading">
        <p>No user data available. Redirecting to login...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>

      <div className="dashboard-content">
        <div className="user-info-card">
          <h2>User Information</h2>
          <div className="user-info">
            <p>
              <strong>User ID:</strong> {user?.userId || "N/A"}
            </p>
            <p>
              <strong>Email:</strong> {user?.email || "N/A"}
            </p>
            {user?.name && (
              <p>
                <strong>Name:</strong> {user.name}
              </p>
            )}
            {user?.userName && (
              <p>
                <strong>Username:</strong> {user.userName}
              </p>
            )}
          </div>
        </div>

        <div className="dashboard-stats">
          <div className="stat-card">
            <h3>Book Clubs</h3>
            <p className="stat-value">0</p>
            <button className="view-button">View Clubs</button>
          </div>
          <div className="stat-card">
            <h3>Reading Lists</h3>
            <p className="stat-value">0</p>
            <button className="view-button">View Lists</button>
          </div>
          <div className="stat-card">
            <h3>Recommendations</h3>
            <p className="stat-value">0</p>
            <button className="view-button">View Recommendations</button>
          </div>
        </div>

        <div className="recent-activity">
          <h2>Recent Activity</h2>
          <div className="activity-list">
            <p className="no-activity">No recent activity to display</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
