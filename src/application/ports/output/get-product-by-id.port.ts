import { Product } from '../../../domain/models/product.model';

export interface GetProductByIdPort {
  execute(id: number): Promise<Product>;
}
