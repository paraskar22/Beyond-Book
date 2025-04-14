const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const socketio = require("socket.io");
const http = require("http");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const path = require("path");

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require("./app/routes/auth.routes");
const userRoutes = require("./app/routes/user.routes");
const bookRoutes = require("./app/routes/book.routes");
const bookClubRoutes = require("./app/routes/bookclub.routes");
const discussionRoutes = require("./app/routes/discussion.routes");
const eventRoutes = require("./app/routes/event.routes");
const marketplaceRoutes = require("./app/routes/marketplace.routes");

// Import middleware
const { errorHandler } = require("./app/middleware/error.middleware");
const { logger } = require("./app/utils/logger");

// Initialize express app
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Middleware
app.use(helmet()); // Security headers
app.use(compression()); // Compress responses
app.use(
  morgan("combined", {
    stream: { write: (message) => logger.info(message.trim()) },
  })
); // Logging
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Database connection
mongoose
  .connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/beyond-the-book",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => logger.info("Connected to MongoDB"))
  .catch((err) => logger.error("MongoDB connection error:", err));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/bookclubs", bookClubRoutes);
app.use("/api/discussions", discussionRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/marketplace", marketplaceRoutes);

// Socket.io connection handling
io.on("connection", (socket) => {
  logger.info("New client connected");

  socket.on("join-bookclub", (bookclubId) => {
    socket.join(`bookclub-${bookclubId}`);
    logger.info(`User joined bookclub: ${bookclubId}`);
  });

  socket.on("leave-bookclub", (bookclubId) => {
    socket.leave(`bookclub-${bookclubId}`);
    logger.info(`User left bookclub: ${bookclubId}`);
  });

  socket.on("new-message", (data) => {
    io.to(`bookclub-${data.bookclubId}`).emit("message", data);
    logger.info(`New message in bookclub: ${data.bookclubId}`);
  });

  socket.on("disconnect", () => {
    logger.info("Client disconnected");
  });
});

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
