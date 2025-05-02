const Marketplace = require('../models/marketplace.model');

class MarketplaceController {
    static async createListing(req, res) {
        try {
            const { book_id, price, condition, description } = req.body;
            const listingData = {
                book_id,
                seller_id: req.user.userId,
                price,
                condition,
                description,
                status: 'active'
            };

            const listingId = await Marketplace.create(listingData);
            const listing = await Marketplace.findById(listingId);

            res.status(201).json({
                success: true,
                message: 'Listing created successfully',
                data: listing
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error creating listing',
                error: error.message
            });
        }
    }

    static async getAllListings(req, res) {
        try {
            const listings = await Marketplace.getAllListings();
            res.status(200).json({
                success: true,
                data: listings
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching listings',
                error: error.message
            });
        }
    }

    static async getListing(req, res) {
        try {
            const { listingId } = req.params;
            const listing = await Marketplace.findById(listingId);

            if (!listing) {
                return res.status(404).json({
                    success: false,
                    message: 'Listing not found'
                });
            }

            res.status(200).json({
                success: true,
                data: listing
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching listing',
                error: error.message
            });
        }
    }

    static async updateListing(req, res) {
        try {
            const { listingId } = req.params;
            const { price, condition, description, status } = req.body;

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
                    message: 'You are not authorized to update this listing'
                });
            }

            await Marketplace.update(listingId, { price, condition, description, status });
            const updatedListing = await Marketplace.findById(listingId);

            res.status(200).json({
                success: true,
                message: 'Listing updated successfully',
                data: updatedListing
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error updating listing',
                error: error.message
            });
        }
    }

    static async deleteListing(req, res) {
        try {
            const { listingId } = req.params;

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
                    message: 'You are not authorized to delete this listing'
                });
            }

            await Marketplace.delete(listingId);

            res.status(200).json({
                success: true,
                message: 'Listing deleted successfully'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error deleting listing',
                error: error.message
            });
        }
    }

    static async createOrder(req, res) {
        try {
            const { listingId } = req.params;
            const { shipping_address, payment_method } = req.body;

            const listing = await Marketplace.findById(listingId);
            if (!listing) {
                return res.status(404).json({
                    success: false,
                    message: 'Listing not found'
                });
            }

            if (listing.seller_id === req.user.userId) {
                return res.status(400).json({
                    success: false,
                    message: 'You cannot purchase your own listing'
                });
            }

            const orderData = {
                listing_id: listingId,
                buyer_id: req.user.userId,
                shipping_address,
                payment_method
            };

            const orderId = await Marketplace.createOrder(orderData);
            const order = await Marketplace.getOrder(orderId);

            res.status(201).json({
                success: true,
                message: 'Order created successfully',
                data: order
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error creating order',
                error: error.message
            });
        }
    }

    static async getOrder(req, res) {
        try {
            const { orderId } = req.params;
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
                    message: 'You are not authorized to view this order'
                });
            }

            res.status(200).json({
                success: true,
                data: order
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching order',
                error: error.message
            });
        }
    }

    static async getUserOrders(req, res) {
        try {
            const orders = await Marketplace.getUserOrders(req.user.userId);
            res.status(200).json({
                success: true,
                data: orders
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching user orders',
                error: error.message
            });
        }
    }

    static async updateOrderStatus(req, res) {
        try {
            const { orderId } = req.params;
            const { status } = req.body;

            const order = await Marketplace.getOrder(orderId);
            if (!order) {
                return res.status(404).json({
                    success: false,
                    message: 'Order not found'
                });
            }

            if (order.seller_id !== req.user.userId) {
                return res.status(403).json({
                    success: false,
                    message: 'You are not authorized to update this order'
                });
            }

            await Marketplace.updateOrderStatus(orderId, status);
            const updatedOrder = await Marketplace.getOrder(orderId);

            res.status(200).json({
                success: true,
                message: 'Order status updated successfully',
                data: updatedOrder
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error updating order status',
                error: error.message
            });
        }
    }

    static async getUserListings(req, res) {
        try {
            const listings = await Marketplace.getUserListings(req.user.userId);
            res.status(200).json({
                success: true,
                data: listings
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching user listings',
                error: error.message
            });
        }
    }

    static async searchListings(req, res) {
        try {
            const { searchTerm } = req.query;
            const listings = await Marketplace.searchListings(searchTerm);
            res.status(200).json({
                success: true,
                data: listings
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error searching listings',
                error: error.message
            });
        }
    }

    static async filterListings(req, res) {
        try {
            const filters = req.query;
            const listings = await Marketplace.filterListings(filters);
            res.status(200).json({
                success: true,
                data: listings
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error filtering listings',
                error: error.message
            });
        }
    }
}

module.exports = MarketplaceController; 