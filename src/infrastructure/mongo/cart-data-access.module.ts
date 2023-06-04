import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CartEntity, CartSchema } from './schemas/cart.schema';
import { CartItemEntity, CartItemSchema } from './schemas/cart-item.schema';
import { CartRepositoryToken } from '../../tokens/cart-tokens';
import { CartRepoImpl } from './repositories/cart-repo-impl';

@Module({
  providers: [
    {
      provide: CartRepositoryToken,
      useClass: CartRepoImpl,
    },
  ],
  imports: [
    MongooseModule.forFeature([
      { name: CartItemEntity.name, schema: CartItemSchema },
      { name: CartEntity.name, schema: CartSchema },
    ]),
  ],
  exports: [CartRepositoryToken],
})
export class CartDataAccessModule {}
