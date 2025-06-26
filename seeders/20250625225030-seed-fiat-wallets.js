'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('fiatWallet', [
      { user_id: 1, currency_id: 5, balance: 100000.00 },  // THB
      { user_id: 2, currency_id: 5, balance: 200000.00 },  // THB
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('fiatWallet', null, {});
  }
};
