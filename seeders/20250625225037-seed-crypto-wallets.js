'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('cryptoWallet', [
      { user_id: 1, currency_id: 1, balance: 0.5 }, // BTC
      { user_id: 1, currency_id: 2, balance: 2.0 }, // ETH
      { user_id: 2, currency_id: 3, balance: 100 }, // XRP
      { user_id: 2, currency_id: 2, balance: 5.0 }, // ETH
      { user_id: 2, currency_id: 4, balance: 100 }, // DOGE
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('cryptoWallet', null, {});
  }
};
