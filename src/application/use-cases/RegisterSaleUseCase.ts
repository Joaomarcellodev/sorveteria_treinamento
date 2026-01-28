import { Transaction } from "../../domain/entities/Transaction"
import { ProductRepository } from "../../domain/repositories/ProductRepository"
import { TransactionRepository } from "../../domain/repositories/TransactionRepository"
import { NotificationStockService } from "../../domain/services/NotificationStockService"


type RegisterSaleInput = {
  productId: string
  amount: number
}

export class RegisterSaleUseCase {
  constructor(
    private readonly produtoRepository: ProductRepository,
    private readonly transacaoRepository: TransactionRepository,
    private readonly notificacaoEstoqueService: NotificationStockService
  ) {}

  async implement(input: RegisterSaleInput): Promise<void> {
    const product = await this.produtoRepository.searchId(input.productId)

    if (!product) {
      throw new Error('Not found Product')
    }

    product.reduceStock(input.amount)

    const saleTotal = product.snapshot().priceSale * input.amount

    const transaction = Transaction.sale({
      id: crypto.randomUUID(),
      productId: product.id,
      amount: input.amount,
      sale: saleTotal,
    })

    await this.produtoRepository.save(product)
    await this.transacaoRepository.save(transaction)

    if (product.stockLow()) {
      await this.notificacaoEstoqueService.notification(product)
    }
  }
}
