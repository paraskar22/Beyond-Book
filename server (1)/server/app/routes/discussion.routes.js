const express = require('express');
const router = express.Router();
const discussionController = require('../controllers/discussion.controller');
const { authenticate } = require('../middleware/auth.middleware');
const { validateDiscussion } = require('../middleware/validation.middleware');

// Discussion routes
router.post('/', authenticate, validateDiscussion, discussionController.createDiscussion);
router.get('/', discussionController.getAllDiscussions);
router.get('/:id', discussionController.getDiscussion);
router.put('/:id', authenticate, validateDiscussion, discussionController.updateDiscussion);
router.delete('/:id', authenticate, discussionController.deleteDiscussion);

// Discussion comments
router.post('/:id/comments', authenticate, discussionController.addComment);
router.get('/:id/comments', discussionController.getComments);
router.put('/:id/comments/:commentId', authenticate, discussionController.updateComment);
router.delete('/:id/comments/:commentId', authenticate, discussionController.deleteComment);

// Discussion likes
router.post('/:id/like', authenticate, discussionController.likeDiscussion);
router.delete('/:id/like', authenticate, discussionController.unlikeDiscussion);

// Discussion tags
router.get('/tags', discussionController.getPopularTags);
router.get('/tag/:tag', discussionController.getDiscussionsByTag);

module.exports = router; 