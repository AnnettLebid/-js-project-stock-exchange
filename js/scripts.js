const userInputElement = document.getElementById("input");
const button = document.getElementById("button");
let userSearch = userInputElement.value;
const apiKey = "e2d2b008fa8386faff19423eff47af86";

button.addEventListener("click", () => {  
  getCompany();
});

async function getCompany() {
  let userSearch = userInputElement.value;
  let response = await fetch(
    `https://financialmodelingprep.com/api/v3/search?query=${userSearch}&limit=10&exchange=NASDAQ&apikey=${apiKey}`
  );
  let data = await response.json();
  console.log(data);
  return data;
}
