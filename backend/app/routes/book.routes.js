const express = require("express");
const { body, validationResult } = require("express-validator");
const { auth, authorize } = require("../middleware/auth.middleware");
const { ApiError } = require("../middleware/error.middleware");
const Book = require("../models/book.model");
const { logger } = require("../utils/logger");

const router = express.Router();

/**
 * @route   GET /api/books
 * @desc    Get all books with pagination and filters
 * @access  Public
 */
router.get("/", async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      genre,
      author,
      search,
      sortBy = "title",
      sortOrder = "asc",
    } = req.query;

    // Build query
    const query = {};
    if (genre) query.genre = genre;
    if (author) query.author = new RegExp(author, "i");
    if (search) {
      query.$or = [
        { title: new RegExp(search, "i") },
        { description: new RegExp(search, "i") },
      ];
    }

    // Execute query with pagination
    const books = await Book.find(query)
      .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    // Get total count for pagination
    const total = await Book.countDocuments(query);

    res.json({
      success: true,
      data: {
        books,
        pagination: {
          total,
          page: page * 1,
          pages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    logger.error(`Get books error: ${error.message}`);
    next(error);
  }
});

/**
 * @route   GET /api/books/:id
 * @desc    Get book by ID
 * @access  Public
 */
router.get("/:id", async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return next(new ApiError(404, "Book not found"));
    }

    res.json({
      success: true,
      data: { book },
    });
  } catch (error) {
    logger.error(`Get book error: ${error.message}`);
    next(error);
  }
});

/**
 * @route   POST /api/books
 * @desc    Create a new book
 * @access  Private (Admin only)
 */
router.post(
  "/",
  [
    auth,
    authorize("admin"),
    body("title").trim().notEmpty().withMessage("Title is required"),
    body("author").trim().notEmpty().withMessage("Author is required"),
    body("isbn")
      .trim()
      .matches(/^(?:\d{10}|\d{13})$/)
      .withMessage("ISBN must be 10 or 13 digits"),
    body("description")
      .trim()
      .notEmpty()
      .withMessage("Description is required"),
    body("genre").trim().notEmpty().withMessage("Genre is required"),
    body("publicationYear")
      .isInt({ min: 1000, max: new Date().getFullYear() })
      .withMessage("Invalid publication year"),
  ],
  async (req, res, next) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Check if book with ISBN already exists
      const existingBook = await Book.findOne({ isbn: req.body.isbn });
      if (existingBook) {
        return next(new ApiError(400, "Book with this ISBN already exists"));
      }

      // Create new book
      const book = new Book(req.body);
      await book.save();

      res.status(201).json({
        success: true,
        data: { book },
      });
    } catch (error) {
      logger.error(`Create book error: ${error.message}`);
      next(error);
    }
  }
);

/**
 * @route   PUT /api/books/:id
 * @desc    Update a book
 * @access  Private (Admin only)
 */
router.put(
  "/:id",
  [
    auth,
    authorize("admin"),
    body("title")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Title cannot be empty"),
    body("author")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Author cannot be empty"),
    body("isbn")
      .optional()
      .trim()
      .matches(/^(?:\d{10}|\d{13})$/)
      .withMessage("ISBN must be 10 or 13 digits"),
    body("description")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Description cannot be empty"),
    body("genre")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Genre cannot be empty"),
    body("publicationYear")
      .optional()
      .isInt({ min: 1000, max: new Date().getFullYear() })
      .withMessage("Invalid publication year"),
  ],
  async (req, res, next) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Check if book exists
      const book = await Book.findById(req.params.id);
      if (!book) {
        return next(new ApiError(404, "Book not found"));
      }

      // Check if ISBN is being changed and if it already exists
      if (req.body.isbn && req.body.isbn !== book.isbn) {
        const existingBook = await Book.findOne({ isbn: req.body.isbn });
        if (existingBook) {
          return next(new ApiError(400, "Book with this ISBN already exists"));
        }
      }

      // Update book
      Object.assign(book, req.body);
      await book.save();

      res.json({
        success: true,
        data: { book },
      });
    } catch (error) {
      logger.error(`Update book error: ${error.message}`);
      next(error);
    }
  }
);

/**
 * @route   DELETE /api/books/:id
 * @desc    Delete a book
 * @access  Private (Admin only)
 */
router.delete("/:id", [auth, authorize("admin")], async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return next(new ApiError(404, "Book not found"));
    }

    await book.remove();

    res.json({
      success: true,
      data: {},
    });
  } catch (error) {
    logger.error(`Delete book error: ${error.message}`);
    next(error);
  }
});

/**
 * @route   POST /api/books/:id/rate
 * @desc    Rate a book
 * @access  Private
 */
router.post(
  "/:id/rate",
  [
    auth,
    body("rating")
      .isFloat({ min: 1, max: 5 })
      .withMessage("Rating must be between 1 and 5"),
  ],
  async (req, res, next) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const book = await Book.findById(req.params.id);
      if (!book) {
        return next(new ApiError(404, "Book not found"));
      }

      // Check if user has already rated the book
      const existingRating = book.ratings.find(
        (rating) => rating.user.toString() === req.user._id.toString()
      );

      if (existingRating) {
        // Update existing rating
        existingRating.rating = req.body.rating;
      } else {
        // Add new rating
        book.ratings.push({
          user: req.user._id,
          rating: req.body.rating,
        });
      }

      await book.save();

      res.json({
        success: true,
        data: { book },
      });
    } catch (error) {
      logger.error(`Rate book error: ${error.message}`);
      next(error);
    }
  }
);

module.exports = router;
