(() => {
  const companyData = {};
  let companies = {};
  companies.graph = {};
  companies.graph.xYears = [];
  companies.graph.yPrices = [];

  getStoredElements();
  getCompanyProfile();
  getComPriceHistory();
  

  function getStoredElements() {
    companyData.compSymbol = new URLSearchParams(window.location.search).get(
      "symbol"
    );
    companyData.apiKey = "ed93f3e229380c530b7a0e7663f86b99";
  }

  async function getCompanyProfile() {
    const { compSymbol, apiKey } = companyData;
    let response = await fetch(
      `https://financialmodelingprep.com/api/v3/profile/${compSymbol}?apikey=${apiKey}`
    );
    let data = await response.json();
    makeCompProfile(data);
    return data;
  }

  function makeCompProfile(data) {
    let {
      companyName,
      sector,
      price,
      description,
      image,
      changes,
      website,
    } = data[0];

    document.getElementById("logo").src = image;
    document.getElementById("comp-name").textContent = companyName;
    document.getElementById("comp-name").setAttribute("href", `${website}`);
    document.getElementById("sector").textContent = sector;
    document.getElementById("price").textContent = price;
    document.getElementById("changes").textContent = changes;
    document.getElementById("description").textContent = description;
  }

  async function getComPriceHistory() {
    const { compSymbol, apiKey } = companyData;
    let response = await fetch(
      `https://financialmodelingprep.com/api/v3/historical-price-full/${compSymbol}?serietype=line&apikey=${apiKey}`
    );
    let data = await response.json();
    let priceHistory = data.historical;
    for (let i = 0; i < priceHistory.length; i++) {
      companies.graph.xYears.unshift(priceHistory[i].date);
      companies.graph.yPrices.unshift(priceHistory[i].close);
    }
    let xYears = companies.graph.xYears;
    let yPrices = companies.graph.yPrices   
   
    await makeCompChart(xYears, yPrices);    
  }
  

  async function makeCompChart(years, price) {
    // await getComPriceHistory();
    let ctx = document.getElementById("myChart").getContext("2d");
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
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  }
})();
