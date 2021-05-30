class CompanyInfo {
  constructor(parentElement, symbol) {  
    this.parentElement = parentElement;
    this.symbol = symbol;
    this.cardCreation();
    this.spinnerCreation();     
    this.companies = {};
    this.companies.graph = {};
    this.companies.graph.xYears = [];
    this.companies.graph.yPrices = [];
    this.row;
  }

  cardCreation() {
    this.row = document.createElement("div");
    this.row.classList.add("row", "justify-content-center");
    this.parentElement.appendChild(this.row);
    this.columns = document.createElement("div");
    this.columns.classList.add("col-md-10");
    this.row.appendChild(this.columns);
    this.card = document.createElement("div");
    this.card.classList.add(
      "card", "mt-5", "mb-3", "mt-sm-0", "shadow"
    );
    this.columns.appendChild(this.card);
    this.cardHeader = document.createElement("div");
    this.cardHeader.classList.add(
      "card-header",
      "d-flex",
      "justify-content-between",
      "align-items-center",
      "bg-white"
    ); 
    this.logoWrapper = document.createElement("div");
    this.logoWrapper.classList.add("align-middle");
    this.logoImage = document.createElement("img");
    this.logoImage.classList.add("logo", "pl-1", "logo-width");
    this.logoImage.id = "logo";
    this.logoImage.src = "";
    this.logoWrapper.appendChild(this.logoImage);
    this.nameWrapper = document.createElement("div");
    this.nameSpan = document.createElement("span");
    this.nameSpan.classList.add(
      "text-primary",
      "pl-1",
      "pr-1",
      "line-ht",
      "text-height-22"
    );
    this.aTag = document.createElement("a");
    this.aTag.id = "comp-name";
    this.nameSpan.appendChild(this.aTag);
    this.sectorSpan = document.createElement("span");
    this.sectorSpan.classList.add(
      "text-primary",
      "pl-1",
      "pr-1",
      "line-ht",
      "text-height-22",
      "ml-2"
    );
    this.nameWrapper.append(this.nameSpan, this.sectorSpan);
    this.cardHeader.append(this.logoWrapper, this.nameWrapper);
    this.cardBody = document.createElement("div");
    this.cardBody.classList.add("card-body")
    this.stockPriceWrapper = document.createElement("div");
    this.stockPriceWrapper.classList.add("text-height-20", "mb-3", "text-height-20");
    this.stockPriceWrapper.innerText = "Stock price: $";
    this.price = document.createElement("span");
    this.price.id = "price";
    this.price.classList.add("mr-1");
    this.changes = document.createElement("span");
    this.changes.id = "changes";
    this.stockPriceWrapper.append(this.price, this.changes);
    this.description = document.createElement("div");
    this.description.classList.add("mb-3");
    this.description.id = "description";
    this.cardBody.append(this.stockPriceWrapper, this.description);
    this.canvas = document.createElement("canvas");
    this.card.append(this.cardHeader, this.cardBody, this.canvas);
  }

  spinnerCreation() {    
    this.chartSpinner = document.createElement("div");
    this.chartSpinner.classList.add(
      "custom-spinner",
      "d-none",
      "chart-spinner",
      "align-self-center"
    );
    this.chartSpinner.id = "chart-spinner";
    this.spinnerDiv = document.createElement("div");
    this.spinnerDiv.classList.add("spinner-border", "text-primary");
    this.chartSpinner.appendChild(this.spinnerDiv);
    this.row.appendChild(this.chartSpinner);
  }

  async fetchCompProfileToServer() {     
    const response = await fetch(
      `https://js-stock-exchange.herokuapp.com/company-profile/?query=${this.symbol}`
      // `http://localhost:3000/company-profile/?query=${this.symbol}`          
    );
    const companyData = await response.json();
    return companyData;   
  }

  async getCompanyProfile() {
    const companyProfile = await this.fetchCompProfileToServer();
    this.makeCompProfile(companyProfile);
  }

  makeCompProfile(data) {
    const {
      companyName,
      sector,
      price,
      description,
      image,
      changesPercentage,
      website,
    } = data.profile;

    this.logoImage.src = image;    
    this.nameSpan.textContent = companyName;
    this.aTag.setAttribute("href", `${website}`);
    this.sectorSpan.innerHTML = sector;
    this.price.textContent = price;
    this.changes.textContent = changesPercentage;
    if (changesPercentage[1] === "+") {
      this.changes.classList.add("text-success");
    }
    if (changesPercentage[1] === "-") {
      this.changes.classList.add("text-danger");
    }
    this.description.textContent = description;
  }

  async fetchPriceHistoryToServer() {     
    const response = await fetch(
      `https://js-stock-exchange.herokuapp.com/historical-price-full/?query=${this.symbol}`
      // `http://localhost:3000/historical-price-full/?query=${this.symbol}`          
    );
    const companyPriceHistory = await response.json();      
    return companyPriceHistory;   
  }

  async getComPriceHistory() {
    this.turnSpinnerOn();
    const priceData = await this.fetchPriceHistoryToServer();    

    for (let i = 0; i < priceData.length; i += 100) {
      this.companies.graph.xYears.unshift(priceData[i].date);
      this.companies.graph.yPrices.unshift(priceData[i].close);
    }
    const xYears = this.companies.graph.xYears;
    const yPrices = this.companies.graph.yPrices;
    await this.addChart(xYears, yPrices);
  }

  turnSpinnerOn() {
    this.chartSpinner.classList.remove("d-none");
  }

  turnSpinnerOff() {
    this.chartSpinner.classList.add("d-none");
  }

  async addChart(years, price) {
    this.canvas.getContext("2d");
    this.canvas.width = 800;
    this.canvas.height = 400;
    const chart = new Chart(this.canvas, {
      type: "line",
      data: {
        labels: years,
        datasets: [
          {
            label: "Stock Price History",
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgb(255, 99, 132)",
            data: price,
          },
        ],
      },
      options: {
        responsive: true,
      },
    });
    this.turnSpinnerOff();
  }

  load() {
    this.getCompanyProfile();
    this.getComPriceHistory();
  }
}
