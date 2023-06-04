import { CartRepository } from '../../../domain/repositories/cart.repository';
import { Cart } from '../../../domain/models/cart.model';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CartEntity } from '../schemas/cart.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CartMapper } from '../mapper/cart.mapper';

@Injectable()
export class CartRepoImpl implements CartRepository {
  constructor(
    @InjectModel(CartEntity.name)
    private readonly cartModel: Model<CartEntity>,
  ) {}

  async getByUserId(userId: number): Promise<Cart> {
    const cartDoc = await this.cartModel.findOne({ userId }).exec();
    return cartDoc ? CartMapper.toCart(cartDoc) : null;
  }

  async create(cart: Cart): Promise<void> {
    await this.cartModel.create(CartMapper.toCartDoc(cart));
  }

  async update(cart: Cart): Promise<void> {
    await this.cartModel.updateOne({ userId: cart.userId }, cart);
  }

  async deleteByUserId(userId: number): Promise<void> {
    await this.cartModel.deleteOne({ userId });
  }
}
