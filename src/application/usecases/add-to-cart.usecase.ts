import { AddToCartPort } from '../ports/input/add-to-cart.port';
import { CartRepository } from '../../domain/repositories/cart.repository';
import { Cart } from '../../domain/models/cart.model';
import { CartItem } from '../../domain/models/cart-item.model';
import { GetProductByIdPort } from '../ports/output/get-product-by-id.port';
import { CartItemOperationResult } from '../../domain/models/cart-item-operation-result.interface';
import { LoggerPort } from '@nest-upskilling/common';

export class AddToCartUseCase implements AddToCartPort {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly getProductByIdPort: GetProductByIdPort,
    private readonly loggerPort: LoggerPort,
  ) {}

  async addToCart(
    userId: number,
    productId: number,
    quantity: number,
  ): Promise<CartItemOperationResult> {
    const product = await this.getProductByIdPort.execute(productId);
    this.loggerPort.log(
      'AddToCartUseCase',
      `Adding product: ${product}, in cart for user with id: ${userId}`,
    );
    if (!product) {
      return {
        status: 404,
        error: `Product not found with id ${productId}`,
        message: null,
      };
    }
    if (product.unitsAvailable < quantity) {
      return {
        status: 400,
        error: 'Product is not available in such quantities!',
        message: null,
      };
    }
    const cartItem = new CartItem(
      productId,
      quantity,
      product.imageUrl,
      product.price,
      product.name,
    );
    const cart = await this.cartRepository.getByUserId(userId);
    if (cart) {
      if (cart.items.find((item) => item.productId === productId)) {
        return {
          status: 400,
          error: 'Item already present in cart!',
          message: null,
        };
      }
      cart.addToCart(cartItem);
      await this.cartRepository.update(cart);
    } else {
      await this.cartRepository.create(new Cart(userId, [cartItem]));
    }

    return {
      status: 201,
      error: null,
      message: 'Item added successfully!',
    };
  }
}
