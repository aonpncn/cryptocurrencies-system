const express = require('express');
const router = express.Router();
const controller = require('../controllers/fiatWalletController');

router.post('/deposit', controller.depositFiat);
router.post('/withdraw', controller.withdrawFiat);


module.exports = router;