
import { Product } from '../../domain/entities/Product'
import { ProductRepository } from '../../domain/repositories/ProductRepository'
import { supabase } from './SupabaseClient'

export class ProductRepositorySupabase implements ProductRepository {

  async searchId(id: string): Promise<Product | null> {
    const { data, error } = await supabase
      .from('produtos')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) return null

    return new Product(
      data.id,
      data.name,
      data.type,
      Number(data.price_sale),
      data.amount_stock,
      data.amount_min
    )
  }

  async save(product: Product): Promise<void> {
    const snapshot = product.snapshot()

    const { error } = await supabase
      .from('produtos')
      .upsert({
        id: snapshot.id,
        name: snapshot.name,
        type: snapshot.type,
        price_sale: snapshot.priceSale,
        amount_stock: snapshot.amountStock,
        amount_min: snapshot.amountMin,
      })

    if (error) {
      throw new Error(`Erro ao salvar produto: ${error.message}`)
    }
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('produtos')
      .delete()
      .eq('id', id)

    if (error) {
      throw new Error(`Erro ao excluir produto: ${error.message}`)
    }
  }
}
