let urlParams = new URLSearchParams(window.location.search);
let compSymbol = urlParams.get("symbol");
const apiKey = "ed93f3e229380c530b7a0e7663f86b99";

async function getCompanyProfile() {  
  let response = await fetch(
    `https://financialmodelingprep.com/api/v3/profile/${compSymbol}?apikey=${apiKey}`
  );
  let data = await response.json();  
  console.log(data);
}

getCompanyProfile();
