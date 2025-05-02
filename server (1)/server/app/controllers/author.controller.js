const Author = require('../models/author.model');

class AuthorController {
    static async createAuthorProfile(req, res) {
        try {
            const authorData = {
                ...req.body,
                social_media: req.body.social_media || {}
            };

            const authorId = await Author.create(authorData);
            const author = await Author.findById(authorId);

            res.status(201).json({
                success: true,
                message: 'Author profile created successfully',
                data: author
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error creating author profile',
                error: error.message
            });
        }
    }

    static async getAllAuthors(req, res) {
        try {
            const authors = await Author.getAllAuthors();
            res.status(200).json({
                success: true,
                data: authors
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching authors',
                error: error.message
            });
        }
    }

    static async getAuthor(req, res) {
        try {
            const { id } = req.params;
            const author = await Author.findById(id);

            if (!author) {
                return res.status(404).json({
                    success: false,
                    message: 'Author not found'
                });
            }

            res.status(200).json({
                success: true,
                data: author
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching author',
                error: error.message
            });
        }
    }

    static async updateAuthorProfile(req, res) {
        try {
            const { id } = req.params;
            const authorData = {
                ...req.body,
                social_media: req.body.social_media || {}
            };

            const author = await Author.findById(id);
            if (!author) {
                return res.status(404).json({
                    success: false,
                    message: 'Author not found'
                });
            }

            await Author.update(id, authorData);
            const updatedAuthor = await Author.findById(id);

            res.status(200).json({
                success: true,
                message: 'Author profile updated successfully',
                data: updatedAuthor
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error updating author profile',
                error: error.message
            });
        }
    }

    static async addBook(req, res) {
        try {
            const { id } = req.params;
            const bookData = {
                ...req.body,
                author_id: id
            };

            const bookId = await Author.addBook(bookData);
            const books = await Author.getAuthorBooks(id);

            res.status(201).json({
                success: true,
                message: 'Book added successfully',
                data: books
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error adding book',
                error: error.message
            });
        }
    }

    static async getAuthorBooks(req, res) {
        try {
            const { id } = req.params;
            const books = await Author.getAuthorBooks(id);
            res.status(200).json({
                success: true,
                data: books
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching author books',
                error: error.message
            });
        }
    }

    static async updateBook(req, res) {
        try {
            const { id, bookId } = req.params;
            await Author.updateBook(bookId, req.body);
            const books = await Author.getAuthorBooks(id);

            res.status(200).json({
                success: true,
                message: 'Book updated successfully',
                data: books
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error updating book',
                error: error.message
            });
        }
    }

    static async removeBook(req, res) {
        try {
            const { id, bookId } = req.params;
            await Author.removeBook(bookId);
            const books = await Author.getAuthorBooks(id);

            res.status(200).json({
                success: true,
                message: 'Book removed successfully',
                data: books
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error removing book',
                error: error.message
            });
        }
    }

    static async createEvent(req, res) {
        try {
            const { id } = req.params;
            const eventData = {
                ...req.body,
                author_id: id
            };

            const eventId = await Author.createEvent(eventData);
            const events = await Author.getAuthorEvents(id);

            res.status(201).json({
                success: true,
                message: 'Event created successfully',
                data: events
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error creating event',
                error: error.message
            });
        }
    }

    static async getAuthorEvents(req, res) {
        try {
            const { id } = req.params;
            const events = await Author.getAuthorEvents(id);
            res.status(200).json({
                success: true,
                data: events
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching author events',
                error: error.message
            });
        }
    }

    static async updateEvent(req, res) {
        try {
            const { id, eventId } = req.params;
            await Author.updateEvent(eventId, req.body);
            const events = await Author.getAuthorEvents(id);

            res.status(200).json({
                success: true,
                message: 'Event updated successfully',
                data: events
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error updating event',
                error: error.message
            });
        }
    }

    static async deleteEvent(req, res) {
        try {
            const { id, eventId } = req.params;
            await Author.deleteEvent(eventId);
            const events = await Author.getAuthorEvents(id);

            res.status(200).json({
                success: true,
                message: 'Event deleted successfully',
                data: events
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error deleting event',
                error: error.message
            });
        }
    }

    static async getFollowers(req, res) {
        try {
            const { id } = req.params;
            const followers = await Author.getFollowers(id);
            res.status(200).json({
                success: true,
                data: followers
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching followers',
                error: error.message
            });
        }
    }

    static async followAuthor(req, res) {
        try {
            const { id } = req.params;
            await Author.followAuthor(id, req.user.userId);
            const author = await Author.findById(id);

            res.status(200).json({
                success: true,
                message: 'Successfully followed author',
                data: author
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error following author',
                error: error.message
            });
        }
    }

    static async unfollowAuthor(req, res) {
        try {
            const { id } = req.params;
            await Author.unfollowAuthor(id, req.user.userId);
            const author = await Author.findById(id);

            res.status(200).json({
                success: true,
                message: 'Successfully unfollowed author',
                data: author
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error unfollowing author',
                error: error.message
            });
        }
    }
}

module.exports = AuthorController; 