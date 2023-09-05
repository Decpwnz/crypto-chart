const express = require('express');
const fs = require('fs');
const Coin = require('../models/Coin');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const coins = await Coin.find();
    res.json(coins);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { action, currency, timestamp } = req.body;
    const logData = new Coin({ action, currency, timestamp });

    console.log('Received log data:', logData);
    fs.appendFileSync('user_actions.log', JSON.stringify(logData) + '\n');

    const savedItem = await logData.save();
    
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;