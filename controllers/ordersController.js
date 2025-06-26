const db = require('../models');
const { Order, Currency, FiatWallet, CryptoWallet, Transaction } = db;

exports.buyCrypto = async (req, res) => {
  try {
    const { user_id, currency_id, amount, price_per_unit } = req.body;
    const totalCost = parseFloat(amount) * parseFloat(price_per_unit);

    const thbCurrency = await Currency.findOne({ where: { code: 'THB' } });

    const fiatWallet = await FiatWallet.findOne({ where: { user_id, currency_id: thbCurrency.currency_id } });
    if (!fiatWallet || fiatWallet.balance < totalCost) {
      return res.status(400).json({ error: 'Insufficient THB balance' });
    }

    fiatWallet.balance -= totalCost;
    await fiatWallet.save();

    let cryptoWallet = await CryptoWallet.findOne({ where: { user_id, currency_id } });
    if (!cryptoWallet) {
      cryptoWallet = await CryptoWallet.create({ user_id, currency_id, balance: 0 });
    }
    
    await cryptoWallet.increment('balance', { by: parseFloat(amount) });

    const order = await Order.create({
      user_id,
      currency_id,
      order_type: 'buy',
      amount,
      price_per_unit,
      status: 'completed'
    });

    await Transaction.create({
      from_user_id: user_id,
      to_user_id: user_id,
      amount,
      transaction_type: 'buy',
      from_currency_id: thbCurrency.currency_id,
      to_currency_id: currency_id
    });

    res.status(201).json({ message: 'Buy order completed', order });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.sellCrypto = async (req, res) => {
  try {
    const { user_id, currency_id, amount, price_per_unit } = req.body;
    const totalTHB = parseFloat(amount) * parseFloat(price_per_unit);

    const cryptoWallet = await CryptoWallet.findOne({ where: { user_id, currency_id } });
    if (!cryptoWallet || cryptoWallet.balance < amount) {
      return res.status(400).json({ error: 'Insufficient crypto balance' });
    }

    await cryptoWallet.decrement('balance', { by: parseFloat(amount) });

    const thbCurrency = await Currency.findOne({ where: { code: 'THB' } });
    let fiatWallet = await FiatWallet.findOne({
      where: { user_id, currency_id: thbCurrency.currency_id }
    });

    if (!fiatWallet) {
      fiatWallet = await FiatWallet.create({
        user_id,
        currency_id: thbCurrency.currency_id,
        balance: parseFloat(totalTHB)
      });
    } else {
      await fiatWallet.increment('balance', { by: parseFloat(totalTHB) });
    }

    const order = await Order.create({
      user_id,
      currency_id,
      order_type: 'sell',
      amount,
      price_per_unit,
      status: 'completed'
    });

    await Transaction.create({
      from_user_id: user_id,
      to_user_id: user_id,
      amount,
      transaction_type: 'sell',
      from_currency_id: currency_id,
      to_currency_id: thbCurrency.currency_id
    });

    res.status(201).json({ message: 'Sell order completed', order });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
