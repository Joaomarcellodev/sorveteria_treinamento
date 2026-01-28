export class Product {
  private constructor(
    public readonly id: string,
    public name: string,
    public type: "SIMPLE" | "COVERGE" | "CREAMY",
    public priceSale: number,
    public amountStock: number,
    public amountMin: number = 50,
  ) {}

  reduceStock(amount: number) {
    if (amount <= 0) throw new Error("Amount invalid");
    if (amount > this.amountStock) throw new Error("Stock insufficient");

    this.amountStock -= amount;
  }

  stockCurrent() {
    return this.amountStock;
  }

  stockLow() {
    return this.amountStock < this.amountMin;
  }

  changeName(name: string) {
    if (!name || name.trim().length < 3) {
      throw new Error("Invalid product name");
    }
    this.name = name;
  }

  changeType(type: "SIMPLE" | "COVERGE" | "CREAMY") {
    this.type = type;
  }

  changeMinimumStock(amount: number) {
    if (amount < 0) throw new Error("Invalid minimum stock");
    this.amountMin = amount;
  }

  changePriceSale(price: number) {
    if (price <= 0) {
      throw new Error("Price must be greater than zero");
    }
    this.priceSale = price;
  }

  snapshot() {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      priceSale: this.priceSale,
      amountStock: this.amountStock,
      amountMin: this.amountMin,
    };
  }

  static fromPersistence(props: {
    id: string;
    name: string;
    type: "SIMPLE" | "COVERGE" | "CREAMY";
    priceSale: number;
    amountStock: number;
    amountMin: number;
   
  }) {
    return new Product(
      props.id,
      props.name,
      props.type,
      props.priceSale,
      props.amountStock,
      props.amountMin,
    )
  }
  
}
