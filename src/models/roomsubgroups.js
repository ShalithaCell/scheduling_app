'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RoomSubGroups extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  RoomSubGroups.init({
    roomID: DataTypes.INTEGER,
    SubGroups: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'RoomSubGroups',
  });
  return RoomSubGroups;
};