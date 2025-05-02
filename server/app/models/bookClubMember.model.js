const db = require("../config/db.config.js");
const { DataTypes } = require("sequelize");

const BookClubMember = db.define("book_club_member", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  book_club_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'book_clubs',
      key: 'id'
    }
  },
  role: {
    type: DataTypes.ENUM('admin', 'member'),
    defaultValue: 'member'
  },
  joined_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active'
  }
}, {
  timestamps: true,
  underscored: true,
  tableName: 'book_club_members'
});

module.exports = BookClubMember; 