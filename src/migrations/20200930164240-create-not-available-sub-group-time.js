'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('NotAvailableSubGroupTimes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      groupID: {
        type: Sequelize.INTEGER
      },
      subGroupID: {
        type: Sequelize.STRING
      },
      extendSubGroup: {
        type: Sequelize.STRING
      },
      dayIDs: {
        type: Sequelize.STRING
      },
      timeFrom: {
        type: Sequelize.STRING
      },
      timeTo: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('NotAvailableSubGroupTimes');
  }
};