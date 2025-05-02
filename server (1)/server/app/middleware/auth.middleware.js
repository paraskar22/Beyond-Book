const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');

const authenticate = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Authentication token is required'
            });
        }

        const decoded = jwt.verify(token, config.secret);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token'
        });
    }
};

const authorizeAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({
            success: false,
            message: 'Access denied. Admin privileges required.'
        });
    }
    next();
};

const authorizeBookClubAdmin = async (req, res, next) => {
    try {
        const { id } = req.params;
        const BookClub = require('../models/bookClub.model');
        const club = await BookClub.findById(id);

        if (!club) {
            return res.status(404).json({
                success: false,
                message: 'Book club not found'
            });
        }

        const isAdmin = await BookClub.isAdmin(id, req.user.userId);
        if (!isAdmin) {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Book club admin privileges required.'
            });
        }

        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error checking admin privileges',
            error: error.message
        });
    }
};

const authorizeDiscussionOwner = async (req, res, next) => {
    try {
        const { id } = req.params;
        const Discussion = require('../models/discussion.model');
        const discussion = await Discussion.findById(id);

        if (!discussion) {
            return res.status(404).json({
                success: false,
                message: 'Discussion not found'
            });
        }

        if (discussion.created_by !== req.user.userId) {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Only the discussion creator can perform this action.'
            });
        }

        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error checking discussion ownership',
            error: error.message
        });
    }
};

const authorizeListingOwner = async (req, res, next) => {
    try {
        const { listingId } = req.params;
        const Marketplace = require('../models/marketplace.model');
        const listing = await Marketplace.findById(listingId);

        if (!listing) {
            return res.status(404).json({
                success: false,
                message: 'Listing not found'
            });
        }

        if (listing.seller_id !== req.user.userId) {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Only the listing owner can perform this action.'
            });
        }

        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error checking listing ownership',
            error: error.message
        });
    }
};

const authorizeOrderParticipant = async (req, res, next) => {
    try {
        const { orderId } = req.params;
        const Marketplace = require('../models/marketplace.model');
        const order = await Marketplace.getOrder(orderId);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        if (order.buyer_id !== req.user.userId && order.seller_id !== req.user.userId) {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Only order participants can perform this action.'
            });
        }

        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error checking order participation',
            error: error.message
        });
    }
};

module.exports = {
    authenticate,
    authorizeAdmin,
    authorizeBookClubAdmin,
    authorizeDiscussionOwner,
    authorizeListingOwner,
    authorizeOrderParticipant
}; 