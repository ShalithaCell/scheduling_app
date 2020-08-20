'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rooms extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Rooms.init({
    roomName: DataTypes.STRING,
    capacity: DataTypes.INTEGER,
    tag: DataTypes.INTEGER,
    building: DataTypes.INTEGER,
    isActive: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Rooms',
  });
  return Rooms;
};
