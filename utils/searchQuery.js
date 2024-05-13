const Beer = require("../models/Beer");


let brewedBefore = (date) => {
  return { first_brewed: { $lte: new Date(date) } };
};

let abv = (num) => {
  return { abv: { $lte: parseInt(num) } };
};

let foodPairings = (searchQuery) => {
  return { food_pairing: { $regex: searchQuery, $options: "i" } };
};

let nameSearch = (term) => {
  return {
    $or: [
      { name: { $regex: term, $options: "i" } },
      { tagline: { $regex: term, $options: "i" } },
      { description: { $regex: term, $options: "i" } },
    ]
  }
};

//  data sorted by id ascending
let beersData = async () => await Beer.find().sort({ _id: 1 });


module.exports = { brewedBefore, abv, foodPairings, nameSearch, beersData };