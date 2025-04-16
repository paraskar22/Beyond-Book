module.exports = (app) => {
  const users = require("../controllers/user.controller.js");
  const { verifyToken } = require("../middleware/auth.js");

  var router = require("express").Router();

  router.post("/register", users.register);

  router.post("/login", users.login);

  router.get("/:id", verifyToken, users.getUserProfile);

  router.put("/:id", verifyToken, users.updateUserProfile);

  router.put("/:id/password", verifyToken, users.updateUserPassword);

  router.delete("/:id", verifyToken, users.deleteUser);

  app.use("/api/users", router);
};
