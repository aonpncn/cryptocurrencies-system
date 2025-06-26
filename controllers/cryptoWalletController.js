const db = require('../models');
const { CryptoWallet, Transaction } = db;

exports.transferCryptoInternal = async (req, res) => {
  try {
    const { from_user_id, to_user_id, currency_id, amount } = req.body;
    const numericAmount = parseFloat(amount);

    const fromWallet = await CryptoWallet.findOne({ where: { user_id: from_user_id, currency_id } });
    if (!fromWallet || fromWallet.balance < numericAmount) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    let toWallet = await CryptoWallet.findOne({ where: { user_id: to_user_id, currency_id } });
    if (!toWallet) {

      toWallet = await CryptoWallet.create({ user_id: to_user_id, currency_id, balance: 0 });
    }

    fromWallet.balance = parseFloat(fromWallet.balance) - numericAmount;
    await fromWallet.save();

    toWallet.balance = parseFloat(toWallet.balance) + numericAmount;
    await toWallet.save();

    await Transaction.create({
      from_user_id,
      to_user_id,
      amount: numericAmount,
      transaction_type: 'transfer',
      from_currency_id: currency_id,
      to_currency_id: currency_id
    });

    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
