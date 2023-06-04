import { CartItem } from "../../../domain/models/cart-item.model";

export interface InitOrderPort {
  execute(userId: number): Promise<number>;
}