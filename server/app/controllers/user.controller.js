const User = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

exports.register = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty!",
    });
  }

  const user = new User({
    name: req.body.name,
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
  });

  User.create(user, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while registering the user.",
      });
    } else {
      res.send({
        message: "User registered successfully.",
        data: data,
      });
    }
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findByEmail(email, (err, user) => {
    if (err || !user) {
      res.status(404).send({
        message: "User not found!",
      });
      return;
    }

    if (bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign(
        { id: user.id, email: user.email },
        config.secret,
        { expiresIn: config.jwtExpiration }
      );

      res.send({
        message: "Login successful!",
        userId: user.id,
        email: user.email,
        accessToken: token,
      });
    } else {
      res.status(401).send({
        message: "Invalid email or password!",
      });
    }
  });
};

exports.getUserProfile = (req, res) => {
  const id = req.params.id;

  User.findById(id, (err, user) => {
    if (err) {
      res.status(500).send({
        message: "Error retrieving user profile.",
      });
    } else {
      res.send({
        user,
      });
    }
  });
};

exports.updateUserProfile = (req, res) => {
  const id = req.params.id;

  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty!",
    });
  }

  const updatedUser = {
    name: req.body.name,
    userName: req.body.userName,
    email: req.body.email,
  };

  User.updateProfileById(id, updatedUser, (err, data) => {
    if (err) {
      res.status(500).send({
        message: "Error updating user profile.",
      });
    } else {
      res.send({
        message: "User profile updated successfully.",
        data,
      });
    }
  });
};

exports.updateUserPassword = (req, res) => {
  const id = req.params.id;
  const { password } = req.body;

  if (!password) {
    res.status(400).send({
      message: "Password is required!",
    });
  }

  User.updatePasswordById(id, password, (err, data) => {
    if (err) {
      res.status(500).send({
        message: "Error updating password.",
      });
    } else {
      res.send({
        message: "Password updated successfully.",
        data,
      });
    }
  });
};

exports.deleteUser = (req, res) => {
  const id = req.params.id;

  User.remove(id, (err, data) => {
    if (err) {
      res.status(500).send({
        message: "Could not delete user.",
      });
    } else {
      res.send({
        message: "User deleted successfully.",
        data,
      });
    }
  });
};
