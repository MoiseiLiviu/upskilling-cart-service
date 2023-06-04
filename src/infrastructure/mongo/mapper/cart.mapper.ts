import { CartEntity } from "../schemas/cart.schema";
import { Cart } from "../../../domain/models/cart.model";
import { CartItemMapper } from "./cart-item.mapper";

export class CartMapper {

  static toCart(cartDoc: CartEntity) {
    return new Cart(cartDoc.userId, CartItemMapper.toCartItems(cartDoc.items));
  }

  static toCartDoc(cart: Cart) {
    return new CartEntity(cart.userId, CartItemMapper.toCartItemDocs(cart.items));
  }
}