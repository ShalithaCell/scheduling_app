'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ExtendSubGroup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ExtendSubGroup.init({
    groupName: DataTypes.STRING,
    studentCount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ExtendSubGroup',
  });
  return ExtendSubGroup;
};