'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Currency extends Model {
    static associate(models) {
      Currency.hasMany(models.CryptoWallet, { foreignKey: 'currency_id' });
      Currency.hasMany(models.FiatWallet, { foreignKey: 'currency_id' });
      Currency.hasMany(models.Order, { foreignKey: 'currency_id' });
      Currency.hasMany(models.Transaction, { foreignKey: 'from_currency_id' });
      Currency.hasMany(models.Transaction, { foreignKey: 'to_currency_id' });
    }
  }
  Currency.init({
    currency_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      field: 'currency_id'
    },
    code: DataTypes.STRING,
    name: DataTypes.STRING,
    type: DataTypes.ENUM('crypto', 'fiat')
  }, {
    sequelize,
    modelName: 'Currency',
    tableName: 'currency',
    timestamps: false
  });
  return Currency;
};
