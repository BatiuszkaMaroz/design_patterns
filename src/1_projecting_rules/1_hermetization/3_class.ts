export {};

enum Country {
  CHN = 'CHN',
  GB = 'GB',
  PL = 'PL',
  US = 'US',
}

enum State {
  NONE = 'NONE',
  NY = 'NY',
  WA = 'WA',
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

// class-level hermetization
// reasons:
// - reusability
// - some other class method overgrown
// - extracting this method separate class increase clarity
class TaxCalculator {
  getTaxRate(country: Country, state: State, item: Item) {
    switch (country) {
      case Country.CHN:
        return this.getCHNTax(item);

      case Country.US:
        return this.getUSTax(state);

      default:
        return this.getEUTax(country);
    }
  }

  private getCHNTax(item: Item) {
    if (item.price <= 100) {
      return 0.1;
    } else {
      return 0.05;
    }
  }

  private getUSTax(state: State): number {
    switch (state) {
      case State.NY:
        return 0.15;

      case State.WA:
        return 0.1;

      default:
        return 0.05;
    }
  }

  private getEUTax(country: Country): number {
    switch (country) {
      case Country.GB:
        return 0.15;

      case Country.PL:
        return 0.2;

      default:
        return 0.1;
    }
  }
}

class Order {
  country: Country;
  state: State;
  items: Item[] = [];
  private taxCalculator: TaxCalculator = new TaxCalculator();

  constructor(country: Country, state: State) {
    this.country = country;
    this.state = state;
  }

  addItem(item: Item): void {
    this.items.push(item);
  }

  getOrderTotal(): number {
    let total = 0;
    this.items.forEach((item) => {
      let subtotal = item.price;
      subtotal +=
        subtotal *
        this.taxCalculator.getTaxRate(this.country, this.state, item);

      total += subtotal;
    });

    return total;
  }
}

function main() {
  const o1: Order = new Order(Country.PL, State.NONE);
  o1.addItem(new Item('Light ball', 14, 5));
  o1.addItem(new Item('Waterpool', 1500, 1));
  o1.addItem(new Item('Life jacket', 39, 4));
  console.log(o1.getOrderTotal());

  o1.country = Country.US;
  console.log(o1.getOrderTotal());
}

main();
