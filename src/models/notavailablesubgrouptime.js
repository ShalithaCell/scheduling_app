'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NotAvailableSubGroupTime extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  NotAvailableSubGroupTime.init({
    groupID: DataTypes.INTEGER,
    subGroupID: DataTypes.STRING,
    extendSubGroup: DataTypes.STRING,
    dayIDs: DataTypes.STRING,
    timeFrom: DataTypes.STRING,
    timeTo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'NotAvailableSubGroupTime',
  });
  return NotAvailableSubGroupTime;
};