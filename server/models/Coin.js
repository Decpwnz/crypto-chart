const mongoose = require('mongoose');

const CoinSchema = {
  action: String,
  currency: String,
  timestamp: Date,
}

const Coin = mongoose.model('Coin', CoinSchema);

module.exports = Coin;