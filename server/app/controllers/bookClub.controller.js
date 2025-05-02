const BookClub = require("../models/bookClub.model.js");
const BookClubMember = require("../models/bookClubMember.model.js");
const db = require("../config/db.config.js");

// Create a new book club
exports.create = (req, res) => {
  if (!req.body.name || !req.body.description) {
    res.status(400).send({
      message: "Name and description are required!"
    });
    return;
  }

  const bookClub = {
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
    created_by: req.userId // Assuming you have user authentication
  };

  BookClub.create(bookClub)
    .then(data => {
      // Add creator as admin member
      BookClubMember.create({
        user_id: req.userId,
        book_club_id: data.id,
        role: 'admin'
      }).then(() => {
        res.send(data);
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the book club."
      });
    });
};

// Join a book club
exports.join = (req, res) => {
  const bookClubId = req.params.id;
  const userId = req.userId;

  // Check if user is already a member
  BookClubMember.findOne({
    where: {
      user_id: userId,
      book_club_id: bookClubId
    }
  })
    .then(existingMember => {
      if (existingMember) {
        res.status(400).send({
          message: "You are already a member of this book club."
        });
        return;
      }

      // Create new membership
      BookClubMember.create({
        user_id: userId,
        book_club_id: bookClubId,
        role: 'member'
      })
        .then(data => {
          res.send({
            message: "Successfully joined the book club!",
            data: data
          });
        })
        .catch(err => {
          res.status(500).send({
            message: err.message || "Some error occurred while joining the book club."
          });
        });
    });
};

// Get all book clubs
exports.findAll = (req, res) => {
  BookClub.findAll({
    include: [{
      model: BookClubMember,
      where: { user_id: req.userId },
      required: false
    }]
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving book clubs."
      });
    });
};

// Get a single book club by id
exports.findOne = (req, res) => {
  const id = req.params.id;

  BookClub.findByPk(id, {
    include: [{
      model: BookClubMember,
      where: { user_id: req.userId },
      required: false
    }]
  })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find book club with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving book club with id=" + id
      });
    });
};

// Update a book club
exports.update = (req, res) => {
  const id = req.params.id;

  BookClub.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Book club was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update book club with id=${id}. Maybe book club was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating book club with id=" + id
      });
    });
};

// Delete a book club
exports.delete = (req, res) => {
  const id = req.params.id;

  BookClub.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Book club was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete book club with id=${id}. Maybe book club was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete book club with id=" + id
      });
    });
}; 