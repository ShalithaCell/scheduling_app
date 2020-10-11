'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
        'TimeTableGs',
        'roomIds',
        Sequelize.STRING
    );
  },

  down: async (queryInterface, Sequelize) => {
    // logic for reverting the changes
    return queryInterface.removeColumn(
        'TimeTableGs',
        'roomIds'
    );
  }
};
