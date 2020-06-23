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
    // console.log(companyObjects);
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
    const companiesDetailedProfiles = await Promise.all(companiesProfiles);
    console.log(companiesDetailedProfiles);    
    let listOfCompanies = companiesDetailedProfiles.map((compProfile) => {
      let {
        image,
        companyName,              
        changesPercentage,
      } = compProfile.profile;      

      let a = document.createElement("a");
      document.getElementById("list").appendChild(a);
      a.classList.add("list-group-item");
      a.setAttribute("href", `./company.html?symbol=${compProfile.symbol}`);      

      let companyImage = document.createElement("img");
      companyImage.classList.add("stock-image");
      companyImage.src = image;
      a.appendChild(companyImage);

      let compName = document.createElement("span");
      compName.classList.add("ml-1");
      compName.textContent = companyName;
      a.appendChild(compName);

      const compSymbol = document.createElement("span");
      compSymbol.classList.add("ml-2");
      compSymbol.textContent =  `(${compProfile.symbol})`;
      a.appendChild(compSymbol);

      let compChangesPercentage = document.createElement("span");
      let number = changesPercentage.slice(1, -1);
      compChangesPercentage.textContent = "(" + number + ")";
      if (number[0] === "+") {
        compChangesPercentage.classList.add("ml-2", "text-success");
      } else if (number[0] === "-") {
        compChangesPercentage.classList.add("ml-2", "text-danger");
      } else {
        compChangesPercentage.classList.add("ml-2", "text-body");
      }
      a.appendChild(compChangesPercentage);
    });
  }
  function toggleSpinner() {
    const { spinner } = stockData;
    spinner.classList.toggle("d-none");
  }
})();