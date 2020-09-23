'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('notAvailableGroups', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      groupid: {
        type: Sequelize.INTEGER
      },
      day: {
        type: Sequelize.INTEGER
      },
      fromt: {
        type: Sequelize.STRING
      },
      tot: {
        type: Sequelize.STRING
      },
      isActive: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('notAvailableGroups');
  }
};