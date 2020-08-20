'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ExtendGroups extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ExtendGroups.init({
    groupName: DataTypes.STRING,
    groupCount: DataTypes.INTEGER,
    studentCount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ExtendGroups',
  });
  return ExtendGroups;
};