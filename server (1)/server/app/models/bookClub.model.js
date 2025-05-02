const pool = require('../config/db.config');

class BookClub {
    static async create(bookClubData) {
        const { 
            name, 
            description, 
            created_by, 
            cover_image = null, 
            is_private = false, 
            max_members = null 
        } = bookClubData;

        // Ensure all values are properly set and typed
        const values = [
            name,
            description || null,
            created_by ? parseInt(created_by) : null,
            cover_image,
            is_private,
            max_members
        ];
        
        const [result] = await pool.execute(
            `INSERT INTO book_clubs (name, description, created_by, cover_image, is_private, max_members)
             VALUES (?, ?, ?, ?, ?, ?)`,
            values
        );
        return result.insertId;
    }

    static async findById(clubId) {
        const [rows] = await pool.execute(
            `SELECT bc.*, u.username as creator_username, 
                    COUNT(bcm.user_id) as member_count
             FROM book_clubs bc
             LEFT JOIN users u ON bc.created_by = u.user_id
             LEFT JOIN book_club_members bcm ON bc.club_id = bcm.club_id
             WHERE bc.club_id = ?
             GROUP BY bc.club_id`,
            [clubId]
        );
        return rows[0];
    }

    static async getAllBookClubs() {
        const [rows] = await pool.execute(
            `SELECT bc.*, u.username as creator_username, 
                    COUNT(bcm.user_id) as member_count
             FROM book_clubs bc
             LEFT JOIN users u ON bc.created_by = u.user_id
             LEFT JOIN book_club_members bcm ON bc.club_id = bcm.club_id
             GROUP BY bc.club_id`
        );
        return rows;
    }

    static async update(clubId, bookClubData) {
        const { name, description, cover_image, is_private, max_members } = bookClubData;
        await pool.execute(
            `UPDATE book_clubs 
             SET name = ?, description = ?, cover_image = ?, is_private = ?, max_members = ?
             WHERE club_id = ?`,
            [name, description, cover_image, is_private, max_members, clubId]
        );
    }

    static async delete(clubId) {
        await pool.execute(
            'DELETE FROM book_clubs WHERE club_id = ?',
            [clubId]
        );
    }

    static async addMember(clubId, userId, role = 'member') {
        await pool.execute(
            `INSERT INTO book_club_members (club_id, user_id, role)
             VALUES (?, ?, ?)`,
            [clubId, userId, role]
        );
    }

    static async removeMember(clubId, userId) {
        await pool.execute(
            'DELETE FROM book_club_members WHERE club_id = ? AND user_id = ?',
            [clubId, userId]
        );
    }

    static async getMembers(clubId) {
        const [rows] = await pool.execute(
            `SELECT u.*, bcm.role, bcm.joined_at
             FROM book_club_members bcm
             JOIN users u ON bcm.user_id = u.user_id
             WHERE bcm.club_id = ?`,
            [clubId]
        );
        return rows;
    }

    static async createReadingSchedule(scheduleData) {
        const { club_id, book_id, start_date, end_date, discussion_date, created_by } = scheduleData;
        const [result] = await pool.execute(
            `INSERT INTO reading_schedules (club_id, book_id, start_date, end_date, discussion_date, created_by)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [club_id, book_id, start_date, end_date, discussion_date, created_by]
        );
        return result.insertId;
    }

    static async getReadingSchedule(clubId) {
        const [rows] = await pool.execute(
            `SELECT rs.*, b.title as book_title, b.cover_image as book_cover
             FROM reading_schedules rs
             JOIN books b ON rs.book_id = b.book_id
             WHERE rs.club_id = ?
             ORDER BY rs.start_date DESC`,
            [clubId]
        );
        return rows;
    }
}

module.exports = BookClub; 