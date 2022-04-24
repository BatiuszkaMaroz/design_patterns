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

  // tax calculated inside getOrderTotal() method
  // Flaws:
  // - not reusable
  // - can overgrow, so that it mainly calculates tax instead of adding up prices
  getOrderTotal(): number {
    let total = 0;
    this.items.forEach((item) => {
      total += item.price;
    });

    switch (this.country) {
      case Country.PL:
        total += total * 0.2;
        break;

      case Country.US:
        total += total * 0.07;
        break;
    }

    return total;
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
