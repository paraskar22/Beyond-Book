import React, { useState } from "react";
import "./Recommendations.css";

function Recommendations() {
  const [recommendations] = useState([
    {
      id: 1,
      title: "The Midnight Library",
      author: "Matt Haig",
      genre: "Fantasy",
      rating: 4.5,
      description:
        "A library between life and death, and the infinite possibilities of being.",
      coverImage: "/images/book1.jpg",
    },
    {
      id: 2,
      title: "Project Hail Mary",
      author: "Andy Weir",
      genre: "Science Fiction",
      rating: 4.8,
      description:
        "A lone astronaut must save humanity from a catastrophic event.",
      coverImage: "/images/book2.jpg",
    },
    {
      id: 3,
      title: "Klara and the Sun",
      author: "Kazuo Ishiguro",
      genre: "Literary Fiction",
      rating: 4.3,
      description:
        "An AI's quest to understand the complexities of human love.",
      coverImage: "/images/book3.jpg",
    },
  ]);

  return (
    <div className="recommendations">
      <header className="recommendations-header">
        <h1>Book Recommendations</h1>
        <p>
          Personalized book suggestions based on your reading history and
          preferences
        </p>
      </header>

      <div className="filters">
        <select className="filter-select">
          <option value="">All Genres</option>
          <option value="fiction">Fiction</option>
          <option value="non-fiction">Non-Fiction</option>
          <option value="science-fiction">Science Fiction</option>
          <option value="fantasy">Fantasy</option>
        </select>
        <select className="filter-select">
          <option value="">Sort By</option>
          <option value="rating">Rating</option>
          <option value="newest">Newest</option>
          <option value="popular">Most Popular</option>
        </select>
      </div>

      <div className="recommendations-grid">
        {recommendations.map((book) => (
          <div key={book.id} className="book-card">
            <div className="book-cover">
              <img src={book.coverImage} alt={book.title} />
            </div>
            <div className="book-info">
              <h3>{book.title}</h3>
              <p className="author">by {book.author}</p>
              <p className="genre">{book.genre}</p>
              <div className="rating">
                <span>★</span>
                <span>{book.rating}</span>
              </div>
              <p className="description">{book.description}</p>
              <div className="book-actions">
                <button className="btn primary">Add to Reading List</button>
                <button className="btn secondary">View Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recommendations;
