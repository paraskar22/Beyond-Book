const pool = require('../config/db.config');

class Review {
    static async create(reviewData) {
        const { book_id, user_id, rating, content } = reviewData;
        const [result] = await pool.execute(
            `INSERT INTO reviews (book_id, user_id, rating, content)
             VALUES (?, ?, ?, ?)`,
            [book_id, user_id, rating, content]
        );
        return result.insertId;
    }

    static async findById(reviewId) {
        const [rows] = await pool.execute(
            `SELECT r.*, u.username, u.profile_picture
             FROM reviews r
             JOIN users u ON r.user_id = u.user_id
             WHERE r.review_id = ?`,
            [reviewId]
        );
        return rows[0];
    }

    static async getBookReviews(bookId) {
        const [rows] = await pool.execute(
            `SELECT r.*, u.username, u.profile_picture
             FROM reviews r
             JOIN users u ON r.user_id = u.user_id
             WHERE r.book_id = ?
             ORDER BY r.created_at DESC`,
            [bookId]
        );
        return rows;
    }

    static async update(reviewId, reviewData) {
        const { rating, content } = reviewData;
        await pool.execute(
            `UPDATE reviews 
             SET rating = ?, content = ?, updated_at = CURRENT_TIMESTAMP
             WHERE review_id = ?`,
            [rating, content, reviewId]
        );
    }

    static async delete(reviewId) {
        await pool.execute(
            'DELETE FROM reviews WHERE review_id = ?',
            [reviewId]
        );
    }

    static async getUserReviews(userId) {
        const [rows] = await pool.execute(
            `SELECT r.*, b.title as book_title, b.cover_image
             FROM reviews r
             JOIN books b ON r.book_id = b.book_id
             WHERE r.user_id = ?
             ORDER BY r.created_at DESC`,
            [userId]
        );
        return rows;
    }

    static async getAverageRating(bookId) {
        const [rows] = await pool.execute(
            `SELECT AVG(rating) as average_rating, COUNT(*) as review_count
             FROM reviews
             WHERE book_id = ?`,
            [bookId]
        );
        return rows[0];
    }
}

module.exports = Review; 