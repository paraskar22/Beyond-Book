const sql = require("./db.js");
const bcrypt = require("bcryptjs");

const User = function (user) {
  this.name = user.name;
  this.userName = user.userName;
  this.email = user.email;
  this.password = user.password;
};

User.create = (newUser, result) => {
  newUser.password = bcrypt.hashSync(newUser.password, 10);

  sql.query("INSERT INTO Users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("Error creating user: ", err);
      result(err, null);
      return;
    }

    result(null, { id: res.insertId, ...newUser });
  });
};

User.findById = (id, result) => {
  sql.query("SELECT * FROM Users WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("Error fetching user: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res[0]);
    } else {
      result({ kind: "not_found" }, null);
    }
  });
};

User.findByEmail = (email, result) => {
  sql.query("SELECT * FROM Users WHERE email = ?", email, (err, res) => {
    if (err) {
      console.log("Error fetching user by email: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res[0]);
    } else {
      result({ kind: "not_found" }, null);
    }
  });
};

User.updateProfileById = (id, user, result) => {
  const { name, userName, email } = user;

  sql.query(
    "UPDATE Users SET name = ?, userName = ?, email = ?, updatedAt = ? WHERE id = ?",
    [name, userName, email, new Date(), id],
    (err, res) => {
      if (err) {
        console.log("Error updating user profile: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      result(null, { id, name, userName, email });
    }
  );
};

User.updatePasswordById = (id, password, result) => {
  const hashedPassword = bcrypt.hashSync(password, 10);

  sql.query(
    "UPDATE Users SET password = ?, updatedAt = ? WHERE id = ?",
    [hashedPassword, new Date(), id],
    (err, res) => {
      if (err) {
        console.log("Error updating password: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      result(null, { id, password: hashedPassword });
    }
  );
};

User.remove = (id, result) => {
  sql.query("DELETE FROM Users WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("Error deleting user: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    result(null, { message: "User deleted successfully" });
  });
};

module.exports = User;
