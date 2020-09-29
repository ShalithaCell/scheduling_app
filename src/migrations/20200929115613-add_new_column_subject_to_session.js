'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
        'sessions',
        'subject',
        Sequelize.INTEGER
    );

  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
        'sessions',
        'subject'
    );
  }
};
