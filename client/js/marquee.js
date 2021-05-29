class Marquee {
  constructor(parentElement) {
    this.parentElement = parentElement;    
  }

  async loadMarquee() {
    const pricesArray = await this.fetchMarqueeToInternalServer();    
    await pricesArray.map((company) => {
      this.createMarquee(company);
    }); 
  }

  async fetchMarqueeToInternalServer() {    
    const response = await fetch(
      `http://localhost:3000/stock-price`      
    );
    const data = await response.json(); 
    return data;   
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
