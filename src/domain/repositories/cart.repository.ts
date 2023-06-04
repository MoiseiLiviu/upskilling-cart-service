import { Cart } from '../models/cart.model';

export interface CartRepository {
  getByUserId(userId: number): Promise<Cart>;

  update(cart: Cart): Promise<void>;

  create(cart: Cart): Promise<void>;

  deleteByUserId(userId: number): Promise<void>;
}
