const express = require('express');
const router = express.Router();
const authorController = require('../controllers/author.controller');
const { authenticate } = require('../middleware/auth.middleware');
const { validateAuthor } = require('../middleware/validation.middleware');

// Author profile routes
router.post('/', authenticate, validateAuthor, authorController.createAuthorProfile);
router.get('/', authorController.getAllAuthors);
router.get('/:id', authorController.getAuthor);
router.put('/:id', authenticate, validateAuthor, authorController.updateAuthorProfile);

// Author book management
router.post('/:id/books', authenticate, authorController.addBook);
router.get('/:id/books', authorController.getAuthorBooks);
router.put('/:id/books/:bookId', authenticate, authorController.updateBook);
router.delete('/:id/books/:bookId', authenticate, authorController.removeBook);

// Author events and interactions
router.post('/:id/events', authenticate, authorController.createEvent);
router.get('/:id/events', authorController.getAuthorEvents);
router.put('/:id/events/:eventId', authenticate, authorController.updateEvent);
router.delete('/:id/events/:eventId', authenticate, authorController.deleteEvent);

// Author reader interactions
router.get('/:id/followers', authorController.getFollowers);
router.post('/:id/follow', authenticate, authorController.followAuthor);
router.delete('/:id/follow', authenticate, authorController.unfollowAuthor);

module.exports = router; 