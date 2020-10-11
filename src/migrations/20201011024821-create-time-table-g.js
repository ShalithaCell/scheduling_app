'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('TimeTableGs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ProgramID: {
        type: Sequelize.INTEGER
      },
      DayID: {
        type: Sequelize.INTEGER
      },
      TimePeriod: {
        type: Sequelize.STRING
      },
      SessionID: {
        type: Sequelize.STRING
      },
      Lecturers: {
        type: Sequelize.STRING
      },
      Rooms: {
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
    await queryInterface.dropTable('TimeTableGs');
  }
};