'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RoomSubjects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  RoomSubjects.init({
    room: DataTypes.INTEGER,
    subject: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RoomSubjects',
  });
  return RoomSubjects;
};