'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Subjects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      subjectName: {
        type: Sequelize.STRING
      },
      subjectCode: {
        type: Sequelize.STRING
      },
      academicYearAndSemester: {
        type: Sequelize.INTEGER,
        references: {
          model: 'academicyearsandsemesters',
          key: 'id'
        }
      },
      lectureHours: {
        type: Sequelize.INTEGER
      },
      tutorialHours: {
        type: Sequelize.INTEGER
      },
      labHours: {
        type: Sequelize.INTEGER
      },
      evaluationHours: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Subjects');
  }
};
