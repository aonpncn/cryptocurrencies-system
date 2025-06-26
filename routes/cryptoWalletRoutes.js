const express = require('express');
const router = express.Router();
const controller = require('../controllers/cryptoWalletController');

router.post('/transfer', controller.transferCryptoInternal);

module.exports = router;