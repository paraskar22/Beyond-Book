import React, { useState } from "react";
import "./UserProfile.css";

function UserProfile() {
  const [user] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    memberSince: "January 2024",
    readingStats: {
      booksRead: 25,
      currentlyReading: 3,
      wantToRead: 15,
      favoriteGenres: ["Science Fiction", "Mystery", "Literary Fiction"],
    },
    recentActivity: [
      {
        id: 1,
        type: "book_finished",
        book: "The Midnight Library",
        author: "Matt Haig",
        date: "2024-03-15",
      },
      {
        id: 2,
        type: "club_joined",
        club: "Science Fiction Enthusiasts",
        date: "2024-03-10",
      },
      {
        id: 3,
        type: "review_posted",
        book: "Project Hail Mary",
        author: "Andy Weir",
        date: "2024-03-05",
      },
    ],
  });

  return (
    <div className="user-profile">
      <div className="profile-header">
        <div className="profile-info">
          <h1>{user.name}</h1>
          <p className="email">{user.email}</p>
          <p className="member-since">Member since {user.memberSince}</p>
        </div>
        <button className="btn primary">Edit Profile</button>
      </div>

      <div className="profile-content">
        <section className="reading-stats">
          <h2>Reading Statistics</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <h3>Books Read</h3>
              <p className="stat-number">{user.readingStats.booksRead}</p>
            </div>
            <div className="stat-card">
              <h3>Currently Reading</h3>
              <p className="stat-number">
                {user.readingStats.currentlyReading}
              </p>
            </div>
            <div className="stat-card">
              <h3>Want to Read</h3>
              <p className="stat-number">{user.readingStats.wantToRead}</p>
            </div>
          </div>
          <div className="favorite-genres">
            <h3>Favorite Genres</h3>
            <div className="genre-tags">
              {user.readingStats.favoriteGenres.map((genre, index) => (
                <span key={index} className="genre-tag">
                  {genre}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="recent-activity">
          <h2>Recent Activity</h2>
          <div className="activity-list">
            {user.recentActivity.map((activity) => (
              <div key={activity.id} className="activity-item">
                <div className="activity-icon">
                  {activity.type === "book_finished" && "📖"}
                  {activity.type === "club_joined" && "👥"}
                  {activity.type === "review_posted" && "✍️"}
                </div>
                <div className="activity-content">
                  <p className="activity-text">
                    {activity.type === "book_finished" &&
                      `Finished reading "${activity.book}" by ${activity.author}`}
                    {activity.type === "club_joined" &&
                      `Joined the book club "${activity.club}"`}
                    {activity.type === "review_posted" &&
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
  );
}

export default UserProfile;
