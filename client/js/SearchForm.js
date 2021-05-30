class SearchForm {
  constructor(parentElement) {
    this.parentElement = parentElement;    
    this.spinner = document.getElementById("spinner");
    this.inputElement;
    this.button;
    this.formCreation();
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
      "mt-3",
      "rounded-pill"
    );
    const inputWrapper = document.createElement("div");
    inputWrapper.classList.add(
      "input-group",
      "d-flex",
      "justify-content-between",
      "align-middle"
    );
    this.inputElement = document.createElement("input");
    this.inputElement.classList.add(
      "custom-input",
      "m-1",
      "d-inline",
      "p-2",
      "rounded-pill"
    );
    this.inputElement.type = "text";
    this.inputElement.placeholder = "Search";
    this.button = document.createElement("button");
    this.button.classList.add(
      "btn-primary",
      "btn",
      "button",
      "align-self-center",
      "rounded-pill",
      "mr-1"
    );
    this.button.innerHTML = "Search";
    mainWrapper.appendChild(mainContainer);
    mainContainer.appendChild(inputWrapper);
    inputWrapper.appendChild(this.inputElement);
    inputWrapper.appendChild(this.button);
    this.parentElement.appendChild(mainWrapper);
  }

  async onSearch(callback) {
    this.button.addEventListener("click", async () => {
      await this.fetchToInternalServer(this.getUserSearch(), callback);
    });
  }

  getUserSearch() {
    const userSearch = this.inputElement.value;
    return userSearch;
  }

  clearInput() {
    this.inputElement.value = "";
  }

  async fetchToInternalServer(userSearch, callback) {
    this.toggleSpinner();
    const response = await fetch(
      // `http://localhost:3000/search?query=${userSearch}`
      `https://js-stock-exchange.herokuapp.com/search?query=${userSearch}`
    );
    const data = await response.json();
    callback(data, userSearch);
    this.toggleSpinner();
    this.clearInput();
  }

  clearResults() {
    this.parentElement.innerText = "";
  }

  toggleSpinner() {
    spinner.classList.toggle("d-none");
  }
}
