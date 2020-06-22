let urlParams = new URLSearchParams(window.location.search);
let compSymbol = urlParams.get("symbol");
const apiKey = "ed93f3e229380c530b7a0e7663f86b99";

async function getCompanyProfile() {
  let response = await fetch(
    `https://financialmodelingprep.com/api/v3/profile/${compSymbol}?apikey=${apiKey}`
  );
  let data = await response.json();
  makeCompProfile(data);
  console.log(data);
  return data;
}

function makeCompProfile(data) {
  let {
    companyName,
    sector,
    price,
    description,
    image,
    changes,
    website,
  } = data[0];
  
  document.getElementById("logo").src = image;
  document.getElementById("comp-name").textContent = companyName;
  document.getElementById("comp-name").setAttribute("href", `${website}`);
  document.getElementById("sector").textContent = sector;
  document.getElementById("price").textContent = price;
  document.getElementById("changes").textContent = changes;
  document.getElementById("description").textContent = description;
}

// makeCompProfile();
getCompanyProfile();
