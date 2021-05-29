const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
// const config = require("./config");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT ||3000;

app.use(cors());
app.use(express.static('client'));

const apiKey = process.env.SECRET_API_KEY;
const baseUrl = "https://financialmodelingprep.com/api/v3";

app.listen(PORT, function () {
  console.log(`Connected succesfully to server, listening on port ${PORT}`);
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

async function getStockPriceData() { 
  const response = await fetch(
    `https://financialmodelingprep.com/api/v3/quotes/nyse?apikey=${apiKey}`
  );
  const data = await response.json();
  return data;
}

app.get("/stock-price", (req, res) => {
  getStockPriceData().then((stockPriceData) => {    
    const stockPrices = stockPriceData.slice(0, 200)   
  });  
});

app.get("/search", (req, res) => {
  const searchQuery = req.query.query;
  searchNasdaqWithProfile(searchQuery).then((companiesWithProfiles) => {
    res.send(companiesWithProfiles);
  });
});