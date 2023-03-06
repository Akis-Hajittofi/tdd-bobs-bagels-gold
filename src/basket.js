const inventory = require("./inventory.js");

class Basket {
  constructor(basket = [], basketSize = 4) {
    this.basket = basket;
    this.basketSize = basketSize; // Not clear if this is for capacity or not / I think it's pretty clear. The size of the basket is the amount of thing that can fit, no?
  }

  // Change to forEach and put more suitable parameter name
  addToBasket(bagelSku) {
    //if basket full, no need to do anything. Sending back null
    if (this.basket.length >= this.basketSize) return null;

    let i = 0;
    let bagel;
    //finding the bagel type from the inventory
    inventory.forEach((element) => {
      if (element["sku"] === bagelSku) {
        bagel = element;
        this.basket.push(bagel);
        return;
      }
    });
  }

  removeFromBasket(bagelSku) {
    // Use a .filter instead?
    for (let i = 0; i < this.basket.length; i++) {
      const bagelToRemove = this.basket[i];
      if (bagelToRemove["variant"] == type) {
        this.basket.splice(i, 1);
        return;
      }
    }
    // Return an object with a succes value and the item that was removed
    return "This Bagel doesn't exist";
  }

  getTotalOfBasket() {
    let count = 0;
    for (let i = 0; i < this.basket.length; i++) {
      const bagelPrice = this.basket[i]["price"];
      count = count + bagelPrice;
    }
    count = count - this.getDiscount();

    return Number(count.toFixed(2));
  }

  getDiscount() {
    let discount = 0;
    // Change all of this into a single function
    const discountOnionArray = this.basket.filter(
      (variant) => variant["variant"] === "Onion"
    );
    const everythingBagelArray = this.basket.filter(
      (variant) => variant["variant"] === "Everything"
    );
    const plainBagelArray = this.basket.filter(
      (variant) => variant["variant"] === "Plain"
    );

    // Change all of this into a single function
    const discMultiplierOne = Math.trunc(discountOnionArray.length / 6);
    const discMultiplierTwo = Math.trunc(everythingBagelArray.length / 6);
    const discMultiplierThree = Math.trunc(plainBagelArray.length / 12);

    // Change all of this into a single function
    if (discountOnionArray.length >= 6) {
      discount = discount + discMultiplierOne * 0.45;
    }
    if (everythingBagelArray.length >= 6) {
      discount = discount + discMultiplierTwo * 0.45;
    }
    if (plainBagelArray.length >= 12) {
      discount = discount + discMultiplierThree * 0.69;
    }
    return discount;
  }

  getBagelPrice(type) {
    for (let i = 0; i < inventory.length; i++) {
      const bagel = inventory[i];
      if (bagel["variant"] === type) {
        return inventory[i];
      }
    }
  }
  getBasket() {
    return this.basket;
  }
}

module.exports = Basket;
