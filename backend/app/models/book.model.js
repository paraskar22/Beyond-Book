const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
    },
    isbn: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    coverImage: {
      type: String,
      default: "default-book-cover.jpg",
    },
    genre: [
      {
        type: String,
        required: [true, "At least one genre is required"],
      },
    ],
    publicationYear: {
      type: Number,
    },
    publisher: {
      type: String,
    },
    pageCount: {
      type: Number,
    },
    language: {
      type: String,
      default: "English",
    },
    ratings: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        rating: {
          type: Number,
          min: 1,
          max: 5,
          required: true,
        },
        review: String,
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    averageRating: {
      type: Number,
      default: 0,
    },
    bookClubs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BookClub",
      },
    ],
    discussions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Discussion",
      },
    ],
    marketplaceListings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MarketplaceListing",
      },
    ],
    status: {
      type: String,
      enum: ["active", "archived"],
      default: "active",
    },
    metadata: {
      goodreadsId: String,
      googleBooksId: String,
      amazonId: String,
    },
  },
  {
    timestamps: true,
  }
);

// Calculate average rating before saving
bookSchema.pre("save", function (next) {
  if (this.ratings.length > 0) {
    this.averageRating =
      this.ratings.reduce((acc, curr) => acc + curr.rating, 0) /
      this.ratings.length;
  }
  next();
});

// Create index for search
bookSchema.index({
  title: "text",
  author: "text",
  description: "text",
  genre: "text",
});

module.exports = mongoose.model("Book", bookSchema);
