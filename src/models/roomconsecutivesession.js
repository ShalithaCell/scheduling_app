'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RoomConsecutiveSession extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  RoomConsecutiveSession.init({
    roomID: DataTypes.INTEGER,
    conSessionID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RoomConsecutiveSession',
  });
  return RoomConsecutiveSession;
};