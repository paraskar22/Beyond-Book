const User = require('../models/user.model');
const pool = require('../config/db.config');

class UserController {
    static async getProfile(req, res) {
        try {
            const user = await User.findById(req.user.userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Remove sensitive information
            const { password_hash, ...userData } = user;
            res.json(userData);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching user profile', error: error.message });
        }
    }

    static async updateProfile(req, res) {
        try {
            const userId = req.user.userId;
            await User.update(userId, req.body);
            const updatedUser = await User.findById(userId);
            
            // Remove sensitive information
            const { password_hash, ...userData } = updatedUser;
            res.json(userData);
        } catch (error) {
            res.status(500).json({ message: 'Error updating profile', error: error.message });
        }
    }

    static async getReadingList(req, res) {
        try {
            const [rows] = await pool.execute(
                `SELECT b.*, url.status 
                 FROM user_reading_list url
                 JOIN books b ON url.book_id = b.book_id
                 WHERE url.user_id = ?`,
                [req.user.userId]
            );
            res.json(rows);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching reading list', error: error.message });
        }
    }

    static async addToReadingList(req, res) {
        try {
            const { book_id, status } = req.body;
            await pool.execute(
                `INSERT INTO user_reading_list (user_id, book_id, status)
                 VALUES (?, ?, ?)
                 ON DUPLICATE KEY UPDATE status = ?`,
                [req.user.userId, book_id, status, status]
            );
            res.status(201).json({ message: 'Book added to reading list' });
        } catch (error) {
            res.status(500).json({ message: 'Error adding book to reading list', error: error.message });
        }
    }

    static async removeFromReadingList(req, res) {
        try {
            const { bookId } = req.params;
            await pool.execute(
                'DELETE FROM user_reading_list WHERE user_id = ? AND book_id = ?',
                [req.user.userId, bookId]
            );
            res.json({ message: 'Book removed from reading list' });
        } catch (error) {
            res.status(500).json({ message: 'Error removing book from reading list', error: error.message });
        }
    }

    static async getAchievements(req, res) {
        try {
            const [rows] = await pool.execute(
                `SELECT a.*, ua.earned_at 
                 FROM achievements a
                 JOIN user_achievements ua ON a.achievement_id = ua.achievement_id
                 WHERE ua.user_id = ?`,
                [req.user.userId]
            );
            res.json(rows);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching achievements', error: error.message });
        }
    }

    static async getUserBookClubs(req, res) {
        try {
            const [rows] = await pool.execute(
                `SELECT bc.*, bcm.role 
                 FROM book_clubs bc
                 JOIN book_club_members bcm ON bc.club_id = bcm.club_id
                 WHERE bcm.user_id = ?`,
                [req.user.userId]
            );
            res.json(rows);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching book clubs', error: error.message });
        }
    }

    static async getUserDiscussions(req, res) {
        try {
            const [rows] = await pool.execute(
                `SELECT d.*, COUNT(c.comment_id) as comment_count
                 FROM discussions d
                 LEFT JOIN comments c ON d.discussion_id = c.discussion_id
                 WHERE d.created_by = ?
                 GROUP BY d.discussion_id`,
                [req.user.userId]
            );
            res.json(rows);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching discussions', error: error.message });
        }
    }
}

module.exports = UserController; 