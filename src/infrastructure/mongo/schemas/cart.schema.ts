import { CartItemEntity, CartItemSchema } from './cart-item.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type CartDocument = CartEntity & Document;

@Schema()
export class CartEntity {
  @Prop({ name: '_id', required: true, unique: true })
  userId: number;

  @Prop({
    type: [CartItemSchema],
  })
  items: CartItemEntity[];

  constructor(userId: number, items: CartItemEntity[]) {
    this.userId = userId;
    this.items = items;
  }
}

export const CartSchema = SchemaFactory.createForClass(CartEntity);
