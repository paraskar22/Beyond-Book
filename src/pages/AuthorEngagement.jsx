import React, { useState } from "react";
import "./AuthorEngagement.css";

function AuthorEngagement() {
  const [events] = useState([
    {
      id: 1,
      title: "Virtual Book Launch: The Last Chapter",
      author: "Sarah Johnson",
      date: "2024-04-15",
      time: "7:00 PM EST",
      type: "Book Launch",
      description:
        "Join us for the virtual launch of Sarah Johnson's latest novel, followed by a Q&A session.",
      image: "/images/event1.jpg",
    },
    {
      id: 2,
      title: "Writing Workshop with James Wilson",
      author: "James Wilson",
      date: "2024-04-20",
      time: "2:00 PM EST",
      type: "Workshop",
      description:
        "Learn the art of character development in this interactive writing workshop.",
      image: "/images/event2.jpg",
    },
    {
      id: 3,
      title: "Author Meet & Greet: Science Fiction Panel",
      author: "Multiple Authors",
      date: "2024-04-25",
      time: "6:00 PM EST",
      type: "Panel Discussion",
      description:
        "A panel discussion with leading science fiction authors about the future of the genre.",
      image: "/images/event3.jpg",
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
