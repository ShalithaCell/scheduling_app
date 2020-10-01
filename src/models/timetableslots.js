'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TimeTableSlots extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  TimeTableSlots.init({
    type: DataTypes.INTEGER,
    day: DataTypes.INTEGER,
    slot: DataTypes.STRING,
    period : DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TimeTableSlots',
  });
  return TimeTableSlots;
};