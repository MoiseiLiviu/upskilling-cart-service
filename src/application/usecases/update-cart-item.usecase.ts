import { UpdateCartItemPort } from '../ports/input/update-cart-item.port';
import { CartRepository } from '../../domain/repositories/cart.repository';
import { CheckProductAvailabilityPort } from '../ports/output/check-product-availability.port';
import { CartItemOperationResult } from '../../domain/models/cart-item-operation-result.interface';

export class UpdateCartItemUseCase implements UpdateCartItemPort {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly checkProductAvailabilityPort: CheckProductAvailabilityPort,
  ) {}

  async execute(
    userId: number,
    productId: number,
    newQuantity: number,
  ): Promise<CartItemOperationResult> {
    if (
      !(await this.checkProductAvailabilityPort.execute(
        productId,
        newQuantity,
      ))
    ) {
      return {
        status: 400,
        error: `Product is not available in required capacity!`,
        message: null,
      };
    }
    const cart = await this.cartRepository.getByUserId(userId);
    if (cart) {
      const itemIndex = cart.items.findIndex(
        (item) => item.productId === productId,
      );
      if (itemIndex > -1) {
        cart.items[itemIndex].updateQuantity(newQuantity);
        await this.cartRepository.update(cart);
        return {
          status: 200,
          message: `Quantity for item with productId: ${productId} was updated successfully!`,
          error: null,
        };
      }
    } else {
      return {
        status: 404,
        error: `Cart not found for user with id ${userId}`,
        message: null,
      };
    }
  }
}
