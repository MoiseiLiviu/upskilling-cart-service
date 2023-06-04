import { RemoveItemPort } from '../ports/input/remove-item.port';
import { CartRepository } from '../../domain/repositories/cart.repository';
import { CartItemOperationResult } from '../../domain/models/cart-item-operation-result.interface';

export class RemoveItemUseCase implements RemoveItemPort {
  constructor(private readonly cartRepository: CartRepository) {}

  async execute(
    userId: number,
    productId: number,
  ): Promise<CartItemOperationResult> {
    const cart = await this.cartRepository.getByUserId(userId);
    if (!cart) {
      return {
        status: 404,
        error: `Cart not found for user with id ${userId}`,
        message: null,
      };
    }
    const filteredItems = cart.items.filter(
      (item) => item.productId !== productId,
    );
    if (cart.items.length === filteredItems.length) {
      return {
        status: 404,
        error: 'No item with the specified product id!',
        message: null,
      };
    }
    cart.items = filteredItems;
    await this.cartRepository.update(cart);

    return {
      status: 200,
      message: 'Item removed successfully!',
      error: null,
    };
  }
}
