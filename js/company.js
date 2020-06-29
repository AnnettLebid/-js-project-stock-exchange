(() => {
  const variablesStore = {};
  let companies = {};
  companies.graph = {};
  companies.graph.xYears = [];
  companies.graph.yPrices = [];

  getStoredElements();
  getCompanyProfile();
  getComPriceHistory();

  function getStoredElements() {
    variablesStore.apiKey = "ed93f3e229380c530b7a0e7663f86b99";
    variablesStore.searchCompSymbol = new URLSearchParams(
      window.location.search
    ).get("symbol");
    variablesStore.companyNameDomElmt = document.getElementById("comp-name");
    variablesStore.changesDomElmt = document.getElementById("changes");
    variablesStore.chartSpinner = document.getElementById("chart-spinner");
    variablesStore.companyLogo = document.getElementById("logo");
  }

  async function getCompanyProfile() {
    const { searchCompSymbol, apiKey } = variablesStore;
    let response = await fetch(
      `https://financialmodelingprep.com/api/v3/company/profile/${searchCompSymbol}?apikey=${apiKey}`
    );
    let data = await response.json();
    makeCompProfile(data);
    return data;
  }

  function makeCompProfile(data) {
    const { companyNameDomElmt, changesDomElmt, companyLogo } = variablesStore;
    let {
      companyName,
      sector,
      price,
      description,
      image,
      changesPercentage,
      website
    } = data.profile;

    companyLogo.src = image;
    companyLogo.classList.add("logo-width");
    companyNameDomElmt.textContent = companyName;
    companyNameDomElmt.setAttribute("href", `${website}`);
    document.getElementById("sector").textContent = sector;
    document.getElementById("price").textContent = price;
    changesDomElmt.textContent = changesPercentage;
    if (changesPercentage[1] === "+") {
      changesDomElmt.classList.add("text-success");
    }
    if (changesPercentage[1] === "-") {
      changesDomElmt.classList.add("text-danger");
    }
    document.getElementById("description").textContent = description;
  }

  async function getComPriceHistory() {
    const { searchCompSymbol, apiKey } = variablesStore;
    turnSpinnerOn();
    let response = await fetch(
      `https://financialmodelingprep.com/api/v3/historical-price-full/${searchCompSymbol}?serietype=line&apikey=${apiKey}`
    );
    let data = await response.json();
    let priceHistory = data.historical;
    for (let i = 0; i < priceHistory.length; i += 100) {
      companies.graph.xYears.unshift(priceHistory[i].date);
      companies.graph.yPrices.unshift(priceHistory[i].close);
    }
    let xYears = companies.graph.xYears;
    let yPrices = companies.graph.yPrices;
    await makeCompChart(xYears, yPrices);
  }

  function turnSpinnerOn() {
    const { chartSpinner } = variablesStore;
    chartSpinner.classList.remove("d-none");
  }

  function turnSpinnerOff() {
    const { chartSpinner } = variablesStore;
    chartSpinner.classList.add("d-none");
  }

  async function makeCompChart(years, price) {
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
    turnSpinnerOff();
  }
})();
