'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Consecutivesessions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Consecutivesessions.init({
    yearandsemester: DataTypes.INTEGER,
    programme: DataTypes.INTEGER,
    moduleID: DataTypes.INTEGER,
    tagID1: DataTypes.INTEGER,
    tagID2: DataTypes.INTEGER,
    tagID3: DataTypes.INTEGER,
    isActive: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Consecutivesessions',
  });
  return Consecutivesessions;
};