import { CartItemOperationResult } from '../../../domain/models/cart-item-operation-result.interface';

export interface UpdateCartItemPort {
  execute(
    userId: number,
    productId: number,
    newQuantity: number,
  ): Promise<CartItemOperationResult>;
}
