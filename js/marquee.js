(() => {
  const marqueeData = {};

  getElements();
  loadMarquee();
 
  function getElements() {
    marqueeData.marquee = document.getElementById("marquee");
    marqueeData.apiKey = "ed93f3e229380c530b7a0e7663f86b99";
  }

  async function getStockPriceData() {
    const { apiKey } = marqueeData;
    let response = await fetch(
      `https://financialmodelingprep.com/api/v3/quotes/nyse?apikey=${apiKey}`
    );
    let data = await response.json();    
    return data.slice(0, 200);
  }

  async function loadMarquee() {
    const pricesArray = await getStockPriceData();
    await pricesArray.map((company) => {
        createMarquee(company);
    })
  }

    function createMarquee(company) {
        const { marquee } = marqueeData;
      const marqueeContainer = document.createElement("div");
      marqueeContainer.classList.add("marquee-div", "p-1");

      const divSymbol = document.createElement("div");    
      divSymbol.textContent = `${company.symbol}: `;

      const divPrice = document.createElement("div");   
      divPrice.textContent = `${company.price}$ `;
      divPrice.classList.add("text-success")

      marqueeContainer.append(divSymbol, divPrice);
      marquee.appendChild(marqueeContainer);
    }
})();
