const Basket = require("../src/Basket.js");

describe("Basket", () => {
  let basket;

  beforeEach(() => {
    basket = new Basket();
  });

  it("Add single or multiple bagels to basket", () => {
    //setup
    const expectedOne = [
      {
        sku: "BGLO",
        price: 0.49,
        name: "Bagel",
        variant: "Onion",
      },
    ];
    const expectedTwo = [
      {
        sku: "BGLO",
        price: 0.49,
        name: "Bagel",
        variant: "Onion",
      },
      {
        sku: "BGLP",
        price: 0.39,
        name: "Bagel",
        variant: "Plain",
      },
    ];
    //execute
    basket.addToBasket("BGLO"); // Sends the SKU
    const resultOneBagel = basket.getBasket(expectedOne);
    basket.addToBasket("BGLP");
    const resultTwoBagels = basket.getBasket(expectedTwo);
    //verify
    expect(resultOneBagel).toEqual(expectedOne);
    expect(resultTwoBagels).toEqual(expectedTwo);
  });

  it("Remove a bagel", () => {
    //setup
    const expected = {
      success: true,
      data: {
        sku: "BGLB",
        price: 0.49,
        name: "Bagel",
        variant: "Blueberry",
      },
    };
    //execute
    basket.addToBasket("BGLB");
    basket.removeFromBasket("BGLB");
    const result = basket.getBasket();
    //verify
    expect(result).toEqual(expected);
  });

  it("Adding item to full basket isn't added, returns null", () => {
    //setup
    basket.modifyBasketSize(2);
    const expectedBasket = [
      {
        sku: "BGLO",
        price: 0.49,
        name: "Bagel",
        variant: "Onion",
      },
      {
        sku: "BGLB",
        price: 0.49,
        name: "Bagel",
        variant: "Blueberry",
      },
    ];
    //execute
    basket.addToBasket("BGLO");
    basket.addToBasket("BGLB");
    const result = basket.addToBasket("BGLA");
    const basket = getBasket();
    //verify
    expect(result).toEqual(null);
    expect(basket).toEqual(expectedBasket);
  });

  it("Adding two of the same bagel to basket", () => {
    //setup
    const expected = [
      {
        sku: "BGLB",
        price: 0.49,
        name: "Bagel",
        variant: "Blueberry",
      },
      {
        sku: "BGLB",
        price: 0.49,
        name: "Bagel",
        variant: "Blueberry",
      },
    ];
    //execute
    basket.addToBasket("BGLB");
    basket.addToBasket("BGLB");
    const result = basket.getBasket();
    //verify
    expect(result).toEqual(expected);
  });
  it("Remove a bagel that doesn't exist returns an error.", () => {
    //setup
    basket.addToBasket("Plain");
    //execute
    const result = basket.removeBagelFromBasket("sdfsdf");
    //verify
    expect(result).toEqual("This Bagel doesn't exist");
  });
  it("Manager increasing the size of basket", () => {
    //setup
    const expected = [
      {
        sku: "BGLP",
        price: 0.39,
        name: "Bagel",
        variant: "Plain",
      },
      {
        sku: "BGLB",
        price: 0.49,
        name: "Bagel",
        variant: "Blueberry",
      },
      {
        sku: "BGLS",
        price: 0.49,
        name: "Bagel",
        variant: "Sesame",
      },
      {
        sku: "BGLA",
        price: 0.99,
        name: "Bagel",
        variant: "Asiago",
      },
      {
        sku: "BGLG",
        price: 0.99,
        name: "Bagel",
        variant: "Garlic",
      },
      {
        sku: "BGLW",
        price: 0.99,
        name: "Bagel",
        variant: "Whole Wheat",
      },
    ];
    basket.basketSize = 6;
    basket.addToBasket("Plain");
    basket.addToBasket("Blueberry");
    basket.addToBasket("Sesame");
    basket.addToBasket("Asiago");
    basket.addToBasket("Garlic");
    basket.addToBasket("Whole Wheat");
    //execute
    const result = basket.getBasket();
    //verify
    expect(result).toEqual(expected);
  });
  it("Getting the price of one Bagel in my basket.", () => {
    //setup
    const expected = 0.99;
    basket.addToBasket("Asiago");
    //execute
    const result = basket.getTotalOfBasket();
    //verify
    expect(result).toEqual(expected);
  });
  it("Getting the price of multiple Bagels in my basket.", () => {
    //setup
    const expected = 0.39 + 0.49 + 0.49;
    basket.addToBasket("Plain");
    basket.addToBasket("Blueberry");
    basket.addToBasket("Sesame");
    basket.addToBasket("Asiago");
    basket.removeBagelFromBasket("Asiago");
    //execute
    const result = basket.getTotalOfBasket();
    //verify
    expect(result).toEqual(expected);
  });
  it("Checking the price of a Bagel before adding it to my basket.", () => {
    //setup
    const expected = {
      sku: "BGLO",
      price: 0.49,
      name: "Bagel",
      variant: "Onion",
    };
    //execute
    const result = basket.getBagelPrice("Onion");
    //verify
    expect(result).toEqual(expected);
  });
  it("Special Offer: 6 Onion Bagels should be £2.49", () => {
    //setup
    const expected = 2.49;
    basket.basketSize = 6;
    basket.addToBasket("Onion");
    basket.addToBasket("Onion");
    basket.addToBasket("Onion");
    basket.addToBasket("Onion");
    basket.addToBasket("Onion");
    basket.addToBasket("Onion");
    //execute
    const result = basket.getTotalOfBasket();
    //verify
    expect(result).toEqual(expected);
  });
  it("Special Offer: 6 Everything Bagels should be £2.49", () => {
    //setup
    const expected = 2.49;
    basket.basketSize = 6;
    basket.addToBasket("Everything");
    basket.addToBasket("Everything");
    basket.addToBasket("Everything");
    basket.addToBasket("Everything");
    basket.addToBasket("Everything");
    basket.addToBasket("Everything");
    //execute
    const result = basket.getTotalOfBasket();
    //verify
    expect(result).toEqual(expected);
  });
  it("Special Offer: 12 Plain Bagels should be £3.99", () => {
    //setup
    const expected = 3.99;
    basket.basketSize = 12;
    basket.addToBasket("Plain");
    basket.addToBasket("Plain");
    basket.addToBasket("Plain");
    basket.addToBasket("Plain");
    basket.addToBasket("Plain");
    basket.addToBasket("Plain");
    basket.addToBasket("Plain");
    basket.addToBasket("Plain");
    basket.addToBasket("Plain");
    basket.addToBasket("Plain");
    basket.addToBasket("Plain");
    basket.addToBasket("Plain");
    //execute
    const result = basket.getTotalOfBasket();
    //verify
    expect(result).toEqual(expected);
  });
  it("Special Offer (WET CODE TO CHECK MUTLIPLE DISCOUNTS): 24 plain bagels (7.98) + 12 Onion Bagels (4.98) + 12 Everything Bagels (4.98)", () => {
    //setup
    const expected = 7.98 + 4.98 + 4.98;
    basket.basketSize = 48;
    basket.addBagelToBasket("Plain");
    basket.addBagelToBasket("Plain");
    basket.addBagelToBasket("Plain");
    basket.addBagelToBasket("Plain");
    basket.addBagelToBasket("Plain");
    basket.addBagelToBasket("Plain");
    basket.addBagelToBasket("Plain");
    basket.addBagelToBasket("Plain");
    basket.addBagelToBasket("Plain");
    basket.addBagelToBasket("Plain");
    basket.addBagelToBasket("Plain");
    basket.addBagelToBasket("Plain");
    basket.addBagelToBasket("Plain");
    basket.addBagelToBasket("Plain");
    basket.addBagelToBasket("Plain");
    basket.addBagelToBasket("Plain");
    basket.addBagelToBasket("Plain");
    basket.addBagelToBasket("Plain");
    basket.addBagelToBasket("Plain");
    basket.addBagelToBasket("Plain");
    basket.addBagelToBasket("Plain");
    basket.addBagelToBasket("Plain");
    basket.addBagelToBasket("Plain");
    basket.addBagelToBasket("Plain");
    basket.addBagelToBasket("Onion");
    basket.addBagelToBasket("Onion");
    basket.addBagelToBasket("Onion");
    basket.addBagelToBasket("Onion");
    basket.addBagelToBasket("Onion");
    basket.addBagelToBasket("Onion");
    basket.addBagelToBasket("Onion");
    basket.addBagelToBasket("Onion");
    basket.addBagelToBasket("Onion");
    basket.addBagelToBasket("Onion");
    basket.addBagelToBasket("Onion");
    basket.addBagelToBasket("Onion");
    basket.addBagelToBasket("Everything");
    basket.addBagelToBasket("Everything");
    basket.addBagelToBasket("Everything");
    basket.addBagelToBasket("Everything");
    basket.addBagelToBasket("Everything");
    basket.addBagelToBasket("Everything");
    basket.addBagelToBasket("Everything");
    basket.addBagelToBasket("Everything");
    basket.addBagelToBasket("Everything");
    basket.addBagelToBasket("Everything");
    basket.addBagelToBasket("Everything");
    basket.addBagelToBasket("Everything");
    //execute
    const result = basket.getTotalOfBasket();
    //verify
    expect(result).toEqual(expected);
  });
});
