import { Transaction } from "../entities/Transaction";

export interface TransactionRepository {
  searchId(id: string): Promise<Transaction | null>;
  save(product: Transaction): Promise<void>;
}
