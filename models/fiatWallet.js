'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FiatWallet extends Model {
    static associate(models) {
      FiatWallet.belongsTo(models.User, { foreignKey: 'user_id' });
      FiatWallet.belongsTo(models.Currency, { foreignKey: 'currency_id' });
    }
  }
  FiatWallet.init({
    fiatWallet_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      field: 'fiatWallet_id'
    },
    user_id: DataTypes.BIGINT,
    currency_id: DataTypes.BIGINT,
    balance: DataTypes.DECIMAL(20, 8)
  }, {
    sequelize,
    modelName: 'FiatWallet',
    tableName: 'fiatWallet',
    timestamps: false
  });
  return FiatWallet;
};
