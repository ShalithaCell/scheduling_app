'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SubGroups extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  SubGroups.init({
    groupName: DataTypes.STRING,
    studentCount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SubGroups',
  });
  return SubGroups;
};