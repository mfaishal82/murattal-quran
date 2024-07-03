'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fullName: {
        type: Sequelize.STRING
      },
      userName: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isAlphanumeric: true,
          len: [3, 25],
          notEmpty: { msg: 'Username cannot be empty'},
          notNull: { msg: 'Username cannot be null' }
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'Password cannot be empty'},
          notNull: { msg: 'Password cannot be null' },
          len: [8, 100]
        }
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: { msg: 'Email is not valid'},
          notEmpty: { msg: 'Email cannot be empty'},
          notNull: { msg: 'Email cannot be null' }
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};