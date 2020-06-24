class SearchForm {
  constructor(parentElement) {
    this.parentElement = parentElement;
    this.apiKey = "ed93f3e229380c530b7a0e7663f86b99";
  }

  formCreation() {
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
    const inputElement = document.createElement("input");
    inputElement.classList.add("custom-input", "m-1", "d-inline", "p-2");
    inputElement.type = "text";
    const button = document.createElement("button");
    button.classList.add("btn-primary", "btn", "button", "align-self-center");    
    button.innerHTML = "Search";
    mainWrapper.appendChild(mainDiv);
    mainDiv.appendChild(inputWrapper);
    inputWrapper.appendChild(inputElement);
    inputWrapper.appendChild(button);    
    this.parentElement.appendChild(wrapper);
  }
}


