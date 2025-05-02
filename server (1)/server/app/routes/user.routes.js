const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const { authenticate } = require('../middleware/auth.middleware');
const { validateUserUpdate } = require('../middleware/validation.middleware');

// User routes
router.get('/profile', authenticate, UserController.getProfile);
router.put('/profile', authenticate, validateUserUpdate, UserController.updateProfile);
router.get('/reading-list', authenticate, UserController.getReadingList);
router.post('/reading-list', authenticate, UserController.addToReadingList);
router.delete('/reading-list/:bookId', authenticate, UserController.removeFromReadingList);
router.get('/achievements', authenticate, UserController.getAchievements);
router.get('/book-clubs', authenticate, UserController.getUserBookClubs);
router.get('/discussions', authenticate, UserController.getUserDiscussions);

module.exports = router;
