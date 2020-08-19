'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    return queryInterface.bulkInsert('Days', [{
      day: 'Monday',
      isActive: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      day: 'Tuesday',
      isActive: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
      {
        day: 'Wednesday',
        isActive: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        day: 'Thursday',
        isActive: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        day: 'Friday',
        isActive: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        day: 'Saturday',
        isActive: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        day: 'Sunday',
        isActive: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }], );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    return queryInterface.bulkDelete('Days', null, {});
  }
};
