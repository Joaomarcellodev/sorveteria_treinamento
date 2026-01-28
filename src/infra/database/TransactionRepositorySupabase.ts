import { supabase } from "./SupabaseClient";
import { Transaction } from "../../domain/entities/Transaction";
import { TransactionRepository } from "../../domain/repositories/TransactionRepository";
import { TransactionMapper } from "../mappers/TransactionMapper";

export class TransactionRepositorySupabase implements TransactionRepository {
  async searchId(id: string): Promise<Transaction | null> {
    const { data, error } = await supabase
      .from("transacoes")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) return null;

    return TransactionMapper.toDomain(data)
  }

  async save(transaction: Transaction): Promise<void> {
    const { error } = await supabase.from("transacoes").insert({
      id: transaction.id,
      type: transaction.type,
      price: transaction.price,
      data: transaction.data,
      productId: transaction.productId,
      amount: transaction.amount,
      category: transaction.category,
    });

    if (error) {
      throw new Error(`Erro ao salvar transação: ${error.message}`);
    }
  }
}
