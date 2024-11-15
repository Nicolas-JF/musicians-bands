const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../db/connection');

const Song = sequelize.define('Song', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  length: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Song;
