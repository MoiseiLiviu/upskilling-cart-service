import { CartItemOperationResult } from '../../../domain/models/cart-item-operation-result.interface';

export interface ClearCartPort {
  execute(userId: number): Promise<CartItemOperationResult>;
}
