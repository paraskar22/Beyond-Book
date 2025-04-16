import React, { useState } from "react";
import "./BookClubs.css";

function BookClubs() {
  const [clubs] = useState([
    {
      id: 1,
      name: "Science Fiction Enthusiasts",
      members: 156,
      currentBook: "Dune",
      description:
        "A club for sci-fi lovers to discuss classic and contemporary science fiction.",
      meetingTime: "Every Thursday at 7 PM",
    },
    {
      id: 2,
      name: "Classic Literature Circle",
      members: 89,
      currentBook: "Pride and Prejudice",
      description:
        "Exploring timeless literary masterpieces and their impact on modern literature.",
      meetingTime: "Every Sunday at 2 PM",
    },
    {
      id: 3,
      name: "Contemporary Fiction",
      members: 234,
      currentBook: "Tomorrow, and Tomorrow, and Tomorrow",
      description: "Discussing modern fiction and emerging authors.",
      meetingTime: "Every Tuesday at 6 PM",
    },
  ]);

  return (
    <div className="book-clubs">
      <header className="clubs-header">
        <h1>Book Clubs</h1>
        <button className="btn primary">Create New Club</button>
      </header>

      <div className="clubs-grid">
        {clubs.map((club) => (
          <div key={club.id} className="club-card">
            <h3>{club.name}</h3>
            <div className="club-info">
              <p>
                <strong>Current Book:</strong> {club.currentBook}
              </p>
              <p>
                <strong>Members:</strong> {club.members}
              </p>
              <p>
                <strong>Meeting Time:</strong> {club.meetingTime}
              </p>
            </div>
            <p className="club-description">{club.description}</p>
            <div className="club-actions">
              <button className="btn secondary">Join Club</button>
              <button className="btn primary">View Details</button>
            </div>
          </div>
        ))}
      </div>

      <div className="create-club-modal" style={{ display: "none" }}>
        {/* Modal content will be added later */}
      </div>
    </div>
  );
}

export default BookClubs;
