'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Programmes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      startYear: {
        type: Sequelize.INTEGER,
        references: {
          model: 'academicyearsandsemesters',
          key: 'id'
        }
      },
      endYear: {
        type: Sequelize.INTEGER,
        references: {
          model: 'academicyearsandsemesters',
          key: 'id'
        }
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
    await queryInterface.dropTable('Programmes');
  }
};