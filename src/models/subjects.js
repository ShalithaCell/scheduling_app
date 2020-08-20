'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subjects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Subjects.init({
    subjectName: DataTypes.STRING,
    subjectCode: DataTypes.STRING,
    academicYearAndSemester: DataTypes.INTEGER,
    lectureHours: DataTypes.INTEGER,
    tutorialHours: DataTypes.INTEGER,
    labHours: DataTypes.INTEGER,
    evaluationHours: DataTypes.INTEGER,
    isActive: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Subjects',
  });
  return Subjects;
};
