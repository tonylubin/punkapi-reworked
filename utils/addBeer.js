const { modifiedDb } = require('../data/beers');
const Beer = require('../models/Beer');


const addBeer = async (data) => {
  try {
    const newBeer = new Beer({...data, _id: data.id});
    const postBeerToDb = await newBeer.save();
    if(postBeerToDb === newBeer) {
      console.log("Successfully saved document to the database")
    } else {
      console.log('Something went wrong!')
    }    
  } catch (error) {
    console.log(error)
  }
};

// add data to mongodb
modifiedDb.forEach((obj) => addBeer(obj));