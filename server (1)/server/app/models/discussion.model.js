const pool = require('../config/db.config');

class Discussion {
    static async create(discussionData) {
        const { title, content, created_by, book_id, club_id, is_public } = discussionData;
        const [result] = await pool.execute(
            `INSERT INTO discussions (title, content, created_by, book_id, club_id, is_public)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [title, content, created_by, book_id, club_id, is_public]
        );
        return result.insertId;
    }

    static async findById(discussionId) {
        const [rows] = await pool.execute(
            `SELECT d.*, u.username as creator_username, 
                    COUNT(c.comment_id) as comment_count,
                    b.title as book_title, bc.name as club_name
             FROM discussions d
             LEFT JOIN users u ON d.created_by = u.user_id
             LEFT JOIN books b ON d.book_id = b.book_id
             LEFT JOIN book_clubs bc ON d.club_id = bc.club_id
             LEFT JOIN comments c ON d.discussion_id = c.discussion_id
             WHERE d.discussion_id = ?
             GROUP BY d.discussion_id`,
            [discussionId]
        );
        return rows[0];
    }

    static async getAllDiscussions() {
        const [rows] = await pool.execute(
            `SELECT d.*, u.username as creator_username, 
                    COUNT(c.comment_id) as comment_count,
                    b.title as book_title, bc.name as club_name
             FROM discussions d
             LEFT JOIN users u ON d.created_by = u.user_id
             LEFT JOIN books b ON d.book_id = b.book_id
             LEFT JOIN book_clubs bc ON d.club_id = bc.club_id
             LEFT JOIN comments c ON d.discussion_id = c.discussion_id
             GROUP BY d.discussion_id
             ORDER BY d.created_at DESC`
        );
        return rows;
    }

    static async update(discussionId, discussionData) {
        const { title, content, is_public } = discussionData;
        await pool.execute(
            `UPDATE discussions 
             SET title = ?, content = ?, is_public = ?
             WHERE discussion_id = ?`,
            [title, content, is_public, discussionId]
        );
    }

    static async delete(discussionId) {
        await pool.execute(
            'DELETE FROM discussions WHERE discussion_id = ?',
            [discussionId]
        );
    }

    static async addComment(commentData) {
        const { discussion_id, user_id, content, parent_comment_id } = commentData;
        const [result] = await pool.execute(
            `INSERT INTO comments (discussion_id, user_id, content, parent_comment_id)
             VALUES (?, ?, ?, ?)`,
            [discussion_id, user_id, content, parent_comment_id]
        );
        return result.insertId;
    }

    static async getComments(discussionId) {
        const [rows] = await pool.execute(
            `SELECT c.*, u.username, u.profile_picture,
                    (SELECT COUNT(*) FROM comments WHERE parent_comment_id = c.comment_id) as reply_count
             FROM comments c
             JOIN users u ON c.user_id = u.user_id
             WHERE c.discussion_id = ? AND c.parent_comment_id IS NULL
             ORDER BY c.created_at DESC`,
            [discussionId]
        );
        return rows;
    }

    static async getReplies(commentId) {
        const [rows] = await pool.execute(
            `SELECT c.*, u.username, u.profile_picture
             FROM comments c
             JOIN users u ON c.user_id = u.user_id
             WHERE c.parent_comment_id = ?
             ORDER BY c.created_at ASC`,
            [commentId]
        );
        return rows;
    }

    static async updateComment(commentId, content) {
        await pool.execute(
            'UPDATE comments SET content = ? WHERE comment_id = ?',
            [content, commentId]
        );
    }

    static async deleteComment(commentId) {
        await pool.execute(
            'DELETE FROM comments WHERE comment_id = ?',
            [commentId]
        );
    }

    static async getPopularTags() {
        const [rows] = await pool.execute(
            `SELECT tag, COUNT(*) as count
             FROM discussion_tags
             GROUP BY tag
             ORDER BY count DESC
             LIMIT 10`
        );
        return rows;
    }

    static async getDiscussionsByTag(tag) {
        const [rows] = await pool.execute(
            `SELECT d.*, u.username as creator_username, 
                    COUNT(c.comment_id) as comment_count
             FROM discussions d
             JOIN discussion_tags dt ON d.discussion_id = dt.discussion_id
             LEFT JOIN users u ON d.created_by = u.user_id
             LEFT JOIN comments c ON d.discussion_id = c.discussion_id
             WHERE dt.tag = ?
             GROUP BY d.discussion_id
             ORDER BY d.created_at DESC`,
            [tag]
        );
        return rows;
    }
}

module.exports = Discussion; 