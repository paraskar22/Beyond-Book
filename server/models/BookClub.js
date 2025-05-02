const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const BookClub = sequelize.define('BookClub', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  meetingTime: {
    type: DataTypes.STRING,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  currentBook: {
    type: DataTypes.STRING,
    allowNull: false
  },
  maxMembers: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 20
  }
}, {
  timestamps: true
});

module.exports = BookClub; 