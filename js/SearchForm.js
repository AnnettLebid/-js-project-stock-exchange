class SearchForm {
  constructor(parentElement) {
    this.parentElement = parentElement;
    this.apiKey = "ed93f3e229380c530b7a0e7663f86b99";
    this.spinner = document.getElementById("spinner");
    this.list = document.getElementById("list");
    this.button;
    this.inputElement;
    this.formCreation();
  }

  formCreation() {
    console.log("Form creation start");
    const mainWrapper = document.createElement("div");
    mainWrapper.classList.add("row", "justify-content-center");
    const mainDiv = document.createElement("div");
    mainDiv.classList.add(
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
    mainWrapper.appendChild(mainDiv);
    mainDiv.appendChild(inputWrapper);
    inputWrapper.appendChild(this.inputElement);
    inputWrapper.appendChild(this.button);
    this.parentElement.appendChild(mainWrapper);
    console.log("Form creation end");
  }

  onSearch() {
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
    this.toggleSpinner();
    let response = await fetch(
      `https://financialmodelingprep.com/api/v3/search?query=${userSearch}&limit=10&exchange=NASDAQ&apikey=${this.apiKey}`
    );
    let companyObjects = await response.json();
    console.log(companyObjects);
    return companyObjects;
    this.toggleSpinner();
    
  }
}
