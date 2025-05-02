const pool = require('../config/db.config');

class Author {
    static async create(authorData) {
        const { name, bio, profile_picture, website, social_media } = authorData;
        const [result] = await pool.execute(
            `INSERT INTO authors (name, bio, profile_picture, website, social_media)
             VALUES (?, ?, ?, ?, ?)`,
            [name, bio, profile_picture, website, JSON.stringify(social_media)]
        );
        return result.insertId;
    }

    static async findById(authorId) {
        const [rows] = await pool.execute(
            `SELECT a.*, 
                    COUNT(DISTINCT b.book_id) as book_count,
                    COUNT(DISTINCT f.follower_id) as follower_count
             FROM authors a
             LEFT JOIN books b ON a.author_id = b.author_id
             LEFT JOIN author_followers f ON a.author_id = f.author_id
             WHERE a.author_id = ?
             GROUP BY a.author_id`,
            [authorId]
        );
        return rows[0];
    }

    static async getAllAuthors() {
        const [rows] = await pool.execute(
            `SELECT a.*, 
                    COUNT(DISTINCT b.book_id) as book_count,
                    COUNT(DISTINCT f.follower_id) as follower_count
             FROM authors a
             LEFT JOIN books b ON a.author_id = b.author_id
             LEFT JOIN author_followers f ON a.author_id = f.author_id
             GROUP BY a.author_id
             ORDER BY a.name ASC`
        );
        return rows;
    }

    static async update(authorId, authorData) {
        const { name, bio, profile_picture, website, social_media } = authorData;
        await pool.execute(
            `UPDATE authors 
             SET name = ?, bio = ?, profile_picture = ?, website = ?, social_media = ?
             WHERE author_id = ?`,
            [name, bio, profile_picture, website, JSON.stringify(social_media), authorId]
        );
    }

    static async delete(authorId) {
        await pool.execute(
            'DELETE FROM authors WHERE author_id = ?',
            [authorId]
        );
    }

    static async addBook(bookData) {
        const { author_id, title, isbn, description, cover_image, genre, publication_date, publisher, page_count, language } = bookData;
        const [result] = await pool.execute(
            `INSERT INTO books (author_id, title, isbn, description, cover_image, genre, 
                              publication_date, publisher, page_count, language)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [author_id, title, isbn, description, cover_image, genre, 
             publication_date, publisher, page_count, language]
        );
        return result.insertId;
    }

    static async getAuthorBooks(authorId) {
        const [rows] = await pool.execute(
            `SELECT b.*, 
                    AVG(r.rating) as average_rating,
                    COUNT(DISTINCT r.review_id) as review_count
             FROM books b
             LEFT JOIN reviews r ON b.book_id = r.book_id
             WHERE b.author_id = ?
             GROUP BY b.book_id
             ORDER BY b.publication_date DESC`,
            [authorId]
        );
        return rows;
    }

    static async updateBook(bookId, bookData) {
        const { title, isbn, description, cover_image, genre, publication_date, publisher, page_count, language } = bookData;
        await pool.execute(
            `UPDATE books 
             SET title = ?, isbn = ?, description = ?, cover_image = ?, genre = ?,
                 publication_date = ?, publisher = ?, page_count = ?, language = ?
             WHERE book_id = ?`,
            [title, isbn, description, cover_image, genre, 
             publication_date, publisher, page_count, language, bookId]
        );
    }

    static async removeBook(bookId) {
        await pool.execute(
            'DELETE FROM books WHERE book_id = ?',
            [bookId]
        );
    }

    static async createEvent(eventData) {
        const { author_id, title, description, event_date, location, event_type } = eventData;
        const [result] = await pool.execute(
            `INSERT INTO author_events (author_id, title, description, event_date, location, event_type)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [author_id, title, description, event_date, location, event_type]
        );
        return result.insertId;
    }

    static async getAuthorEvents(authorId) {
        const [rows] = await pool.execute(
            `SELECT ae.*, COUNT(DISTINCT aer.user_id) as attendee_count
             FROM author_events ae
             LEFT JOIN author_event_registrations aer ON ae.event_id = aer.event_id
             WHERE ae.author_id = ?
             GROUP BY ae.event_id
             ORDER BY ae.event_date ASC`,
            [authorId]
        );
        return rows;
    }

    static async updateEvent(eventId, eventData) {
        const { title, description, event_date, location, event_type } = eventData;
        await pool.execute(
            `UPDATE author_events 
             SET title = ?, description = ?, event_date = ?, location = ?, event_type = ?
             WHERE event_id = ?`,
            [title, description, event_date, location, event_type, eventId]
        );
    }

    static async deleteEvent(eventId) {
        await pool.execute(
            'DELETE FROM author_events WHERE event_id = ?',
            [eventId]
        );
    }

    static async getFollowers(authorId) {
        const [rows] = await pool.execute(
            `SELECT u.*, af.followed_at
             FROM author_followers af
             JOIN users u ON af.follower_id = u.user_id
             WHERE af.author_id = ?
             ORDER BY af.followed_at DESC`,
            [authorId]
        );
        return rows;
    }

    static async followAuthor(authorId, userId) {
        await pool.execute(
            `INSERT INTO author_followers (author_id, follower_id)
             VALUES (?, ?)`,
            [authorId, userId]
        );
    }

    static async unfollowAuthor(authorId, userId) {
        await pool.execute(
            'DELETE FROM author_followers WHERE author_id = ? AND follower_id = ?',
            [authorId, userId]
        );
    }
}

module.exports = Author; 