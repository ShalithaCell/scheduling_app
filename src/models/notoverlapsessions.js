'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NotOverlapSessions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  NotOverlapSessions.init({
    session1ID: DataTypes.INTEGER,
    session2ID: DataTypes.INTEGER,
    session3ID: DataTypes.INTEGER,
    session4ID: DataTypes.INTEGER,
    session5ID: DataTypes.INTEGER,
    session6ID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'NotOverlapSessions',
  });
  return NotOverlapSessions;
};