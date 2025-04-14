import React from "react";
import { Link } from "react-router-dom";
import { homeContent } from "../data/content";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <section
        className="hero"
        style={{ backgroundImage: `url(${homeContent.hero.backgroundImage})` }}
      >
        <div className="hero-content">
          <h1 className="animate-slide-in">{homeContent.hero.title}</h1>
          <h2 className="animate-slide-in">{homeContent.hero.subtitle}</h2>
          <p className="animate-slide-in">{homeContent.hero.description}</p>
          <div className="hero-buttons">
            <Link to="/book-clubs" className="btn primary">
              {homeContent.hero.primaryButton}
            </Link>
            <Link to="/recommendations" className="btn secondary">
              {homeContent.hero.secondaryButton}
            </Link>
          </div>
        </div>
      </section>

      <section className="features">
        <h2>Our Features</h2>
        <div className="features-grid">
          {homeContent.features.map((feature) => (
            <div key={feature.id} className="feature-card animate-fade-in">
              <div className="feature-image">
                <img src={feature.image} alt={feature.title} />
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <div className="feature-icon">{feature.icon}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="cta">
        <div className="cta-content">
          <h2>{homeContent.cta.title}</h2>
          <p>{homeContent.cta.description}</p>
          <Link to="/profile" className="btn primary">
            {homeContent.cta.button}
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
