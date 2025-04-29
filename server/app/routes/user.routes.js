const express = require("express");
const router = express.Router();

// ✅ FIX: Import the controller file correctly
const controller = require("../controllers/user.controller"); // make sure this path is correct

// ✅ Define your routes using the imported controller functions
router.post("/login", controller.login);
router.post("/register", controller.register);
router.get("/profile/:id", controller.getUserProfile);
router.put("/profile/:id", controller.updateUserProfile);
router.put("/password/:id", controller.updateUserPassword);
router.delete("/:id", controller.deleteUser);

module.exports = router;
