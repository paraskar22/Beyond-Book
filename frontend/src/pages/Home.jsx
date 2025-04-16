import React from 'react';
import { Link } from 'react-router-dom';
import { FaBook, FaUsers, FaComments, FaCalendarAlt, FaStar, FaArrowRight, FaUserFriends, FaStore, FaRegCalendarAlt } from 'react-icons/fa';
import './Home.css';
import Navbar from '../components/Navbar';

function Home() {
  return (
    <div className="home">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <CommunitySection />
      <EventsSection />
      <TestimonialsSection />
      <CtaSection />
      {/* Footer component will be added later */}
    </div>
  );
}

// Hero Section
function HeroSection() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1>Welcome to Beyond the Book</h1>
          <p>Where reading becomes a shared adventure. Join our community of book lovers, explore new worlds, and connect with fellow readers.</p>
          <div className="hero-buttons">
            <Link to="/book-clubs" className="btn btn-primary">Explore Book Clubs</Link>
            <Link to="/recommendations" className="btn btn-secondary">Get Recommendations</Link>
          </div>
        </div>
        <div className="hero-image">
          <div className="book-stack-visual"></div>
        </div>
      </div>
    </section>
  );
}

// About Section
function AboutSection() {
  return (
    <section className="about-section">
      <div className="container">
        <div className="about-content">
          <h2>About Beyond the Book</h2>
          <p>Founded in 2023, Beyond the Book is more than just a reading platform. We're a vibrant community dedicated to bringing readers together, celebrating literature in all its forms, and creating meaningful connections through the power of books.</p>
          <p>Our mission is to transform the solitary act of reading into a shared experience that enriches lives and broadens perspectives.</p>
          <div className="about-stats">
            <div className="stat-item">
              <span className="stat-number">50K+</span>
              <span className="stat-label">Readers</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">10K+</span>
              <span className="stat-label">Books Discussed</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">5K+</span>
              <span className="stat-label">Author Engagements</span>
            </div>
          </div>
        </div>
        <div className="about-image">
          <div className="image-placeholder"></div>
        </div>
      </div>
    </section>
  );
}

