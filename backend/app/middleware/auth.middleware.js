const jwt = require("jsonwebtoken");
const { ApiError } = require("./error.middleware");
const User = require("../models/user.model");
const { logger } = require("../utils/logger");

/**
 * Authentication middleware to verify JWT token
 */
const auth = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Authentication required. Please log in.");
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user
    const user = await User.findOne({ _id: decoded.userId });

    if (!user) {
      throw new ApiError(401, "User not found. Please log in again.");
    }

    // Check if token is blacklisted (if you implement token blacklisting)
    // const isBlacklisted = await TokenBlacklist.findOne({ token });
    // if (isBlacklisted) {
    //   throw new ApiError(401, "Token has been invalidated. Please log in again.");
    // }

    // Add user to request
    req.user = user;
    req.token = token;

    // Update last active timestamp
    user.lastActive = new Date();
    await user.save({ validateBeforeSave: false });

    next();
  } catch (error) {
    logger.error(`Authentication error: ${error.message}`);
    next(error);
  }
};

/**
 * Role-based authorization middleware
 * @param {String[]} roles - Array of allowed roles
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError(
          403,
          `User role ${req.user.role} is not authorized to access this route`
        )
      );
    }
    next();
  };
};

/**
 * Check if user is the owner of the resource or an admin
 * @param {String} paramName - Name of the parameter containing the resource ID
 * @param {String} modelName - Name of the model to check ownership against
 */
const checkOwnership = (paramName, modelName) => {
  return async (req, res, next) => {
    try {
      const resourceId = req.params[paramName];
      const Model = require(`../models/${modelName}.model`);

      const resource = await Model.findById(resourceId);

      if (!resource) {
        return next(new ApiError(404, "Resource not found"));
      }

      // Check if user is the owner or an admin
      if (
        resource.creator.toString() !== req.user._id.toString() &&
        req.user.role !== "admin"
      ) {
        return next(
          new ApiError(403, "You do not have permission to perform this action")
        );
      }

      req.resource = resource;
      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = {
  auth,
  authorize,
  checkOwnership,
};
