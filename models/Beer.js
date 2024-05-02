const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BeerSchema = new Schema({
  _id: {type: Number, required: true},
  name: {type: String, required: true},
  tagline: {type: String, required: true},
  first_brewed: {type: String, required: true},
  description: {type: String, required: true},
  image_url: {type: String},
  abv: {type: Number},
  ebc: {type: Number},
  food_pairing: [{type: String, required: true}] 
});

module.exports = mongoose.model('Beer', BeerSchema) 