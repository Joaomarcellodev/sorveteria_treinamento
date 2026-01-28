import { ProductRepository } from "../../domain/repositories/ProductRepository"

interface DeleteProductInput {
  productId: string
}

export class DeleteProductUseCase {
  constructor(
    private productRepository: ProductRepository
  ) {}

  async implment(input: DeleteProductInput): Promise<void> {
    const product = await this.productRepository.searchId(input.productId)

    if (!product) {
      throw new Error('Not found product')
    }

    await this.productRepository.delete(product.id)
  }
}
