'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Levels', [{
      category: 'Professor',
      level: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      category: 'Assistant Professor',
      level: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      category: 'Senior Lecturer(HG)',
      level: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      category: 'Senior Lecturer',
      level: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      category: 'Lecturer',
      level: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      category: 'Assistant Lecturer',
      level: 6,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      category: 'Instructors',
      level: 7,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Levels', null, {});
  }
};
