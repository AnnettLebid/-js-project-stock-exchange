class SearchForm {
  constructor(parentElement) {
    this.parentElement = parentElement;
    this.apiKey = "ed93f3e229380c530b7a0e7663f86b99";
    // this.spinner = document.getElementById("spinner");
    // this.list = document.getElementById("list");
    this.inputElement;
    this.button;
    this.formCreation();
    // this.callback;
  }

  formCreation() {
    const mainWrapper = document.createElement("div");
    mainWrapper.classList.add("row", "justify-content-center");
    const mainContainer = document.createElement("div");
    mainContainer.classList.add(
      "col-md-8",
      "col-md-offset-5",
      "shadow",
      "p-3",
      "bg-white",
      "rounded",
      "mt-3"
    );
    const inputWrapper = document.createElement("div");
    inputWrapper.classList.add(
      "input-group",
      "d-flex",
      "justify-content-between",
      "align-middle"
    );
    this.inputElement = document.createElement("input");
    this.inputElement.classList.add("custom-input", "m-1", "d-inline", "p-2");
    this.inputElement.type = "text";
    this.inputElement.placeholder = "Search";
    this.button = document.createElement("button");
    this.button.classList.add(
      "btn-primary",
      "btn",
      "button",
      "align-self-center"
    );
    this.button.innerHTML = "Search";
    mainWrapper.appendChild(mainContainer);
    mainContainer.appendChild(inputWrapper);
    inputWrapper.appendChild(this.inputElement);
    inputWrapper.appendChild(this.button);
    this.parentElement.appendChild(mainWrapper);
  }

  onSearch(callback) {
    // callback(this.companyObjects);
    console.log("Onsearch start");
    this.button.addEventListener("click", () => {
      this.getCompany(this.getUserSearch());
    });
  }

  getUserSearch() {
    let userSearch = this.inputElement.value;   
    return userSearch;
  }

  async getCompany(userSearch) {
    // this.toggleSpinner();
    let response = await fetch(
      `https://financialmodelingprep.com/api/v3/search?query=${userSearch}&limit=10&exchange=NASDAQ&apikey=${this.apiKey}`
    );
    let companyObjects = await response.json();    
    this.getDetailProfile(companyObjects);
    console.log(companyObjects);
    // return companyObjects;
    // this.toggleSpinner();
  }

  async getDetailProfile(companyObjects) {
    const companiesProfiles = companyObjects.map(async (company) => {
      const response = await fetch(
        `https://financialmodelingprep.com/api/v3/company/profile/${company.symbol}?apikey=${this.apiKey}`
      );
      return response.json();
    });
    const companiesDetailedProfiles = await Promise.all(companiesProfiles);
    console.log(companiesDetailedProfiles);
  }
}
