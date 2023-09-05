const bodyParser = require('body-parser');
const cors = require('cors')
const express = require('express');
const mongoose = require('mongoose');

const logRouter = require('./routes/logRouter');
const seedDatabase = require('./scripts/seed');

require('dotenv/config');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/cryptodb', logRouter);

mongoose
  .connect(process.env.CLOUD_DB_CONNECTION_STRING || process.env.LOCAL_DB_CONNECTION_STRING)
  .then(() => {
    console.log('Connected to MongoDB');
    seedDatabase(); 
  })
  .catch((error) => console.log('Error connecting to MongoDB', error));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server is runnig on port ${PORT}`));
