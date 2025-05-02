import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { homeContent } from "../data/content";
import bookClubsImage from "../assets/images/book-clubs.jpeg";
import "./Home.css";

const Home = () => {
  const [bookClubs, setBookClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookClubs = async () => {
      try {
        const response = await fetch('/api/book-clubs/featured');
        if (!response.ok) {
          throw new Error('Failed to fetch book clubs');
        }
        const data = await response.json();
        setBookClubs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookClubs();
  }, []);

  const handleJoinBookClub = async (clubId) => {
    try {
      const response = await fetch('/api/book-clubs/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ clubId }),
        credentials: 'include', // Include cookies for authentication
      });

      if (!response.ok) {
        throw new Error('Failed to join book club');
      }

      // Update the book clubs list after joining
      const updatedClubs = bookClubs.map(club => 
        club.id === clubId ? { ...club, isMember: true } : club
      );
      setBookClubs(updatedClubs);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <img 
            src={bookClubsImage}
            alt="Book club meeting"
            className="hero-image"
          />
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <h1>Welcome to Beyond the Book</h1>
          <p>Discover, discuss, and connect with fellow book lovers</p>
          <div className="hero-buttons">
            <Link to="/auth/register" className="btn primary">
              Get Started
            </Link>
            <Link to="/features" className="btn secondary">
              Learn More
            </Link>
            {bookClubs.length > 0 && (
              <button 
                className="btn book-club-btn"
                onClick={() => handleJoinBookClub(bookClubs[0].id)}
                disabled={bookClubs[0]?.isMember}
              >
                {bookClubs[0]?.isMember ? 'Already Joined' : 'Join Featured Book Club'}
              </button>
            )}
          </div>
          {error && <div className="error-message">{error}</div>}
          {loading && <div className="loading-spinner">Loading...</div>}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <h2 className="section-title">Explore Our Features</h2>
        <div className="features-grid">
          {homeContent.features.map((feature) => (
            <Link to={feature.link} key={feature.id} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <img
                src={feature.image}
                alt={feature.title}
                className="feature-image"
              />
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Reading Challenges Section */}
      <section className="challenges">
        <h2 className="section-title">{homeContent.readingChallenges.title}</h2>
        <p className="section-description">
          {homeContent.readingChallenges.description}
        </p>
        <div className="challenges-grid">
          {homeContent.readingChallenges.challenges.map((challenge) => (
            <div key={challenge.id} className="challenge-card">
              <div className="challenge-badge">{challenge.badge}</div>
              <h3>{challenge.title}</h3>
              <p>{challenge.books} books to read</p>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="events-section">
        <div className="container">
          <h2>{homeContent.upcomingEvents.title}</h2>
          <p className="section-subtitle">
            {homeContent.upcomingEvents.description}
          </p>
          <div className="events-grid">
            {homeContent.upcomingEvents.events.map((event) => (
              <div key={event.id} className="event-card">
                <div className="event-date">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 448 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M148 288h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm108-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 96v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm192 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96-260v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h48V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h128V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h48c26.5 0 48 21.5 48 48zm-48 346V160H48v298c0 3.3 2.7 6 6 6h340c3.3 0 6-2.7 6-6z"></path>
                  </svg>
                  <span>{event.date}</span>
                </div>
                <h3>{event.title}</h3>
                <div className="event-details">
                  <span>{event.time}</span>
                  <span className="event-type">{event.type}</span>
                </div>
                <Link
                  to={event.link}
                  className="btn btn-outline"
                  data-discover="true"
                >
                  Join Event
                </Link>
              </div>
            ))}
          </div>
          <div className="view-all-events">
            <Link
              to="/events"
              className="btn btn-secondary"
              data-discover="true"
            >
              View All Events
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 448 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"></path>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2 className="section-title">What Our Members Say</h2>
        <div className="testimonials-grid">
          {homeContent.testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="testimonial-image"
              />
              <blockquote>{testimonial.quote}</blockquote>
              <div className="testimonial-author">
                <h4>{testimonial.name}</h4>
                <p>{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="cta-content">
          <h2>{homeContent.cta.title}</h2>
          <p>{homeContent.cta.description}</p>
          <Link to={homeContent.cta.button.link} className="btn primary">
            {homeContent.cta.button.text}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
