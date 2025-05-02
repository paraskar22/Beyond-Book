const express = require('express');
const router = express.Router();
const MarketplaceController = require('../controllers/marketplace.controller');
const authMiddleware = require('../middleware/auth.middleware');
const validationMiddleware = require('../middleware/validation.middleware');

// Public routes
router.get('/', MarketplaceController.getAllListings);
router.get('/search', MarketplaceController.searchListings);
router.get('/filter', MarketplaceController.filterListings);
router.get('/:listingId', MarketplaceController.getListing);

// Protected routes
router.use(authMiddleware.authenticate);

// Listing management
router.post('/', 
    validationMiddleware.validateListing,
    MarketplaceController.createListing
);
router.put('/:listingId',
    validationMiddleware.validateListing,
    MarketplaceController.updateListing
);
router.delete('/:listingId', MarketplaceController.deleteListing);
router.get('/user/listings', MarketplaceController.getUserListings);

// Order management
router.post('/:listingId/order',
    validationMiddleware.validateOrder,
    MarketplaceController.createOrder
);
router.get('/orders/:orderId', MarketplaceController.getOrder);
router.get('/user/orders', MarketplaceController.getUserOrders);
router.put('/orders/:orderId/status',
    validationMiddleware.validateOrderStatus,
    MarketplaceController.updateOrderStatus
);

module.exports = router; 