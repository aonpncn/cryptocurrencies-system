const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');

const usersRoutes = require('./routes/usersRoutes');
const ordersRoutes = require('./routes/ordersRoutes');
const cryptoWalletRoutes = require('./routes/cryptoWalletRoutes');
const fiatWalletRoutes = require('./routes/fiatWalletRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Routes
app.use('/users', usersRoutes);
app.use('/orders', ordersRoutes);
app.use('/crypto-wallets', cryptoWalletRoutes);
app.use('/fiat-wallets', fiatWalletRoutes);


db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Failed to connect to database:', err);
});
