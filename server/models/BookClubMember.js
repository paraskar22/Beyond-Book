const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const BookClubMember = sequelize.define('BookClubMember', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  bookClubId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('member', 'admin'),
    defaultValue: 'member'
  }
}, {
  timestamps: true
});

module.exports = BookClubMember; 