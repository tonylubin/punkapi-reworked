const express = require('express');
const cors = require('cors');
const { punkapiDb } = require('./data/beers');
const db = require('./database/connection');
const Beer = require('./models/Beer');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3333;

// database connection
db();

app.use(cors());

app.use(express.json());

app.get('/', (_,res) => res.send('Welcome to the Brewdog punkapi remastered!'));

// all beers
app.get('/beers', async (_,res) => {
  const beersDb = await Beer.find();
  res.send(beersDb);
});

// random beer
app.get('/random', (_,res) => {
  let randomNumder = Math.floor(Math.random() * punkapiDb.length);
  res.send(punkapiDb[randomNumder]);
});

app.get('*', (_,res) => res.status(404).send("Wrong address, no records exsit at this route"));

app.listen(port, () => console.log(`Server running on port http://localhost:${port}`));