const mongoose = require("mongoose");

const bookClubSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    coverImage: {
      type: String,
      default: "default-club-cover.jpg",
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    moderators: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    members: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        role: {
          type: String,
          enum: ["member", "moderator"],
          default: "member",
        },
        joinedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    currentBook: {
      book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
      },
      startDate: Date,
      endDate: Date,
      chaptersPerWeek: Number,
      currentChapter: Number,
    },
    readingSchedule: {
      startDate: Date,
      endDate: Date,
      chaptersPerWeek: Number,
    },
    discussions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Discussion",
      },
    ],
    events: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
      },
    ],
    rules: [
      {
        type: String,
      },
    ],
    isPrivate: {
      type: Boolean,
      default: false,
    },
    maxMembers: {
      type: Number,
      default: 50,
    },
    tags: [
      {
        type: String,
      },
    ],
    status: {
      type: String,
      enum: ["active", "archived", "closed"],
      default: "active",
    },
    joinRequests: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        message: String,
        status: {
          type: String,
          enum: ["pending", "approved", "rejected"],
          default: "pending",
        },
        requestedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    readingHistory: [
      {
        book: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Book",
        },
        startDate: Date,
        endDate: Date,
        discussionCount: {
          type: Number,
          default: 0,
        },
        participationRate: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Index for search functionality
bookClubSchema.index({ name: "text", description: "text", tags: "text" });

module.exports = mongoose.model("BookClub", bookClubSchema);
