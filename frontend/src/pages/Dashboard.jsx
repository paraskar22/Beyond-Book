import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import "./Dashboard.css";

const Dashboard = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    memberSince: '',
    readingStats: {
      booksRead: 0,
      currentlyReading: 0,
      wantToRead: 0,
      favoriteGenres: []
    },
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        // Fetch user profile data
        const profileResponse = await fetch('/api/user/profile', {
          credentials: 'include'
        });
        if (!profileResponse.ok) throw new Error('Failed to fetch profile data');
        const profileData = await profileResponse.json();

        // Fetch reading statistics
        const statsResponse = await fetch('/api/user/stats', {
          credentials: 'include'
        });
        if (!statsResponse.ok) throw new Error('Failed to fetch reading stats');
        const statsData = await statsResponse.json();

        // Fetch recent activity
        const activityResponse = await fetch('/api/user/activity', {
          credentials: 'include'
        });
        if (!activityResponse.ok) throw new Error('Failed to fetch activity');
        const activityData = await activityResponse.json();

        setUserData({
          name: profileData.name || user.name,
          email: profileData.email || user.email,
          memberSince: profileData.memberSince || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
          readingStats: {
            booksRead: statsData.booksRead || 0,
            currentlyReading: statsData.currentlyReading || 0,
            wantToRead: statsData.wantToRead || 0,
            favoriteGenres: profileData.favoriteGenres || []
          },
          recentActivity: activityData || []
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  if (loading) {
    return <div className="loading">Loading your dashboard...</div>;
  }

  if (error) {
    return <div className="dashboard-error">
      <h2>Error</h2>
      <p>{error}</p>
    </div>;
  }

  return (
    <main className="main-content">
      <div className="user-profile">
        <div className="profile-header">
          <div className="profile-info">
            <h1>{userData.name}</h1>
            <p className="email">{userData.email}</p>
            <p className="member-since">Member since {userData.memberSince}</p>
          </div>
          <button className="btn primary">Edit Profile</button>
        </div>

        <div className="profile-content">
          <section className="reading-stats">
            <h2>Reading Statistics</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Books Read</h3>
                <p className="stat-number">{userData.readingStats.booksRead}</p>
              </div>
              <div className="stat-card">
                <h3>Currently Reading</h3>
                <p className="stat-number">{userData.readingStats.currentlyReading}</p>
              </div>
              <div className="stat-card">
                <h3>Want to Read</h3>
                <p className="stat-number">{userData.readingStats.wantToRead}</p>
              </div>
            </div>
            <div className="favorite-genres">
              <h3>Favorite Genres</h3>
              <div className="genre-tags">
                {userData.readingStats.favoriteGenres.map((genre, index) => (
                  <span key={index} className="genre-tag">{genre}</span>
                ))}
              </div>
            </div>
          </section>

          <section className="recent-activity">
            <h2>Recent Activity</h2>
            <div className="activity-list">
              {userData.recentActivity.map((activity) => (
                <div key={activity.id} className="activity-item">
                  <div className="activity-icon">
                    {activity.type === 'book_finished' && '📖'}
                    {activity.type === 'club_joined' && '👥'}
                    {activity.type === 'review_posted' && '✍️'}
                  </div>
                  <div className="activity-content">
                    <p className="activity-text">
                      {activity.type === 'book_finished' && 
                        `Finished reading "${activity.book}" by ${activity.author}`}
                      {activity.type === 'club_joined' && 
                        `Joined the book club "${activity.club}"`}
                      {activity.type === 'review_posted' && 
                        `Posted a review for "${activity.book}" by ${activity.author}`}
                    </p>
                    <p className="activity-date">{activity.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
