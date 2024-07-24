'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Full name cannot be empty' },
        notNull: { msg: 'Full name cannot be null' }
      }
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isAlphanumeric: true,
        len: [3, 25],
        notEmpty: { msg: 'Username cannot be empty' },
        notNull: { msg: 'Username cannot be null' }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Password cannot be empty' },
        notNull: { msg: 'Password cannot be null' },
        len: [8, 100]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { msg: 'Email is not valid' },
        notEmpty: { msg: 'Email cannot be empty' },
        notNull: { msg: 'Email cannot be null' }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};