'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CryptoWallet extends Model {
    static associate(models) {
      CryptoWallet.belongsTo(models.User, { foreignKey: 'user_id' });
      CryptoWallet.belongsTo(models.Currency, { foreignKey: 'currency_id' });
    }
  }
  CryptoWallet.init({
    cryptoWallet_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      field: 'cryptoWallet_id'
    },
    user_id: DataTypes.BIGINT,
    currency_id: DataTypes.BIGINT,
    balance: DataTypes.DECIMAL(20, 8)
  }, {
    sequelize,
    modelName: 'CryptoWallet',
    tableName: 'cryptoWallet',
    timestamps: false
  });
  return CryptoWallet;
};
