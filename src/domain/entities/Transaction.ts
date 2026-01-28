export class Transaction {
  private constructor(
    public readonly id: string,
    public readonly type: "SALE" | "EXPENSE",
    public readonly price: number,
    public readonly data: Date,
    public readonly productId?: string,
    public readonly amount?: number,
    public readonly category?: string,
  ) {}

  static sale(props: {
    id: string;
    productId: string;
    amount: number;
    sale: number;
  }) {
    return new Transaction(
      props.id,
      "SALE",
      props.sale,
      new Date(),
      props.productId,
      props.amount,
    );
  }

  static expense(props: { id: string; sale: number; category: string }) {
    return new Transaction(
      props.id,
      "EXPENSE",
      props.sale,
      new Date(),
      undefined,
      undefined,
      props.category,
    );
  }
}
