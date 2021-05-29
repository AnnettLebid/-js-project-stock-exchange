const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const config = require("./config");
const MongoClient = require("mongodb").MongoClient;
let searchCollection;

const app = express();
const PORT = process.env.PORT ||3000;

app.use(cors());
app.use(express.static('client'));

const apiKey = config.SECRET_API_KEY;
const baseUrl = "https://financialmodelingprep.com/api/v3";

app.listen(PORT, function () {
  console.log("Connected succesfully to server");
});

async function searchNasdaq(searchTerm) {
  const response = await fetch(
    `${baseUrl}/search?query=${searchTerm}&limit=10&exchange=NASDAQ&apikey=${apiKey}`
  );
  const data = await response.json();
  return data;
}

async function fetchCompanyProfile(symbol) {
  const response = await fetch(
    `${baseUrl}/company/profile/${symbol}?apikey=${apiKey}`
  );
  const data = await response.json();
  return data;
}

async function searchNasdaqWithProfile(searchTerm) {
  const companies = await searchNasdaq(searchTerm);
  const fetchCompaniesProfiles = companies.map((company) => {
    return fetchCompanyProfile(company.symbol);
  });
  const companiesWithProfiles = await Promise.all(fetchCompaniesProfiles);
  return companiesWithProfiles;
}

const dbName = "nasdaqapi";

MongoClient.connect(
  `mongodb://localhost:27017/nasdaqapi`,
  { useUnifiedTopology: true },
  function (err, client) {
    if (err) {
      return console.log(err);
    } else {
      console.log("Connected to database");
    }
    const db = client.db(dbName);
    searchCollection = db.collection("search");
  }
);

app.get("/search-history", (req, res) => {
  const sortByDate = { date: 1 };
  searchCollection
    .find()
    .sort(sortByDate)
    .toArray(function (err, result) {
      if (err) throw err;      
      res.send(JSON.stringify(result));
      db.close();
    });
});
