const express = require('express');
const router = express.Router();
const controller = require('../controllers/ordersController');

router.post('/buy', controller.buyCrypto);
router.post('/sell', controller.sellCrypto);

module.exports = router;