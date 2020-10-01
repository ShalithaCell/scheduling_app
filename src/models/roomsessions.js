'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RoomSessions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  RoomSessions.init({
    room: DataTypes.INTEGER,
    session: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RoomSessions',
  });
  return RoomSessions;
};