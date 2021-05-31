class SearchResult {
  constructor(parentElement) {
    this.parentElement = parentElement;    
    this.infoButton;
    this.compProfile;
  }

  renderResults(companies, userSearch) {   
    this.clearResults();
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

    let listOfCompanies = companies.forEach((compProfile) => {    
      const {        
        companyName,
        changesPercentage,
        price,
      } = compProfile.profile;
      if (price) {  
        let li = document.createElement("li");
        li.classList.add(
          "list-group-item",
          "rounded-pill",
          "mb-2",
          "pr-3",
          "d-flex",
          "align-items-center"
        );
        ul.appendChild(li);

        let a = document.createElement("a");
        a.classList.add(
          "list-group-item-action",
          "d-flex",
          "align-items-center"
        );
        a.setAttribute("href", `./company.html?symbol=${compProfile.symbol}`);
        li.appendChild(a);

        let companyImage = document.createElement("img");
        companyImage.classList.add("stock-image");
        const image = compProfile.profile.image;
        const noImagePic = "img/no-image-icon.png"
        companyImage.onerror = function(e) {
          companyImage.src = noImagePic;
        };       
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
        } else {
          return;
        }
        this.infoButton = document.createElement("a");
        this.infoButton.classList.add(
          "btn-info",
          "btn",
          "button",
          "btn-width",
          "rounded-pill",
          "ml-1"
        );
        this.infoButton.innerHTML = "Information";
        this.infoButton.classList.add("float-right");
        this.infoButton.setAttribute("href", `./company.html?symbol=${compProfile.symbol}`);
        li.appendChild(this.infoButton);       
      } else {
        return
      }
    });
    
  }

  clearResults = () => {
    this.parentElement.innerText = "";
  };

  highlightSearch(searchValue, string) {
    const regex = new RegExp(searchValue, "gi");
    if (string) {
      return string.replace(
        regex,
        (match) => `<span class = "yellow">${match}</span>`
      );
    }
  }
}
