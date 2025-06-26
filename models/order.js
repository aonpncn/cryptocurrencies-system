'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User, { foreignKey: 'user_id' });
      Order.belongsTo(models.Currency, { foreignKey: 'currency_id' });
    }
  }
  Order.init({
    order_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      field: 'order_id'
    },
    user_id: DataTypes.BIGINT,
    order_type: DataTypes.ENUM('buy', 'sell'),
    currency_id: DataTypes.BIGINT,
    amount: DataTypes.DECIMAL(20, 8),
    price_per_unit: DataTypes.DECIMAL(20, 8),
    status: DataTypes.ENUM('open', 'matched', 'completed', 'cancelled'),
    create_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Order',
    tableName: 'orders',
    timestamps: false
  });
  return Order;
};
