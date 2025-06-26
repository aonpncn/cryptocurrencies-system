'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('currency', [
      { code: 'BTC', name: 'Bitcoin', type: 'crypto' },
      { code: 'ETH', name: 'Ethereum', type: 'crypto' },
      { code: 'XRP', name: 'Ripple', type: 'crypto' },
      { code: 'DOGE', name: 'Dogecoin', type: 'crypto' },
      { code: 'THB', name: 'Thai Baht', type: 'fiat' },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('currency', null, {});
  }
};
