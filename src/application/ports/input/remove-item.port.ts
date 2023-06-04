import { CartItemOperationResponse } from "../../../proto/cart.pb";
import { CartItemOperationResult } from "../../../domain/models/cart-item-operation-result.interface";

export interface RemoveItemPort {
  execute(userId: number, productId: number): Promise<CartItemOperationResult>;
}