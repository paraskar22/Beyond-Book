const pool = require('../config/db.config');

class Marketplace {
    static async create(listingData) {
        const { book_id, seller_id, price, condition, description, status } = listingData;
        const [result] = await pool.execute(
            `INSERT INTO marketplace_listings (book_id, seller_id, price, condition, description, status)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [book_id, seller_id, price, condition, description, status]
        );
        return result.insertId;
    }

    static async findById(listingId) {
        const [rows] = await pool.execute(
            `SELECT ml.*, b.title as book_title, b.cover_image as book_cover,
                    u.username as seller_username, u.profile_picture as seller_profile_picture
             FROM marketplace_listings ml
             JOIN books b ON ml.book_id = b.book_id
             JOIN users u ON ml.seller_id = u.user_id
             WHERE ml.listing_id = ?`,
            [listingId]
        );
        return rows[0];
    }

    static async getAllListings() {
        const [rows] = await pool.execute(
            `SELECT ml.*, b.title as book_title, b.cover_image as book_cover,
                    u.username as seller_username, u.profile_picture as seller_profile_picture
             FROM marketplace_listings ml
             JOIN books b ON ml.book_id = b.book_id
             JOIN users u ON ml.seller_id = u.user_id
             WHERE ml.status = 'active'
             ORDER BY ml.created_at DESC`
        );
        return rows;
    }

    static async update(listingId, listingData) {
        const { price, condition, description, status } = listingData;
        await pool.execute(
            `UPDATE marketplace_listings 
             SET price = ?, condition = ?, description = ?, status = ?
             WHERE listing_id = ?`,
            [price, condition, description, status, listingId]
        );
    }

    static async delete(listingId) {
        await pool.execute(
            'DELETE FROM marketplace_listings WHERE listing_id = ?',
            [listingId]
        );
    }

    static async createOrder(orderData) {
        const { listing_id, buyer_id, shipping_address, payment_method } = orderData;
        const [result] = await pool.execute(
            `INSERT INTO marketplace_orders (listing_id, buyer_id, shipping_address, payment_method)
             VALUES (?, ?, ?, ?)`,
            [listing_id, buyer_id, shipping_address, payment_method]
        );
        return result.insertId;
    }

    static async getOrder(orderId) {
        const [rows] = await pool.execute(
            `SELECT mo.*, ml.price, b.title as book_title,
                    u1.username as buyer_username, u2.username as seller_username
             FROM marketplace_orders mo
             JOIN marketplace_listings ml ON mo.listing_id = ml.listing_id
             JOIN books b ON ml.book_id = b.book_id
             JOIN users u1 ON mo.buyer_id = u1.user_id
             JOIN users u2 ON ml.seller_id = u2.user_id
             WHERE mo.order_id = ?`,
            [orderId]
        );
        return rows[0];
    }

    static async getUserOrders(userId) {
        const [rows] = await pool.execute(
            `SELECT mo.*, ml.price, b.title as book_title,
                    u1.username as buyer_username, u2.username as seller_username
             FROM marketplace_orders mo
             JOIN marketplace_listings ml ON mo.listing_id = ml.listing_id
             JOIN books b ON ml.book_id = b.book_id
             JOIN users u1 ON mo.buyer_id = u1.user_id
             JOIN users u2 ON ml.seller_id = u2.user_id
             WHERE mo.buyer_id = ? OR ml.seller_id = ?
             ORDER BY mo.created_at DESC`,
            [userId, userId]
        );
        return rows;
    }

    static async updateOrderStatus(orderId, status) {
        await pool.execute(
            'UPDATE marketplace_orders SET status = ? WHERE order_id = ?',
            [status, orderId]
        );
    }

    static async getUserListings(userId) {
        const [rows] = await pool.execute(
            `SELECT ml.*, b.title as book_title, b.cover_image as book_cover
             FROM marketplace_listings ml
             JOIN books b ON ml.book_id = b.book_id
             WHERE ml.seller_id = ?
             ORDER BY ml.created_at DESC`,
            [userId]
        );
        return rows;
    }

    static async searchListings(searchTerm) {
        const [rows] = await pool.execute(
            `SELECT ml.*, b.title as book_title, b.cover_image as book_cover,
                    u.username as seller_username
             FROM marketplace_listings ml
             JOIN books b ON ml.book_id = b.book_id
             JOIN users u ON ml.seller_id = u.user_id
             WHERE b.title LIKE ? OR b.author LIKE ? OR ml.description LIKE ?
             AND ml.status = 'active'
             ORDER BY ml.created_at DESC`,
            [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`]
        );
        return rows;
    }

    static async filterListings(filters) {
        let query = `SELECT ml.*, b.title as book_title, b.cover_image as book_cover,
                           u.username as seller_username
                    FROM marketplace_listings ml
                    JOIN books b ON ml.book_id = b.book_id
                    JOIN users u ON ml.seller_id = u.user_id
                    WHERE ml.status = 'active'`;
        
        const params = [];
        
        if (filters.minPrice) {
            query += ' AND ml.price >= ?';
            params.push(filters.minPrice);
        }
        
        if (filters.maxPrice) {
            query += ' AND ml.price <= ?';
            params.push(filters.maxPrice);
        }
        
        if (filters.condition) {
            query += ' AND ml.condition = ?';
            params.push(filters.condition);
        }
        
        query += ' ORDER BY ml.created_at DESC';
        
        const [rows] = await pool.execute(query, params);
        return rows;
    }
}

module.exports = Marketplace; 