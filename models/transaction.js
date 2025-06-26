'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {
      Transaction.belongsTo(models.User, { as: 'FromUser', foreignKey: 'from_user_id' });
      Transaction.belongsTo(models.User, { as: 'ToUser', foreignKey: 'to_user_id' });
      Transaction.belongsTo(models.Currency, { as: 'FromCurrency', foreignKey: 'from_currency_id' });
      Transaction.belongsTo(models.Currency, { as: 'ToCurrency', foreignKey: 'to_currency_id' });
    }
  }
  Transaction.init({
    transaction_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      field: 'transaction_id'
    },
    from_user_id: DataTypes.BIGINT,
    to_user_id: DataTypes.BIGINT,
    amount: DataTypes.DECIMAL(20, 8),
    transaction_type: DataTypes.ENUM('buy', 'sell', 'transfer', 'deposit', 'withdraw'),
    from_currency_id: DataTypes.BIGINT,
    to_currency_id: DataTypes.BIGINT,
    transaction_time: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Transaction',
    tableName: 'transaction',
    timestamps: false
  });
  return Transaction;
};
