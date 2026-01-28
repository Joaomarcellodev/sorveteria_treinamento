import { Product } from '../../domain/entities/Product'

export class ProductMapper {
  static toDomain(raw: any): Product {
    return Product.fromPersistence({
      id: raw.id,
      name: raw.name,
      type: raw.type,
      priceSale: Number(raw.price_sale),
      amountStock: Number(raw.amount_stock),
      amountMin: Number(raw.amount_min),
    })
  }

  static toPersistence(product: Product) {
    return {
      id: product.id,
      name: product.name,
      type: product.type,
      priceSale: product.priceSale,
      amountStock: product.stockCurrent(),
      amountMin: product.amountMin,
    }
  }
}
