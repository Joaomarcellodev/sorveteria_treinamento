import { Transaction } from "../../domain/entities/Transaction"
import { TransactionRepository } from "../../domain/repositories/TransactionRepository"

type RegisterExpenseInput = {
  sale: number
  category: string
  description?: string
}

export class RegisterExpenseUseCase {
  constructor(
    private readonly transactionRepository: TransactionRepository
  ) {}

  async implement(input:RegisterExpenseInput ): Promise<void> {
    if (input.sale <= 0) {
      throw new Error('Value Expense invalid')
    }

    const transaction = Transaction.expense({
      id: crypto.randomUUID(),
      sale: input.sale,
      category: input.category,
    })

    await this.transactionRepository.save(transaction)
  }
}
