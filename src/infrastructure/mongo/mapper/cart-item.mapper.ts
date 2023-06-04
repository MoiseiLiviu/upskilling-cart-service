import { CartItemEntity } from '../schemas/cart-item.schema';
import { CartItem } from '../../../domain/models/cart-item.model';

export class CartItemMapper {
  static toCartItems(items: CartItemEntity[]) {
    return items.map(
      (item) =>
        new CartItem(
          item.productId,
          item.quantity,
          item.imageUrl,
          item.price,
          item.name,
        ),
    );
  }

  static toCartItemDocs(items: CartItem[]) {
    return items.map(
      (item) =>
        new CartItemEntity(
          item.productId,
          item.quantity,
          item.imageUrl,
          item.price,
          item.name,
        ),
    );
  }
}
