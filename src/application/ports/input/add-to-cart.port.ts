import { CartItemOperationResult } from '../../../domain/models/cart-item-operation-result.interface';

export interface AddToCartPort {
  addToCart(
    userId: number,
    productId: number,
    quantity: number,
  ): Promise<CartItemOperationResult>;
}
