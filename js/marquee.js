(() => {
  const marqueeData = {};
  
  getElements();
  getStockPriceData();

  function getElements() {
    marqueeData.marquee = document.getElementById("maequee");
    marqueeData.apiKey = "ed93f3e229380c530b7a0e7663f86b99";
  }

  async function getStockPriceData() {
    const { apiKey } = marqueeData;
    let response = await fetch(
      `https://financialmodelingprep.com/api/v3/quotes/nyse?apikey=${apiKey}`
    );
    let data = await response.json();     
    return data.slice(0,200);
  }

  const stockPriceArray = getStockPriceData();
  



})();
