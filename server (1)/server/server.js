const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

// Import database configuration
const pool = require('./app/config/db.config');

// Import routes
const authRoutes = require('./app/routes/auth.routes');
const userRoutes = require('./app/routes/user.routes');
const bookRoutes = require('./app/routes/book.routes');
const bookClubRoutes = require('./app/routes/bookClub.routes');
const discussionRoutes = require('./app/routes/discussion.routes');
const authorRoutes = require('./app/routes/author.routes');
const marketplaceRoutes = require('./app/routes/marketplace.routes');

const app = express();

// Test database connection
pool.getConnection()
    .then(connection => {
        console.log('Successfully connected to the database!');
        connection.release();
    })
    .catch(err => {
        console.error('Error connecting to the database:', err);
        process.exit(1);
    });

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/book-clubs', bookClubRoutes);
app.use('/api/discussions', discussionRoutes);
app.use('/api/authors', authorRoutes);
app.use('/api/marketplace', marketplaceRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 