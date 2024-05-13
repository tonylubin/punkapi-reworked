const express = require("express");
const cors = require("cors");
const db = require("./database/connection");
const Beer = require("./models/Beer");
const {
  beersData,
  brewedBefore,
  abv,
  foodPairings,
  nameSearch,
} = require("./utils/searchQuery");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3333;

// database connection
db();

app.use(cors());

app.use(express.json());

// all beers
app.get("/", async (_, res) => {
  let msg = "<h1>Welcome to my reworked Brewdog punkapi</h1>";
  res.send(msg);
});

// random beer
app.get("/random", async (_, res) => {
  const beersDb = await beersData();
  let randomNumder = Math.floor(Math.random() * beersDb.length);
  res.send(beersDb[randomNumder]);
});

// beers query & filters
app.get("/beers", async (req, res) => {
  let queryString = req.query;
  let check = Object.keys(queryString).length;
  let searchResults;
  let searchQuery;

  if (check) {
    try {
      for (let [key, value] of Object.entries(queryString)) {
        let dbQueryExpr;
        switch (key) {
          case "abv_lt":
            dbQueryExpr = abv(value);
            searchQuery = { ...searchQuery, ...dbQueryExpr };
            break;
          case "food_pairing":
            dbQueryExpr = foodPairings(value);
            searchQuery = { ...searchQuery, ...dbQueryExpr };
            break;
          case "brewed_before":
            dbQueryExpr = brewedBefore(value);
            searchQuery = { ...searchQuery, ...dbQueryExpr };
            break;
        }
      };

      if ('beer_name' in queryString) {
        let nameSearchResults = nameSearch(queryString.beer_name);
        searchQuery = [{ $match: { ...nameSearchResults, ...searchQuery } }]; 
      } else {
        searchQuery = [{ $match: { ...searchQuery } }];
      }
      
      searchResults = await Beer.aggregate(searchQuery);
    } catch (error) {
      console.log(error);
    }
  } else {
    searchResults = await Beer.find().sort({ _id: 1 });
  }

  res.send(searchResults);
});

app.get("*", (_, res) =>
  res.status(404).send("Wrong address, no records exsit at this route")
);

app.listen(port, () =>
  console.log(`Server running on port http://localhost:${port}`)
);