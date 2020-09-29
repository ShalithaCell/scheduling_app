'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('sessions', 'group', 'sgroup');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('sessions', 'sgroup', 'group');
  }
};
