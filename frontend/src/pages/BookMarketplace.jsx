import React, { useState } from "react";
import "./BookMarketplace.css";

function BookMarketplace() {
  const [listings] = useState([
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      condition: "Like New",
      price: 12.99,
      seller: "John Doe",
      location: "New York, NY",
      image: "/images/book1.jpg",
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      condition: "Good",
      price: 8.99,
      seller: "Jane Smith",
      location: "Los Angeles, CA",
      image: "/images/book2.jpg",
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell",
      condition: "Very Good",
      price: 10.99,
      seller: "Mike Johnson",
      location: "Chicago, IL",
      image: "/images/book3.jpg",
    },
  ]);

  return (
    <div className="book-marketplace">
      <header className="marketplace-header">
        <h1>Book Marketplace</h1>
        <p>Buy, sell, and exchange books with other members</p>
      </header>

      <div className="marketplace-actions">
        <button className="btn primary">List a Book</button>
        <div className="search-filters">
          <input
            type="text"
            placeholder="Search books..."
            className="search-input"
          />
          <select className="filter-select">
            <option value="">All Conditions</option>
            <option value="new">New</option>
            <option value="like-new">Like New</option>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
          </select>
          <select className="filter-select">
            <option value="">Sort By</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="newest">Newest First</option>
          </select>
        </div>
      </div>

      <div className="listings-grid">
        {listings.map((book) => (
          <div key={book.id} className="listing-card">
            <div className="listing-image">
              <img src={book.image} alt={book.title} />
              <span className="condition-badge">{book.condition}</span>
            </div>
            <div className="listing-content">
              <h3>{book.title}</h3>
              <p className="author">by {book.author}</p>
              <div className="listing-details">
                <p className="price">${book.price}</p>
                <p className="seller">Seller: {book.seller}</p>
                <p className="location">{book.location}</p>
              </div>
              <div className="listing-actions">
                <button className="btn primary">Contact Seller</button>
                <button className="btn secondary">View Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookMarketplace;
