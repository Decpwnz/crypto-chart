const Coin = require('../models/Coin');

const seedDatabase = async () => {
  try {
    await Promise.all([
      Coin.deleteMany({}),
    ])
      .then(() => console.log('Deleting database data'));

    const example = new Coin({ action: 'initialSeedValue', currency: 'initialSeedValue' });

    await example.save();

    console.log('Database populated with initial data.');
  } catch (error) {
    console.log('An error occurred while populating the database:', error);
  }
};

module.exports = seedDatabase;