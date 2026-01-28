import { ProductRepository } from "../../domain/repositories/ProductRepository"

interface UpdateProductInput {
  productId: string
  name?: string
  type: 'SIMPLE' | 'COVERGE' | 'CREAMY'
  priceSale?: number
  amountMin?: number
}

export class UpdateProductUseCase {
  constructor(
    private productRepository: ProductRepository
  ) {}

  async implement(input: UpdateProductInput): Promise<void> {
    const product = await this.productRepository.searchId(input.productId)

    if (!product) {
      throw new Error('product não encontrado')
    }

    if (input.name) {
      product.changeName(input.name)
    }

    if (input.type) {
      product.changeType(input.type)
    }

    if (input.priceSale !== undefined) {
      product.changePriceSale(input.priceSale)
    }

    if (input.amountMin !== undefined) {
      product.changeMinimumStock(input.amountMin)
    }

    await this.productRepository.save(product)
  }
}
