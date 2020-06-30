class CompanyInfo {
  constructor(parentElement, symbol) {
    this.parentElement = parentElement;
    this.symbol = symbol;
    this.apiKey = "ed93f3e229380c530b7a0e7663f86b99";
    this.companyNameDomElmt = document.getElementById("comp-name");
    this.changesDomElmt = document.getElementById("changes");
    this.chartSpinner = document.getElementById("chart-spinner");
    this.companyLogo = document.getElementById("logo");
    this.sectorElem = document.getElementById("sector-element");
    this.priceElem = document.getElementById("price");
    this.descriptionElem = document.getElementById("description");
    this.companies = {};
    this.companies.graph = {};
    this.companies.graph.xYears = [];
    this.companies.graph.yPrices = [];    
  }  

  load(){    
    this.getCompanyProfile();
    this.getComPriceHistory();
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
    console.log(data);
    let {
      companyName,
      sector,
      price,
      description,
      image,
      changesPercentage,
      website
    } = data.profile;

    this.companyLogo.src = image;
    this.companyLogo.classList.add("logo-width");
    this.companyNameDomElmt.textContent = companyName;
    this.companyNameDomElmt.setAttribute("href", `${website}`);
    this.sectorElem.innerHTML = sector;
    this.priceElem.textContent = price;
    this.changesDomElmt.textContent = changesPercentage;
    if (changesPercentage[1] === "+") {
      this.changesDomElmt.classList.add("text-success");
    }
    if (changesPercentage[1] === "-") {
      this.changesDomElmt.classList.add("text-danger");
    }
    this.descriptionElem.textContent = description;
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
    let ctx = document.getElementById("chart").getContext("2d");
    ctx.canvas.width = 800;
    ctx.canvas.height = 400;
    let chart = new Chart(ctx, {
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
}

