'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sessions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  sessions.init({
    lectures: DataTypes.STRING,
    tags: DataTypes.STRING,
    sgroup: DataTypes.INTEGER,
    subGroup: DataTypes.STRING,
    student: DataTypes.INTEGER,
    duration: DataTypes.INTEGER,
    isActive: DataTypes.INTEGER,
    subject : DataTypes.INTEGER,
    subSubGroup : DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'sessions',
  });
  return sessions;
};