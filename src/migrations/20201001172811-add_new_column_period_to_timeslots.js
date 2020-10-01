'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
        'TimeTableSlots',
        'period',
        Sequelize.INTEGER
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
        'TimeTableSlots',
        'period'
    );
  }
};
