class CompanyInfo {
  constructor(parentElement, symbol) {
    this.apiKey = "ed93f3e229380c530b7a0e7663f86b99";
    this.parentElement = parentElement;
    this.symbol = symbol;
    this.cardCreation();
    this.spinnerCreation();     
    this.companies = {};
    this.companies.graph = {};
    this.companies.graph.xYears = [];
    this.companies.graph.yPrices = [];
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
      // "d-none",
      "chart-spinner",
      "align-self-center"
    );
    this.chartSpinner.id = "chart-spinner";
    this.spinnerDiv = document.createElement("div");
    this.spinnerDiv.classList.add("spinner-border", "text-primary");
    this.chartSpinner.appendChild(this.spinnerDiv);
  }

  async getCompanyProfile() {
    let response = await fetch(
      `https://financialmodelingprep.com/api/v3/company/profile/${this.symbol}?apikey=${this.apiKey}`
    );
    let data = await response.json();
    this.makeCompProfile(data);
    return data;
  }

  makeCompProfile(data) {
    let {
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

  async getComPriceHistory() {
    this.turnSpinnerOn();
    let response = await fetch(
      `https://financialmodelingprep.com/api/v3/historical-price-full/${this.symbol}?serietype=line&apikey=${this.apiKey}`
    );
    let data = await response.json();
    let priceHistory = data.historical;
    for (let i = 0; i < priceHistory.length; i += 100) {
      this.companies.graph.xYears.unshift(priceHistory[i].date);
      this.companies.graph.yPrices.unshift(priceHistory[i].close);
    }
    let xYears = this.companies.graph.xYears;
    let yPrices = this.companies.graph.yPrices;
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
    let chart = new Chart(this.canvas, {
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
