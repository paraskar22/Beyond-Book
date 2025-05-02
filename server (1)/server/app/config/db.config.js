const mysql = require('mysql2/promise');
require('dotenv').config();

// Log the database configuration (without password)
console.log('Database Configuration:');
console.log('Host:', process.env.DB_HOST || 'localhost');
console.log('User:', process.env.DB_USER || 'root');
console.log('Database:', process.env.DB_NAME || 'book_club_db');

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'admin',
    database: process.env.DB_NAME || 'book_club_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Create tables if they don't exist
async function initializeDatabase() {
    try {
        const connection = await pool.getConnection();
        
        // Drop tables in correct order to handle foreign key constraints
        await connection.execute('SET FOREIGN_KEY_CHECKS = 0');
        
        // Drop all tables
        await connection.execute('DROP TABLE IF EXISTS reviews');
        await connection.execute('DROP TABLE IF EXISTS reading_list');
        await connection.execute('DROP TABLE IF EXISTS book_club_members');
        await connection.execute('DROP TABLE IF EXISTS book_clubs');
        await connection.execute('DROP TABLE IF EXISTS discussions');
        await connection.execute('DROP TABLE IF EXISTS books');
        await connection.execute('DROP TABLE IF EXISTS authors');
        await connection.execute('DROP TABLE IF EXISTS users');
        
        await connection.execute('SET FOREIGN_KEY_CHECKS = 1');
        
        // Create users table
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS users (
                user_id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(50) NOT NULL UNIQUE,
                email VARCHAR(100) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                first_name VARCHAR(50) NOT NULL,
                last_name VARCHAR(50) NOT NULL,
                profile_picture VARCHAR(255),
                bio TEXT,
                reading_preferences JSON,
                is_active BOOLEAN DEFAULT TRUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);

        // Create authors table
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS authors (
                author_id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                bio TEXT,
                profile_picture VARCHAR(255),
                website VARCHAR(255),
                social_media JSON,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);

        // Create books table
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS books (
                book_id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                author_id INT,
                isbn VARCHAR(20),
                description TEXT,
                cover_image VARCHAR(255),
                genre VARCHAR(50),
                publication_date DATE,
                publisher VARCHAR(100),
                page_count INT,
                language VARCHAR(50),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (author_id) REFERENCES authors(author_id) ON DELETE SET NULL
            )
        `);

        // Create reviews table
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS reviews (
                review_id INT AUTO_INCREMENT PRIMARY KEY,
                book_id INT NOT NULL,
                user_id INT NOT NULL,
                rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
                content TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (book_id) REFERENCES books(book_id) ON DELETE CASCADE,
                FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
            )
        `);

        // Create book clubs table
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS book_clubs (
                club_id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                description TEXT,
                cover_image VARCHAR(255),
                is_private BOOLEAN DEFAULT FALSE,
                max_members INT,
                created_by INT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (created_by) REFERENCES users(user_id) ON DELETE SET NULL
            )
        `);

        // Create book club members table
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS book_club_members (
                club_id INT,
                user_id INT,
                role ENUM('admin', 'member') DEFAULT 'member',
                joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (club_id, user_id),
                FOREIGN KEY (club_id) REFERENCES book_clubs(club_id) ON DELETE CASCADE,
                FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
            )
        `);

        // Create reading list table
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS reading_list (
                user_id INT,
                book_id INT,
                status ENUM('to_read', 'reading', 'completed') DEFAULT 'to_read',
                added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (user_id, book_id),
                FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
                FOREIGN KEY (book_id) REFERENCES books(book_id) ON DELETE CASCADE
            )
        `);

        // Create discussions table
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS discussions (
                discussion_id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                content TEXT NOT NULL,
                book_id INT,
                club_id INT,
                user_id INT NOT NULL,
                is_public BOOLEAN DEFAULT TRUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (book_id) REFERENCES books(book_id) ON DELETE SET NULL,
                FOREIGN KEY (club_id) REFERENCES book_clubs(club_id) ON DELETE SET NULL,
                FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
            )
        `);

        // Create author_followers table
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS author_followers (
                author_id INT NOT NULL,
                follower_id INT NOT NULL,
                followed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (author_id, follower_id),
                FOREIGN KEY (author_id) REFERENCES authors(author_id) ON DELETE CASCADE,
                FOREIGN KEY (follower_id) REFERENCES users(user_id) ON DELETE CASCADE
            )
        `);
        
        console.log('Database tables initialized successfully');
        connection.release();
    } catch (error) {
        console.error('Error initializing database:', error);
        process.exit(1);
    }
}

// Initialize database and test connection
initializeDatabase()
    .then(() => pool.getConnection())
    .then(connection => {
        console.log('Database connection successful!');
        connection.release();
    })
    .catch(err => {
        console.error('Database connection failed:', err.message);
        console.error('Please check your MySQL installation and credentials');
        process.exit(1);
    });

module.exports = pool; 