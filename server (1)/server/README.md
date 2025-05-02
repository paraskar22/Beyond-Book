# Book Club API

A RESTful API for a book club application that allows users to manage books, join book clubs, participate in discussions, and buy/sell books in a marketplace.

## Features

- User authentication and authorization
- Book management (CRUD operations)
- Book club management
- Discussion forums
- Author profiles and events
- Marketplace for buying/selling books
- Reading lists and achievements
- Reviews and ratings

## Prerequisites

- Node.js (>=14.0.0)
- MySQL (>=5.7)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd book-club-api
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=book_club_db
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=24h
JWT_REFRESH_EXPIRES_IN=7d
PORT=3000
NODE_ENV=development
```

4. Create the database and run migrations:
```bash
mysql -u your_db_user -p < app/config/database.sql
```

5. Start the server:
```bash
npm start
```

For development:
```bash
npm run dev
```

## API Documentation

### Authentication
- POST /api/auth/signup - Register a new user
- POST /api/auth/login - Login user
- POST /api/auth/logout - Logout user
- POST /api/auth/refresh-token - Refresh access token
- POST /api/auth/forgot-password - Request password reset
- POST /api/auth/reset-password - Reset password

### Users
- GET /api/users/profile - Get user profile
- PUT /api/users/profile - Update user profile
- GET /api/users/reading-list - Get user's reading list
- POST /api/users/reading-list - Add book to reading list
- DELETE /api/users/reading-list/:bookId - Remove book from reading list
- GET /api/users/achievements - Get user's achievements

### Books
- GET /api/books - Get all books
- POST /api/books - Create a new book
- GET /api/books/:id - Get book by ID
- PUT /api/books/:id - Update book
- DELETE /api/books/:id - Delete book
- GET /api/books/:id/reviews - Get book reviews
- POST /api/books/:id/reviews - Add book review
- GET /api/books/recommendations - Get book recommendations

### Book Clubs
- GET /api/book-clubs - Get all book clubs
- POST /api/book-clubs - Create a new book club
- GET /api/book-clubs/:id - Get book club by ID
- PUT /api/book-clubs/:id - Update book club
- DELETE /api/book-clubs/:id - Delete book club
- POST /api/book-clubs/:id/join - Join book club
- POST /api/book-clubs/:id/leave - Leave book club
- GET /api/book-clubs/:id/members - Get book club members
- GET /api/book-clubs/:id/schedule - Get reading schedule
- POST /api/book-clubs/:id/schedule - Add to reading schedule

### Discussions
- GET /api/discussions - Get all discussions
- POST /api/discussions - Create a new discussion
- GET /api/discussions/:id - Get discussion by ID
- PUT /api/discussions/:id - Update discussion
- DELETE /api/discussions/:id - Delete discussion
- POST /api/discussions/:id/comments - Add comment
- GET /api/discussions/:id/comments - Get comments
- GET /api/discussions/tags - Get popular tags
- GET /api/discussions/tags/:tag - Get discussions by tag

### Authors
- GET /api/authors - Get all authors
- POST /api/authors - Create author profile
- GET /api/authors/:id - Get author by ID
- PUT /api/authors/:id - Update author profile
- GET /api/authors/:id/books - Get author's books
- POST /api/authors/:id/books - Add book to author
- GET /api/authors/:id/events - Get author's events
- POST /api/authors/:id/events - Create author event
- POST /api/authors/:id/follow - Follow author
- DELETE /api/authors/:id/follow - Unfollow author
- GET /api/authors/:id/followers - Get author's followers

### Marketplace
- GET /api/marketplace/listings - Get all listings
- POST /api/marketplace/listings - Create a new listing
- GET /api/marketplace/listings/:id - Get listing by ID
- PUT /api/marketplace/listings/:id - Update listing
- DELETE /api/marketplace/listings/:id - Delete listing
- POST /api/marketplace/listings/:id/order - Create order
- GET /api/marketplace/orders/:id - Get order by ID
- PUT /api/marketplace/orders/:id/status - Update order status
- GET /api/marketplace/user/listings - Get user's listings
- GET /api/marketplace/user/orders - Get user's orders
- GET /api/marketplace/search - Search listings
- GET /api/marketplace/filter - Filter listings

## Testing

Run tests using:
```bash
npm test
```

## Security

- JWT-based authentication
- Password hashing with bcrypt
- CORS enabled
- Helmet for security headers
- Input validation with Joi
- Rate limiting (to be implemented)
- SQL injection prevention
- XSS protection

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 