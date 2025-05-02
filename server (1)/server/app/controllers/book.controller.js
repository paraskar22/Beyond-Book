const Book = require('../models/book.model');
const Review = require('../models/review.model');
const Author = require('../models/author.model');

class BookController {
    static async createBook(req, res) {
        try {
            const { author_id } = req.body;
            
            // Check if author exists
            const author = await Author.findById(author_id);
            if (!author) {
                return res.status(404).json({
                    success: false,
                    message: 'Author not found',
                    error: 'The specified author does not exist'
                });
            }

            const bookData = {
                ...req.body,
                author_id: author_id
            };

            const bookId = await Book.create(bookData);
            const book = await Book.findById(bookId);

            res.status(201).json({
                success: true,
                message: 'Book created successfully',
                data: book
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error creating book',
                error: error.message
            });
        }
    }

    static async getAllBooks(req, res) {
        try {
            const books = await Book.getAllBooks();
            res.status(200).json({
                success: true,
                data: books
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching books',
                error: error.message
            });
        }
    }

    static async getBook(req, res) {
        try {
            const { id } = req.params;
            const book = await Book.findById(id);

            if (!book) {
                return res.status(404).json({
                    success: false,
                    message: 'Book not found'
                });
            }

            res.status(200).json({
                success: true,
                data: book
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching book',
                error: error.message
            });
        }
    }

    static async updateBook(req, res) {
        try {
            const { id } = req.params;
            const book = await Book.findById(id);

            if (!book) {
                return res.status(404).json({
                    success: false,
                    message: 'Book not found'
                });
            }

            await Book.update(id, req.body);
            const updatedBook = await Book.findById(id);

            res.status(200).json({
                success: true,
                message: 'Book updated successfully',
                data: updatedBook
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error updating book',
                error: error.message
            });
        }
    }

    static async deleteBook(req, res) {
        try {
            const { id } = req.params;
            const book = await Book.findById(id);

            if (!book) {
                return res.status(404).json({
                    success: false,
                    message: 'Book not found'
                });
            }

            await Book.delete(id);

            res.status(200).json({
                success: true,
                message: 'Book deleted successfully'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error deleting book',
                error: error.message
            });
        }
    }

    static async createReview(req, res) {
        try {
            const { id } = req.params;
            const reviewData = {
                ...req.body,
                book_id: id,
                user_id: req.user.userId
            };

            const reviewId = await Review.create(reviewData);
            const review = await Review.findById(reviewId);

            res.status(201).json({
                success: true,
                message: 'Review created successfully',
                data: review
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error creating review',
                error: error.message
            });
        }
    }

    static async getBookReviews(req, res) {
        try {
            const { id } = req.params;
            const reviews = await Review.getBookReviews(id);
            res.status(200).json({
                success: true,
                data: reviews
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching reviews',
                error: error.message
            });
        }
    }

    static async updateReview(req, res) {
        try {
            const { id, reviewId } = req.params;
            const review = await Review.findById(reviewId);

            if (!review) {
                return res.status(404).json({
                    success: false,
                    message: 'Review not found'
                });
            }

            if (review.user_id !== req.user.userId) {
                return res.status(403).json({
                    success: false,
                    message: 'Not authorized to update this review'
                });
            }

            await Review.update(reviewId, req.body);
            const updatedReview = await Review.findById(reviewId);

            res.status(200).json({
                success: true,
                message: 'Review updated successfully',
                data: updatedReview
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error updating review',
                error: error.message
            });
        }
    }

    static async deleteReview(req, res) {
        try {
            const { id, reviewId } = req.params;
            const review = await Review.findById(reviewId);

            if (!review) {
                return res.status(404).json({
                    success: false,
                    message: 'Review not found'
                });
            }

            if (review.user_id !== req.user.userId) {
                return res.status(403).json({
                    success: false,
                    message: 'Not authorized to delete this review'
                });
            }

            await Review.delete(reviewId);

            res.status(200).json({
                success: true,
                message: 'Review deleted successfully'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error deleting review',
                error: error.message
            });
        }
    }

    static async getRecommendations(req, res) {
        try {
            const recommendations = await Book.getRecommendations(req.user.userId);
            res.status(200).json({
                success: true,
                data: recommendations
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching recommendations',
                error: error.message
            });
        }
    }

    static async getTrendingBooks(req, res) {
        try {
            const books = await Book.getTrendingBooks();
            res.status(200).json({
                success: true,
                data: books
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching trending books',
                error: error.message
            });
        }
    }

    static async getNewReleases(req, res) {
        try {
            const books = await Book.getNewReleases();
            res.status(200).json({
                success: true,
                data: books
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching new releases',
                error: error.message
            });
        }
    }
}

module.exports = BookController; 