import { Product } from '../../domain/entities/Product'
import { NotificationStockService } from '../../domain/services/NotificationStockService'


export class NotificacaoEstoqueServiceImpl
  implements  NotificationStockService {
  
  async notification(product: Product): Promise<void> {
    console.warn(
      `⚠ Estoque baixo: ${product.snapshot().name} (${product.stockCurrent()})`
    )
  }
}
