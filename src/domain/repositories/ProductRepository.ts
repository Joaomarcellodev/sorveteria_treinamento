import { Product } from "../entities/Product";

export interface ProductRepository {
  searchId(id: string): Promise<Product | null>;
  save(product: Product): Promise<void>;
  delete(id:string): Promise<void>;
}
