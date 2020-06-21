const userInputElement = document.getElementById("input");
const button = document.getElementById("button");
let spinner = document.getElementById("spinner")
const apiKey = "e2d2b008fa8386faff19423eff47af86";

button.addEventListener("click", () => {  
  getCompany();
});

async function getCompany() {
  let userSearch = userInputElement.value;
  toggleSpinner();
  let response = await fetch(
    `https://financialmodelingprep.com/api/v3/search?query=${userSearch}&limit=10&exchange=NASDAQ&apikey=${apiKey}`
  );
  let data = await response.json();
  toggleSpinner();
  console.log(data);
  return data;
}

function presentCompList () {

}

function toggleSpinner () {
    spinner.classList.toggle("d-none");
}
