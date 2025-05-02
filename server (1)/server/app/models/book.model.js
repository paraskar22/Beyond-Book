const pool = require('../config/db.config');

class Book {
    static async create(bookData) {
        const { title, author_id, isbn, description, cover_image, genre, publication_date, publisher, page_count, language } = bookData;
        const [result] = await pool.execute(
            `INSERT INTO books (title, author_id, isbn, description, cover_image, genre, publication_date, publisher, page_count, language)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [title, author_id, isbn, description, cover_image, genre, publication_date, publisher, page_count, language]
        );
        return result.insertId;
    }

    static async findById(bookId) {
        const [rows] = await pool.execute(
            'SELECT * FROM books WHERE book_id = ?',
            [bookId]
        );
        return rows[0];
    }

    static async findByAuthor(authorId) {
        const [rows] = await pool.execute(
            'SELECT * FROM books WHERE author_id = ?',
            [authorId]
        );
        return rows;
    }

    static async update(bookId, bookData) {
        const { title, description, cover_image, genre, publication_date, publisher, page_count, language } = bookData;
        await pool.execute(
            `UPDATE books 
             SET title = ?, description = ?, cover_image = ?, genre = ?, publication_date = ?,
                 publisher = ?, page_count = ?, language = ?
             WHERE book_id = ?`,
            [title, description, cover_image, genre, publication_date, publisher, page_count, language, bookId]
        );
    }

    static async delete(bookId) {
        await pool.execute(
            'DELETE FROM books WHERE book_id = ?',
            [bookId]
        );
    }

    static async getTrendingBooks(limit = 10) {
        const [rows] = await pool.execute(
            `SELECT b.*, COUNT(br.review_id) as review_count, AVG(br.rating) as average_rating
             FROM books b
             LEFT JOIN book_reviews br ON b.book_id = br.book_id
             GROUP BY b.book_id
             ORDER BY review_count DESC, average_rating DESC
             LIMIT ?`,
            [limit]
        );
        return rows;
    }

    static async getNewReleases(limit = 10) {
        const [rows] = await pool.execute(
            `SELECT * FROM books 
             ORDER BY publication_date DESC 
             LIMIT ?`,
            [limit]
        );
        return rows;
    }
}

module.exports = Book; 