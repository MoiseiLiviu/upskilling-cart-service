import { Cart } from '../domain/models/cart.model';
import { CartItemPayload, CartPayload } from '../proto/cart.pb';
import { CartItem } from '../domain/models/cart-item.model';

export class CartMapper {
  static toCartPayload(cart: Cart): CartPayload {
    return {
      userId: cart.userId,
      items: cart.items.map((item) => this.toCartItemPayload(item)),
    };
  }

  static toCartItemPayload(cartItem: CartItem): CartItemPayload {
    return {
      price: cartItem.price,
      imageUrl: cartItem.imageUrl,
      productId: cartItem.productId,
      quantity: cartItem.quantity,
      name: cartItem.name,
    };
  }
}
