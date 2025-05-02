const express = require('express');
const router = express.Router();
const bookClubController = require('../controllers/bookClub.controller');
const { authenticate } = require('../middleware/auth.middleware');
const { validateBookClub } = require('../middleware/validation.middleware');

// Book club routes
router.post('/', authenticate, validateBookClub, bookClubController.createBookClub);
router.get('/', bookClubController.getAllBookClubs);
router.get('/:id', bookClubController.getBookClub);
router.put('/:id', authenticate, validateBookClub, bookClubController.updateBookClub);
router.delete('/:id', authenticate, bookClubController.deleteBookClub);

// Book club membership routes
router.post('/:id/join', authenticate, bookClubController.joinBookClub);
router.post('/:id/leave', authenticate, bookClubController.leaveBookClub);
router.get('/:id/members', bookClubController.getBookClubMembers);

// Book club reading schedule routes
router.post('/:id/reading-schedule', authenticate, bookClubController.createReadingSchedule);
router.get('/:id/reading-schedule', bookClubController.getReadingSchedule);
router.put('/:id/reading-schedule/:scheduleId', authenticate, bookClubController.updateReadingSchedule);

module.exports = router; 