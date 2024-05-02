const punkapi = require("punkapi-db");

const punkapiDb = punkapi.sort((a, b) => a.id - b.id);

const filterImgUrls = (beer) => {
  // create array from obj
  const convertObjToArr = Object.entries(beer);
  // wanted key values
  const keys = ["id", "image_url"];
  // filter keys and convert back to object
  const filteredKeys = Object.fromEntries(
    convertObjToArr.filter(([key]) => keys.includes(key))
  );
  return filteredKeys;
};

const getImgUrls = punkapiDb.map((beer) => filterImgUrls(beer));

const pickByKey = (obj, arr) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => arr.includes(key))
  );
};

const keys = [
  "id",
  "name",
  "tagline",
  "first_brewed",
  "description",
  "image_url",
  "abv",
  "ebc",
  "food_pairing",
];

// extract required data set
const modifiedDb = punkapiDb.map((beerObj) => pickByKey(beerObj, keys));

// modify image url with just filename
modifiedDb.forEach((obj) => {
  if (obj.image_url) {
    let newImgUrl = obj.image_url.slice(obj["image_url"].lastIndexOf("/") + 1);
    obj.image_url = newImgUrl.replace("png", "webp");
  }
});

module.exports = { punkapiDb, getImgUrls, modifiedDb };
