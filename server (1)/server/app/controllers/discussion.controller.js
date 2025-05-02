const Discussion = require('../models/discussion.model');

class DiscussionController {
    static async createDiscussion(req, res) {
        try {
            const { title, content, book_id, club_id, is_public } = req.body;
            const discussionData = {
                title,
                content,
                created_by: req.user.userId,
                book_id,
                club_id,
                is_public
            };

            const discussionId = await Discussion.create(discussionData);
            const discussion = await Discussion.findById(discussionId);

            res.status(201).json({
                success: true,
                message: 'Discussion created successfully',
                data: discussion
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error creating discussion',
                error: error.message
            });
        }
    }

    static async getAllDiscussions(req, res) {
        try {
            const discussions = await Discussion.getAllDiscussions();
            res.status(200).json({
                success: true,
                data: discussions
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching discussions',
                error: error.message
            });
        }
    }

    static async getDiscussion(req, res) {
        try {
            const { discussionId } = req.params;
            const discussion = await Discussion.findById(discussionId);

            if (!discussion) {
                return res.status(404).json({
                    success: false,
                    message: 'Discussion not found'
                });
            }

            res.status(200).json({
                success: true,
                data: discussion
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching discussion',
                error: error.message
            });
        }
    }

    static async updateDiscussion(req, res) {
        try {
            const { discussionId } = req.params;
            const { title, content, is_public } = req.body;

            const discussion = await Discussion.findById(discussionId);
            if (!discussion) {
                return res.status(404).json({
                    success: false,
                    message: 'Discussion not found'
                });
            }

            if (discussion.created_by !== req.user.userId) {
                return res.status(403).json({
                    success: false,
                    message: 'You are not authorized to update this discussion'
                });
            }

            await Discussion.update(discussionId, { title, content, is_public });
            const updatedDiscussion = await Discussion.findById(discussionId);

            res.status(200).json({
                success: true,
                message: 'Discussion updated successfully',
                data: updatedDiscussion
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error updating discussion',
                error: error.message
            });
        }
    }

    static async deleteDiscussion(req, res) {
        try {
            const { discussionId } = req.params;

            const discussion = await Discussion.findById(discussionId);
            if (!discussion) {
                return res.status(404).json({
                    success: false,
                    message: 'Discussion not found'
                });
            }

            if (discussion.created_by !== req.user.userId) {
                return res.status(403).json({
                    success: false,
                    message: 'You are not authorized to delete this discussion'
                });
            }

            await Discussion.delete(discussionId);

            res.status(200).json({
                success: true,
                message: 'Discussion deleted successfully'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error deleting discussion',
                error: error.message
            });
        }
    }

    static async addComment(req, res) {
        try {
            const { discussionId } = req.params;
            const { content, parent_comment_id } = req.body;

            const discussion = await Discussion.findById(discussionId);
            if (!discussion) {
                return res.status(404).json({
                    success: false,
                    message: 'Discussion not found'
                });
            }

            const commentData = {
                discussion_id: discussionId,
                user_id: req.user.userId,
                content,
                parent_comment_id
            };

            const commentId = await Discussion.addComment(commentData);
            const comments = await Discussion.getComments(discussionId);

            res.status(201).json({
                success: true,
                message: 'Comment added successfully',
                data: comments
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error adding comment',
                error: error.message
            });
        }
    }

    static async getComments(req, res) {
        try {
            const { discussionId } = req.params;
            const comments = await Discussion.getComments(discussionId);

            res.status(200).json({
                success: true,
                data: comments
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching comments',
                error: error.message
            });
        }
    }

    static async getReplies(req, res) {
        try {
            const { commentId } = req.params;
            const replies = await Discussion.getReplies(commentId);

            res.status(200).json({
                success: true,
                data: replies
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching replies',
                error: error.message
            });
        }
    }

    static async updateComment(req, res) {
        try {
            const { commentId } = req.params;
            const { content } = req.body;

            await Discussion.updateComment(commentId, content);

            res.status(200).json({
                success: true,
                message: 'Comment updated successfully'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error updating comment',
                error: error.message
            });
        }
    }

    static async deleteComment(req, res) {
        try {
            const { commentId } = req.params;
            await Discussion.deleteComment(commentId);

            res.status(200).json({
                success: true,
                message: 'Comment deleted successfully'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error deleting comment',
                error: error.message
            });
        }
    }

    static async getPopularTags(req, res) {
        try {
            const tags = await Discussion.getPopularTags();
            res.status(200).json({
                success: true,
                data: tags
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching popular tags',
                error: error.message
            });
        }
    }

    static async getDiscussionsByTag(req, res) {
        try {
            const { tag } = req.params;
            const discussions = await Discussion.getDiscussionsByTag(tag);

            res.status(200).json({
                success: true,
                data: discussions
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching discussions by tag',
                error: error.message
            });
        }
    }

    static async likeDiscussion(req, res) {
        try {
            const { id } = req.params;
            const discussion = await Discussion.findById(id);

            if (!discussion) {
                return res.status(404).json({
                    success: false,
                    message: 'Discussion not found'
                });
            }

            await Discussion.addLike(id, req.user.userId);
            res.status(200).json({
                success: true,
                message: 'Discussion liked successfully'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error liking discussion',
                error: error.message
            });
        }
    }

    static async unlikeDiscussion(req, res) {
        try {
            const { id } = req.params;
            const discussion = await Discussion.findById(id);

            if (!discussion) {
                return res.status(404).json({
                    success: false,
                    message: 'Discussion not found'
                });
            }

            await Discussion.removeLike(id, req.user.userId);
            res.status(200).json({
                success: true,
                message: 'Discussion unliked successfully'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error unliking discussion',
                error: error.message
            });
        }
    }
}

module.exports = DiscussionController; 