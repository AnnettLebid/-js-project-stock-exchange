class SearchResult {
  constructor(parentElement) {    
    this.parentElement = parentElement;
    this.apiKey = "ed93f3e229380c530b7a0e7663f86b99";
  }

  async createCompaniesList(companyObjects) {
    console.log("I am in create companies list");   
    let listOfCompanies = companiesDetailedProfiles.map((compProfile) => {
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
      compSymbol.textContent = `(${compProfile.symbol})`;
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
}
