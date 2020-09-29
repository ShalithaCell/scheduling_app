'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class notAvailableGroups extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  notAvailableGroups.init({
    groupid: DataTypes.INTEGER,
    day: DataTypes.INTEGER,
    fromt: DataTypes.STRING,
    tot: DataTypes.STRING,
    isActive: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'notAvailableGroups',
  });
  return notAvailableGroups;
};