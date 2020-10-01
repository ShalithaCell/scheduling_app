'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ParallelSessions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      session1ID: {
        type: Sequelize.INTEGER
      },
      session2ID: {
        type: Sequelize.INTEGER
      },
      session3ID: {
        type: Sequelize.INTEGER
      },
      session4ID: {
        type: Sequelize.INTEGER
      },
      session5ID: {
        type: Sequelize.INTEGER
      },
      session6ID: {
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
    await queryInterface.dropTable('ParallelSessions');
  }
};