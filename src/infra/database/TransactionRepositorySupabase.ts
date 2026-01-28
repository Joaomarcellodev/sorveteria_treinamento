import { supabase } from "./SupabaseClient";
import { Transaction } from "../../domain/entities/Transaction";
import { TransactionRepository } from "../../domain/repositories/TransactionRepository";

export class TransactionRepositorySupabase implements TransactionRepository {
  async searchId(id: string): Promise<Transaction | null> {
    const { data, error } = await supabase
      .from("transacoes")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) return null;

    return Transaction.fromPersistence({
      id: data.id,
      type: data.type,
      price: Number(data.price),
      data: new Date(data.data),
      productId: data.productId ?? undefined,
      amount: data.amount ?? undefined,
      category: data.category ?? undefined,
    });
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
