import { CartItem } from './cart-item.model';

export class Cart {
  userId: number;
  items: CartItem[];

  constructor(userId: number, items: CartItem[]) {
    this.userId = userId;
    this.items = items;
  }

  addToCart(cartItem: CartItem) {
    const itemIndex = this.items.findIndex(
      (item) => item.productId === cartItem.productId,
    );
    if (itemIndex > -1) {
      this.items[itemIndex].quantity += cartItem.quantity;
    } else {
      this.items.push(cartItem);
    }
  }

  updateCartItem(cartItem: CartItem) {
    const itemIndex = this.items.findIndex(
      (item) => item.productId === cartItem.productId,
    );
    if (itemIndex > -1) {
      this.items[itemIndex].quantity = cartItem.quantity;
    }
  }
}
