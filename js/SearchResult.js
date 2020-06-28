class SearchResult {
  constructor(parentElement) {
    this.parentElement = parentElement;
    this.apiKey = "ed93f3e229380c530b7a0e7663f86b99";
  }

  renderResults(companies, userSearch) {
    this.clearResults();
    console.log(companies);
    console.log(userSearch);
    const resultsWrapper = document.createElement("div");
    resultsWrapper.classList.add("row", "justify-content-center");
    this.parentElement.appendChild(resultsWrapper);

    const resultsContainer = document.createElement("div");
    resultsContainer.classList.add(
      "col-md-8",
      "col-md-offset-5",
      "shadow",
      "bg-transparent",
      "pr-0",
      "pl-0",
      "rounded",
      "mt-3"
    );
    resultsWrapper.appendChild(resultsContainer);

    let ul = document.createElement("ul");
    ul.classList.add("p-0", "m-0");
    resultsContainer.appendChild(ul);

    let listOfCompanies = companies.map((compProfile) => {
      const { image, companyName, changesPercentage } = compProfile.profile;

      let li = document.createElement("li");
      li.classList.add("list-group-item", "rounded-pill", "mb-2");
      ul.appendChild(li);

      let a = document.createElement("a");
      a.classList.add("list-group-item-action");
      a.setAttribute("href", `./company.html?symbol=${compProfile.symbol}`);
      li.appendChild(a);

      let companyImage = document.createElement("img");
      companyImage.classList.add("stock-image");
      companyImage.src = image;
      a.appendChild(companyImage);

      let compName = document.createElement("span");
      compName.classList.add("ml-1");
      compName.innerHTML = this.highlightSearch(userSearch, companyName);
      a.appendChild(compName);

      const compSymbol = document.createElement("span");
      compSymbol.classList.add("ml-2");  
      compSymbol.innerHTML = this.highlightSearch(
        userSearch,
        `(${compProfile.symbol})`
      );

      a.appendChild(compSymbol);

      let compChangesPercentage = document.createElement("span");
      let number = changesPercentage;     
     
      if (number) {       
        compChangesPercentage.textContent = `${number}`;
        if (number[1] === "+") {
          compChangesPercentage.classList.add("ml-2", "text-success");
        } else if (number[1] === "-") {
          compChangesPercentage.classList.add("ml-2", "text-danger");
        } else {
          compChangesPercentage.classList.add("ml-2", "text-body");
        }
        a.appendChild(compChangesPercentage);
      }else{
        return;
      }
    });
  }

  clearResults = () => {
    this.parentElement.innerText = "";
  };

  highlightSearch(searchValue, string) {
    const regex = new RegExp(searchValue, "gi");
    if (string){
      return string.replace(
        regex,
        (match) => `<span class = "yellow">${match}</span>`
      );
    }
  }
}
