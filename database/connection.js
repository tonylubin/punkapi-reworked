require('dotenv').config();
const mongoose = require('mongoose');

const connectionString = process.env.ATLAS_URI || "";

const db = async () => {
  try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(connectionString, {dbName: 'punkapi'});
    console.log(`Connected to database: ${conn.connection.name}`);
  } catch(err) {
    console.log(err);
  }
};


module.exports = db;