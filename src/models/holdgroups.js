'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HoldGroups extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  HoldGroups.init({
    groupName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'HoldGroups',
  });
  return HoldGroups;
};