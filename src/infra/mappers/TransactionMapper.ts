import { Transaction } from '../../domain/entities/Transaction'

export class TransactionMapper {
  static toDomain(raw: any): Transaction {
    return Transaction.fromPersistence({
      id: raw.id,
      type: raw.type,
      price: Number(raw.price),
      data: new Date(raw.data),
      productId: raw.productId ?? undefined,
      amount: raw.amount ?? undefined,
      category: raw.category ?? undefined,
    })
  }

  static toPersistence(transaction: Transaction) {
    return {
      id: transaction.id,
      type: transaction.type,
      price: transaction.price,
      data: transaction.data,
      productId: transaction.productId ?? null,
      amount: transaction.amount ?? null,
      category: transaction.category ?? null,
    }
  }
}
