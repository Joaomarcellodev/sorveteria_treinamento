import { Product } from "../../domain/entities/Product"
import { ProductRepository } from "../../domain/repositories/ProductRepository"


interface RegisterProductInput {
  name: string
  type: 'SIMPLE' | 'COVERGE' | 'CREAMY'
  amountHome: number
  priceSale: number
  amountMin?: number
}

export class RegisterProductUseCase {
  constructor(
    private productRepository:  ProductRepository
  ) {}

  async implement(input: RegisterProductInput): Promise<void> {
    if (input.amountHome < 0) {
      throw new Error('Quantidade inicial inválida')
    }

    const produto = new Product(
      crypto.randomUUID(),
      input.name,
      input.type,
      input.amountHome,
      input.priceSale,
      input.amountMin ?? 50
    )

    await this.productRepository.save(produto)
  }
}
