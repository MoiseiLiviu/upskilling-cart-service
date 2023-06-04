import { CartDomainException } from "../exception/cart.exception";

export class CartItem {
  productId: number;
  quantity: number;
  imageUrl: string;
  price: number;
  name: string;

  constructor(productId: number, quantity: number, imageUrl: string, price: number, name: string) {
    this.productId = productId;
    this.quantity = quantity;
    this.imageUrl = imageUrl;
    this.price = price;
    this.name = name;
  }

  updateQuantity(quantity: number) {
    if (quantity < 0) {
      throw new CartDomainException(
        "Can't update item quantity to a negative value!",
      );
    } else {
      this.quantity = quantity;
    }
  }
}
