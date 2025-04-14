const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bookClub: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BookClub",
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },
    endDate: {
      type: Date,
      required: [true, "End date is required"],
    },
    type: {
      type: String,
      enum: [
        "virtual-meeting",
        "author-qa",
        "book-launch",
        "reading-challenge",
        "workshop",
      ],
      required: [true, "Event type is required"],
    },
    participants: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        status: {
          type: String,
          enum: ["attending", "maybe", "declined"],
          default: "attending",
        },
        registeredAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    maxParticipants: {
      type: Number,
    },
    location: {
      type: {
        type: String,
        enum: ["virtual", "physical"],
        required: [true, "Location type is required"],
      },
      details: {
        type: String,
      },
      link: {
        type: String,
      },
      address: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String,
      },
    },
    status: {
      type: String,
      enum: ["scheduled", "ongoing", "completed", "cancelled"],
      default: "scheduled",
    },
    tags: [
      {
        type: String,
      },
    ],
    agenda: [
      {
        time: String,
        activity: String,
        description: String,
      },
    ],
    resources: [
      {
        title: String,
        description: String,
        link: String,
        type: {
          type: String,
          enum: ["document", "video", "link", "other"],
        },
      },
    ],
    recording: {
      link: String,
      duration: Number,
      uploadedAt: Date,
    },
    feedback: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        rating: {
          type: Number,
          min: 1,
          max: 5,
        },
        comment: String,
        submittedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Index for search functionality
eventSchema.index({ title: "text", description: "text", tags: "text" });

module.exports = mongoose.model("Event", eventSchema);
