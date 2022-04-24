export {};

enum Country {
  PL = 'PL',
  US = 'US',
}

class Item {
  name: string;
  price: number;
  quantity: number;

  constructor(name: string, price: number, quantity: number) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }
}

class Order {
  country: Country;
  items: Item[] = [];

  constructor(country: Country) {
    this.country = country;
  }

  addItem(item: Item): void {
    this.items.push(item);
  }

  // method-level hermetization
  // reasons:
  // - tax calculation stakes can change
  // - tax calculation logic can grow
  // - tax calculation can be reused elsewhere
  // - getOrderTotal() is not responsible for calculating tax
  getOrderTotal(): number {
    let total = 0;
    this.items.forEach((item) => {
      total += item.price;
    });

    total += total * this.getTaxRate();
    return total;
  }

  getTaxRate() {
    switch (this.country) {
      case Country.PL:
        return 0.2;

      case Country.US:
        return 0.07;
    }
  }
}

function main() {
  const o1: Order = new Order(Country.PL);
  o1.addItem(new Item('Light ball', 14, 5));
  o1.addItem(new Item('Waterpool', 1500, 1));
  o1.addItem(new Item('Life jacket', 39, 4));
  console.log(o1.getOrderTotal());

  o1.country = Country.US;
  console.log(o1.getOrderTotal());
}

main();
