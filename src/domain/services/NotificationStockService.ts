import { Product } from "../entities/Product";

export interface NotificationStockService{
      notification(produto: Product): void
}