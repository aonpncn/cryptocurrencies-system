const db = require('../models');
const { FiatWallet, Currency, Transaction } = db;

exports.depositFiat = async (req, res) => {
  try {
    const { user_id, amount } = req.body;
    const thbCurrency = await Currency.findOne({ where: { code: 'THB' } });

    if (!thbCurrency) return res.status(404).json({ error: 'THB currency not found' });

    const wallet = await FiatWallet.findOne({
      where: { user_id, currency_id: thbCurrency.currency_id }
    });

    if (!wallet) return res.status(404).json({ error: 'Wallet not found' });

    wallet.balance += parseFloat(amount);
    await wallet.save();

    await Transaction.create({
      from_user_id: user_id,
      to_user_id: user_id,
      amount,
      transaction_type: 'deposit',
      from_currency_id: thbCurrency.currency_id,
      to_currency_id: thbCurrency.currency_id
    });

    res.json({ message: 'Deposit successful', wallet });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.withdrawFiat = async (req, res) => {
  try {
    const { user_id, amount } = req.body;

    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    const thbCurrency = await Currency.findOne({ where: { code: 'THB' } });
    if (!thbCurrency) return res.status(404).json({ error: 'THB currency not found' });

    const wallet = await FiatWallet.findOne({
      where: { user_id, currency_id: thbCurrency.currency_id }
    });

    if (!wallet) return res.status(404).json({ error: 'Wallet not found' });

    if (wallet.balance < parseFloat(amount)) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    wallet.balance -= parseFloat(amount);
    await wallet.save();

    await Transaction.create({
      from_user_id: user_id,
      to_user_id: user_id,
      amount,
      transaction_type: 'withdraw',
      from_currency_id: thbCurrency.currency_id,
      to_currency_id: thbCurrency.currency_id
    });

    res.json({ message: 'Withdraw successful', wallet });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
