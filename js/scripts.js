const userInputElement = document.getElementById("input");
const button = document.getElementById("button");
const spinner = document.getElementById("spinner");
let list = document.getElementById("list");
const apiKey = "ed93f3e229380c530b7a0e7663f86b99";

button.addEventListener("click", () => {
  getCompany();
});

function clearResult() {
  document.getElementById("list").innerHTML = " ";
}

async function getCompany() {
  clearResult();
  let userSearch = userInputElement.value;
  toggleSpinner();
  let response = await fetch(
    `https://financialmodelingprep.com/api/v3/search?query=${userSearch}&limit=10&exchange=NASDAQ&apikey=${apiKey}`
  );
  let data = await response.json();
  toggleSpinner();
  presentCompList(data);
}

function presentCompList(array) {
  let li = document.createElement("li");
  li.classList.add("list-group-item", "pl-0", "pr-0");
  let getresults = "";
  for (company of array) {
    getresults += `<a href = "./company.html?symbol=${company.symbol}" class = "list-group-item">${company.symbol} 
      ${company.name}</a>`;   
  }
  li.innerHTML = getresults;
  list.appendChild(li);
}

function toggleSpinner() {
  spinner.classList.toggle("d-none");
}
