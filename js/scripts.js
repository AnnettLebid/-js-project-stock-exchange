const userInputElement = document.getElementById("input");
const button = document.getElementById("button");
const spinner = document.getElementById("spinner");
list = document.getElementById("list");
const apiKey = "e2d2b008fa8386faff19423eff47af86";

button.addEventListener("click", () => {
  getSearchResult();
});

function clearResult() {
  document.getElementById("list").innerHTML = " ";
}

async function getSearchResult() {
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
    getresults += `<a href class = "list-group-item">${company.symbol} 
      ${company.name}</a>`;
  }
  li.innerHTML = getresults;
  list.appendChild(li);
}

function toggleSpinner() {
  spinner.classList.toggle("d-none");
}
