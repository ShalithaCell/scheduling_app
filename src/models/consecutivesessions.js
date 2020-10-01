'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class consecutiveSessions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  consecutiveSessions.init({
    session1ID: DataTypes.INTEGER,
    session2ID: DataTypes.INTEGER,
    session3ID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'consecutiveSessions',
  });
  return consecutiveSessions;
};