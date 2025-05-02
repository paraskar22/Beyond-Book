const express = require('express');
const router = express.Router();
const bookClubController = require('../controllers/bookClubController');

// Get all book clubs
router.get('/', bookClubController.getAllBookClubs);

// Get a single book club
router.get('/:id', bookClubController.getBookClub);

// Join a book club
router.post('/:id/join', bookClubController.joinBookClub);

// Leave a book club
router.post('/:id/leave', bookClubController.leaveBookClub);

module.exports = router; 