const pool = require('../config/db.config');

class User {
    static async create(userData) {
        try {
            const { username, email, password, first_name, last_name, profile_picture = null, bio = null } = userData;
            
            // Validate required fields
            if (!username || !email || !password || !first_name || !last_name) {
                throw new Error('Missing required fields');
            }

            const [result] = await pool.execute(
                `INSERT INTO users (username, email, password, first_name, last_name, profile_picture, bio) 
                 VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [username, email, password, first_name, last_name, profile_picture, bio]
            );
            
            if (!result.insertId) {
                throw new Error('Failed to create user');
            }
            
            return result.insertId;
        } catch (error) {
            console.error('Error in User.create:', error);
            throw error;
        }
    }

    static async findByEmail(email) {
        const [rows] = await pool.execute(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );
        return rows[0];
    }

    static async findById(userId) {
        const [rows] = await pool.execute(
            'SELECT * FROM users WHERE user_id = ?',
            [userId]
        );
        return rows[0];
    }

    static async update(userId, userData) {
        const { first_name, last_name, profile_picture, bio, reading_preferences } = userData;
        await pool.execute(
            `UPDATE users 
             SET first_name = ?, last_name = ?, profile_picture = ?, bio = ?, reading_preferences = ?
             WHERE user_id = ?`,
            [first_name, last_name, profile_picture, bio, JSON.stringify(reading_preferences), userId]
        );
    }

    static async updatePassword(userId, password) {
        await pool.execute(
            'UPDATE users SET password = ? WHERE user_id = ?',
            [password, userId]
        );
    }

    static async delete(userId) {
        await pool.execute(
            'UPDATE users SET is_active = FALSE WHERE user_id = ?',
            [userId]
        );
    }
}

module.exports = User; 