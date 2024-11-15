const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../db/connection');

const Band = sequelize.define('Band', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Band;
