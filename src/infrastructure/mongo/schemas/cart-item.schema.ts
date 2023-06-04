import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CartDocument = CartItemEntity & Document;

@Schema()
export class CartItemEntity {
  @Prop()
  productId: number;
  @Prop()
  quantity: number;
  @Prop()
  imageUrl: string;
  @Prop()
  price: number;
  @Prop()
  name: string;

  constructor(
    productId: number,
    quantity: number,
    imageUrl: string,
    price: number,
    name: string,
  ) {
    this.productId = productId;
    this.quantity = quantity;
    this.imageUrl = imageUrl;
    this.price = price;
    this.name = name;
  }
}

export const CartItemSchema = SchemaFactory.createForClass(CartItemEntity);
