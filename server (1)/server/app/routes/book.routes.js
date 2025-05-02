const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book.controller');
const { authenticate } = require('../middleware/auth.middleware');
const { validateBook } = require('../middleware/validation.middleware');

// Book routes
router.post('/', authenticate, validateBook, bookController.createBook);
router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBook);
router.put('/:id', authenticate, validateBook, bookController.updateBook);
router.delete('/:id', authenticate, bookController.deleteBook);

// Book reviews and ratings
router.post('/:id/reviews', authenticate, bookController.createReview);
router.get('/:id/reviews', bookController.getBookReviews);
router.put('/:id/reviews/:reviewId', authenticate, bookController.updateReview);
router.delete('/:id/reviews/:reviewId', authenticate, bookController.deleteReview);

// Book recommendations
router.get('/recommendations', authenticate, bookController.getRecommendations);
router.get('/trending', bookController.getTrendingBooks);
router.get('/new-releases', bookController.getNewReleases);

module.exports = router; 