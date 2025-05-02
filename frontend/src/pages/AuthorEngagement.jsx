import React, { useState } from "react";
import "./AuthorEngagement.css";

function AuthorEngagement() {
  const [events] = useState([
    {
      id: 1,
      title: "Book Launch: The Last Chapter",
      author: "Sarah Johnson",
      date: "June 10, 2023",
      time: "7:00 PM EST",
      type: "Virtual Launch",
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 2,
      title: "Q&A Session with Mystery Writers",
      author: "Michael Chen, Lisa Rodriguez",
      date: "June 15, 2023",
      time: "8:00 PM EST",
      type: "Panel Discussion",
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 3,
      title: "Writing Workshop: Crafting Memorable Characters",
      author: "Emily Parker",
      date: "June 20, 2023",
      time: "6:00 PM EST",
      type: "Workshop",
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
  ]);

  return (
    <div className="author-engagement">
      <header className="engagement-header">
        <h1>Author Engagement</h1>
        <p>
          Connect with your favorite authors through virtual events and
          discussions
        </p>
      </header>

      <div className="events-section">
        <h2>Upcoming Events</h2>
        <div className="events-grid">
          {events.map((event) => (
            <div key={event.id} className="event-card">
              <div className="event-image">
                <img src={event.image} alt={event.title} />
                <span className="event-type">{event.type}</span>
              </div>
              <div className="event-content">
                <h3>{event.title}</h3>
                <p className="event-author">with {event.author}</p>
                <div className="event-details">
                  <p>
                    <strong>Date:</strong> {event.date}
                  </p>
                  <p>
                    <strong>Time:</strong> {event.time}
                  </p>
                </div>
                <p className="event-description">{event.description}</p>
                <div className="event-actions">
                  <button className="btn primary">Register Now</button>
                  <button className="btn secondary">Add to Calendar</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="featured-authors">
        <h2>Featured Authors</h2>
        <div className="authors-grid">
          {/* Add featured authors section here */}
        </div>
      </div>
    </div>
  );
}

export default AuthorEngagement;
