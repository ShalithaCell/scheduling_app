'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Programme extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Programme.init({
    name: DataTypes.STRING,
    startYear: DataTypes.INTEGER,
    endYear: DataTypes.INTEGER,
    isActive: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Programme',
  });
  return Programme;
};