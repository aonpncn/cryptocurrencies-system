'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('users', [
      { 
        username: 'aonpx', 
        email: 'aonpx@example.com', 
        password: 'hashedpassword1' 
      },
      { 
        username: 'pncn', 
        email: 'pncn@example.com', 
        password: 'hashedpassword2' 
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
