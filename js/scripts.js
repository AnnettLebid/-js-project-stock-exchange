(() => {
  const stockData = {};
  getElements();

  function getElements() {
    stockData.userInputElement = document.getElementById("input");
    stockData.spinner = document.getElementById("spinner");
    stockData.list = document.getElementById("list");
    stockData.apiKey = "ed93f3e229380c530b7a0e7663f86b99";
    stockData.button = document
      .getElementById("button")
      .addEventListener("click", () => {
        getCompany(getUserSearch());
      });
  }

  function clearResultsList() {
    document.getElementById("list").innerHTML = " ";
  }

  function getUserSearch() {
    const { userInputElement } = stockData;
    let userSearch = userInputElement.value;
    return userSearch;
  }

  async function getCompany(userSearch) {
    const { apiKey } = stockData;
    clearResultsList();
    toggleSpinner();
    let response = await fetch(
      `https://financialmodelingprep.com/api/v3/search?query=${userSearch}&limit=10&exchange=NASDAQ&apikey=${apiKey}`
    );
    let companyObjects = await response.json();
    // let symbol =
    console.log(companyObjects);
    toggleSpinner();
    createCompaniesList(companyObjects);
  }

  async function createCompaniesList(companyObjects) {
    const { apiKey } = stockData;
    const companiesProfiles = companyObjects.map(async (company) => {
      const response = await fetch(
        `https://financialmodelingprep.com/api/v3/company/profile/${company.symbol}?apikey=${apiKey}`
      );
      return response.json();
    });
    const companyProfile = await Promise.all(companiesProfiles);
    console.log(companyProfile);
  }

  //   let li = document.createElement("li");
  //   li.classList.add("list-group-item", "pl-0", "pr-0");
  //   let getresults = "";
  //   for (company of array) {
  //     getresults += `<a href = "./company.html?symbol=${company.symbol}" class = "list-group-item">${company.symbol}
  //     ${company.name}</a>`;
  //   }
  //   li.innerHTML = getresults;
  //   list.appendChild(li);

  // function createCompaniesList(array) {
  //   let li = document.createElement("li");
  //   li.classList.add("list-group-item", "pl-0", "pr-0");
  //   let getresults = "";
  //   for (company of array) {
  //     getresults += `<a href = "./company.html?symbol=${company.symbol}" class = "list-group-item">${company.symbol}
  //     ${company.name}</a>`;
  //   }
  //   li.innerHTML = getresults;
  //   list.appendChild(li);
  // }

  function toggleSpinner() {
    const { spinner } = stockData;
    spinner.classList.toggle("d-none");
  }
})();
