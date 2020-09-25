'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RoomTags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  RoomTags.init({
    room: DataTypes.INTEGER,
    tag: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RoomTags',
  });
  return RoomTags;
};