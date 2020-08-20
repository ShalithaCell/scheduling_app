'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lecturers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Lecturers.init({
    lecturerName: DataTypes.STRING,
    empId: DataTypes.INTEGER,
    department: DataTypes.INTEGER,
    faculty: DataTypes.INTEGER,
    center: DataTypes.INTEGER,
    building: DataTypes.INTEGER,
    level: DataTypes.INTEGER,
    isActive: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Lecturers',
  });
  return Lecturers;
};
