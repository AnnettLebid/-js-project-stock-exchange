class Marquee {
  constructor(parentElement) {
    this.parentElement = parentElement;
    this.apiKey = "ed93f3e229380c530b7a0e7663f86b99";
  }

  async loadMarquee() {
    const pricesArray = await this.getStockPriceData();
    await pricesArray.map((company) => {
      this.createMarquee(company);
    });
  }

  async getStockPriceData() {
    let response = await fetch(
      `https://financialmodelingprep.com/api/v3/quotes/nyse?apikey=${this.apiKey}`
    );
    let data = await response.json();
    return data.slice(0, 200);
  }

  createMarquee(company) {
    if (company.price) {
      const marqueeContainer = document.createElement("div");
      marqueeContainer.classList.add("marquee-div", "p-1");

      const divSymbol = document.createElement("div");
      divSymbol.textContent = `${company.symbol}: `;

      const divPrice = document.createElement("div");
      divPrice.textContent = `${company.price}$ `;
      divPrice.classList.add("neon-green", "ml-1");

      marqueeContainer.append(divSymbol, divPrice);
      this.parentElement.appendChild(marqueeContainer);
    }
  }
}
