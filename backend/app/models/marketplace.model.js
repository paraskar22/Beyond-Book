const mongoose = require("mongoose");

const marketplaceListingSchema = new mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    condition: {
      type: String,
      enum: ["new", "like-new", "good", "fair", "poor"],
      required: [true, "Condition is required"],
    },
    images: [
      {
        type: String,
      },
    ],
    listingType: {
      type: String,
      enum: ["sale", "exchange", "donation"],
      required: [true, "Listing type is required"],
    },
    status: {
      type: String,
      enum: ["active", "sold", "cancelled", "expired"],
      default: "active",
    },
    location: {
      country: String,
      state: String,
      city: String,
      zipCode: String,
    },
    shippingOptions: [
      {
        method: {
          type: String,
          enum: ["standard", "express", "local-pickup"],
        },
        price: Number,
        estimatedDays: Number,
      },
    ],
    tags: [
      {
        type: String,
      },
    ],
    views: {
      type: Number,
      default: 0,
    },
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    inquiries: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        message: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
        status: {
          type: String,
          enum: ["pending", "responded", "closed"],
          default: "pending",
        },
      },
    ],
    transaction: {
      buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      completedAt: Date,
      rating: {
        type: Number,
        min: 1,
        max: 5,
      },
      review: String,
    },
  },
  {
    timestamps: true,
  }
);

// Index for search functionality
marketplaceListingSchema.index({
  title: "text",
  description: "text",
  tags: "text",
});

module.exports = mongoose.model("MarketplaceListing", marketplaceListingSchema);
