const express = require("express");
const router = express.Router();
const controller = require("../controllers/bookClub.controller.js");
const authJwt = require("../middleware/authJwt.js");

// Public routes
router.get("/", controller.findAll);
router.get("/:id", controller.findOne);

// Protected routes
router.post("/", [authJwt.verifyToken], controller.create);
router.post("/:id/join", [authJwt.verifyToken], controller.join);
router.put("/:id", [authJwt.verifyToken], controller.update);
router.delete("/:id", [authJwt.verifyToken], controller.delete);

module.exports = router; 