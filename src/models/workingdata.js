'use strict';
const {
  Model
} = require('sequelize');

const { Days } = require('./days');

module.exports = (sequelize, DataTypes) => {
  class WorkingData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  WorkingData.init({
    day: {
      type : DataTypes.INTEGER,
      references: {
        model: 'Days',
        key: 'id'
      }
    },
    time: DataTypes.STRING,
    isActive: DataTypes.INTEGER,
    type:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'WorkingData',
  });



  return WorkingData;
};