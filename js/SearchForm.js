class SearchForm {
  constructor(parentElement) {
    this.parentElement = parentElement;
    this.apiKey = "ed93f3e229380c530b7a0e7663f86b99";
  }

  formCreation() {
    const wrapper = document.createElement("div");
    wrapper.classList.add("row", "justify-content-center");
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
    const inputElement = document.createElement("input");
    inputElement.classList.add("form-control");
    inputElement.type = "text";
    const buttonWrapper = document.createElement("div");
    buttonWrapper.classList.add("input-group-append");
    const button = document.createElement("button");
    button.classList.add("buttonSearch", "btn", "btn-outline-secondary");
    button.innerHTML = "Search";
    buttonWrapper.appendChild(button);
    inputWrapper.appendChild(inputElement);
    inputWrapper.appendChild(buttonDiv);
    this.parentElement.appendChild(row);
  }
}
