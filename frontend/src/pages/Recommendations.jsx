import React from 'react';
import { Link } from 'react-router-dom';
import './Recommendations.css';

const Recommendations = () => {
  const recommendations = [
    {
      id: 1,
      title: "The Midnight Library",
      author: "Matt Haig",
      coverImage: "https://images-na.ssl-images-amazon.com/images/I/81YkqyaFVEL._AC_UL600_SR600,600_.jpg",
      description: "A dazzling novel about all the choices that go into a life well lived."
    },
    {
      id: 2,
      title: "Project Hail Mary",
      author: "Andy Weir",
      coverImage: "https://images-na.ssl-images-amazon.com/images/I/91p5b0UgbKL._AC_UL600_SR600,600_.jpg",
      description: "A lone astronaut must save the earth from disaster in this incredible new science-based thriller."
    },
    {
      id: 3,
      title: "Klara and the Sun",
      author: "Kazuo Ishiguro",
      coverImage: "https://images-na.ssl-images-amazon.com/images/I/81Kc8OsbDxL._AC_UL600_SR600,600_.jpg",
      description: "A magnificent new novel from the Nobel laureate Kazuo Ishiguro."
    }
  ];

  return (
    <div className="recommendations">
      <h1>Book Recommendations</h1>
      <div className="recommendations-grid">
        {recommendations.map((book) => (
          <div key={book.id} className="book-card">
            <img src={book.coverImage} alt={book.title} className="book-cover" />
            <div className="book-info">
              <h2>{book.title}</h2>
              <p className="author">by {book.author}</p>
              <p className="description">{book.description}</p>
              <Link to={`/book/${book.id}`} className="btn primary">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