// Features Section
function FeaturesSection() {
  const features = [
    {
      icon: <FaUsers />,
      title: "Book Clubs",
      description: "Join vibrant discussions with readers who share your literary interests, from classic literature to the latest bestsellers."
    },
    {
      icon: <FaStar />,
      title: "Personalized Recommendations",
      description: "Discover your next favorite read with our AI-powered recommendation system tailored to your unique reading preferences."
    },
    {
      icon: <FaUserFriends />,
      title: "Author Engagement",
      description: "Connect directly with your favorite authors through exclusive Q&A sessions, virtual book signings, and live readings."
    },
    {
      icon: <FaStore />,
      title: "Book Marketplace",
      description: "Browse, buy, sell, or trade books with other members in our community-driven marketplace."
    }
  ];

  return (
    <section className="features-section">
      <div className="container">
        <h2>What We Offer</h2>
        <p className="section-subtitle">Discover all the ways you can engage with literature and fellow readers</p>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <div className="feature-card" key={index}>
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <Link to={`/${feature.title.toLowerCase().replace(' ', '-')}`} className="feature-link">
                Learn more <FaArrowRight className="arrow-icon" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Community Section
function CommunitySection() {
  return (
    <section className="community-section">
      <div className="container">
        <div className="community-content">
          <h2>Join Our Growing Community</h2>
          <p>Connect with book lovers from around the world, share your reading journey, and discover new perspectives. Our community celebrates diverse voices and fosters meaningful conversations about literature.</p>
          
          <div className="community-stats">
            <div className="stat-card">
              <FaUsers className="stat-icon" />
              <div className="stat-number">15K+</div>
              <div className="stat-label">Active Members</div>
            </div>
            
            <div className="stat-card">
              <FaBook className="stat-icon" />
              <div className="stat-number">500+</div>
              <div className="stat-label">Book Clubs</div>
            </div>
            
            <div className="stat-card">
              <FaComments className="stat-icon" />
              <div className="stat-number">2M+</div>
              <div className="stat-label">Discussions</div>
            </div>
            
            <div className="stat-card">
              <FaCalendarAlt className="stat-icon" />
              <div className="stat-number">300+</div>
              <div className="stat-label">Monthly Events</div>
            </div>
          </div>
          
          <div className="community-quote">
            <blockquote>
              "Reading is not just about books; it's about connecting, sharing, and growing together."
            </blockquote>
            <cite>— Book Lovers Community</cite>
          </div>
          
          <Link to="/book-clubs" className="btn btn-primary">
            Explore Book Clubs
          </Link>
        </div>
      </div>
    </section>
  );
}

// Events Section
function EventsSection() {
  const upcomingEvents = [
    {
      title: "Fantasy Book Club: Dragons & Myths",
      date: "April 22, 2025",
      time: "7:00 PM EST",
      type: "Virtual"
    },
    {
      title: "Author Spotlight: Sarah Johnson",
      date: "April 25, 2025",
      time: "6:30 PM EST",
      type: "Live Q&A"
    },
    {
      title: "Classic Literature Deep Dive",
      date: "May 3, 2025",
      time: "3:00 PM EST",
      type: "Discussion"
    }
  ];

  return (
    <section className="events-section">
      <div className="container">
        <h2>Upcoming Events</h2>
        <p className="section-subtitle">Join our virtual and in-person gatherings to discuss, learn, and connect</p>
        
        <div className="events-grid">
          {upcomingEvents.map((event, index) => (
            <div className="event-card" key={index}>
              <div className="event-date">
                <FaRegCalendarAlt />
                <span>{event.date}</span>
              </div>
              <h3>{event.title}</h3>
              <div className="event-details">
                <span>{event.time}</span>
                <span className="event-type">{event.type}</span>
              </div>
              <Link to="/events" className="btn btn-outline">
                Join Event
              </Link>
            </div>
          ))}
        </div>
        
        <div className="view-all-events">
          <Link to="/events" className="btn btn-secondary">
            View All Events <FaArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}

// Testimonials Section
function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Beyond the Book completely transformed my reading experience. I've found amazing book recommendations and made friends who share my passion for mystery novels.",
      author: "Emma T.",
      location: "New York, USA"
    },
    {
      quote: "The author engagement sessions are incredible! Being able to ask questions directly to my favorite writers has been such a rewarding experience.",
      author: "Michael L.",
      location: "London, UK"
    },
    {
      quote: "I've been part of the sci-fi book club for 6 months now, and it's the highlight of my week. The discussions are insightful and have deepened my appreciation for the genre.",
      author: "Priya M.",
      location: "Toronto, Canada"
    }
  ];

  return (
    <section className="testimonials-section">
      <div className="container">
        <h2>What Our Members Say</h2>
        
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div className="testimonial-card" key={index}>
              <div className="quote-icon">"</div>
              <p className="testimonial-quote">{testimonial.quote}</p>
              <div className="testimonial-author">
                <span className="author-name">{testimonial.author}</span>
                <span className="author-location">{testimonial.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Call to Action Section
function CtaSection() {
  return (
    <section className="cta-section">
      <div className="container">
        <h2>Ready to Begin Your Reading Journey?</h2>
        <p>Join thousands of readers who have found their literary home with Beyond the Book.</p>
        <div className="cta-buttons">
          <Link to="/auth/register" className="btn btn-primary">
            Sign Up Now
          </Link>
          <Link to="/book-clubs" className="btn btn-secondary">
            Explore Book Clubs
          </Link>
        </div>
      </div>
    </section>
  );
}

// Footer
// function Footer() {
//   return (
//     <footer className="footer">
//       <div className="container">
//         <div className="footer-content">
//           <div className="footer-brand">
//             <Link to="/" className="footer-logo">
//               Beyond the Book
//             </Link>
//             <p>Connecting readers, one page at a time.</p>
//           </div>
          
//           <div className="footer-links">
//             <div className="footer-links-column">
//               <h3>Explore</h3>
//               <ul>
//                 <li><Link to="/book-clubs">Book Clubs</Link></li>
//                 <li><Link to="/recommendations">Recommendations</Link></li>
//                 <li><Link to="/author-engagement">Author Engagement</Link></li>
//                 <li><Link to="/book-marketplace">Marketplace</Link></li>
//               </ul>
//             </div>
            
//             <div className="footer-links-column">
//               <h3>Community</h3>
//               <ul>
//                 <li><Link to="/events">Events</Link></li>
//                 <li><Link to="/forums">Forums</Link></li>
//                 <li><Link to="/blog">Blog</Link></li>
//                 <li><Link to="/faq">FAQ</Link></li>
//               </ul>
//             </div>
            
//             <div className="footer-links-column">
//               <h3>Account</h3>
//               <ul>
//                 <li><Link to="/auth/login">Login</Link></li>
//                 <li><Link to="/auth/register">Register</Link></li>
//                 <li><Link to="/dashboard">Dashboard</Link></li>
//                 <li><Link to="/profile">Profile</Link></li>
//               </ul>
//             </div>
//           </div>
//         </div>
        
//         <div className="footer-bottom">
//           <p>© 2025 Beyond the Book. All rights reserved.</p>
//           <div className="footer-legal">
//             <Link to="/privacy">Privacy Policy</Link>
//             <Link to="/terms">Terms of Service</Link>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

export default Home;