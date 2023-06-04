import { ClearCartPort } from '../ports/input/clear-cart.port';
import { CartRepository } from '../../domain/repositories/cart.repository';
import { CartItemOperationResult } from '../../domain/models/cart-item-operation-result.interface';
import { LoggerPort } from '@nest-upskilling/common';

export class ClearCartUseCase implements ClearCartPort {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly loggerPort: LoggerPort,
  ) {}

  async execute(userId: number): Promise<CartItemOperationResult> {
    await this.cartRepository.deleteByUserId(userId);
    this.loggerPort.log(
      'ClearCartUseCase',
      `Clearing the cart for user with id :${userId}`,
    );
    return {
      status: 204,
      error: null,
      message: 'Cart cleared successfully!',
    };
  }
}
