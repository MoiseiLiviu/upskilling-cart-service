import { Module } from '@nestjs/common';
import {
  ADD_TO_CART_USE_CASE,
  CartRepositoryToken,
  CHECK_PRODUCT_AVAILABILITY_ADAPTER_TOKEN,
  CLEAR_CART_USE_CASE,
  GET_PRODUCT_BY_ID_ADAPTER_TOKEN,
  REMOVE_CART_ITEM_USE_CASE,
  UPDATE_CART_ITEM_USE_CASE,
} from '../tokens/cart-tokens';
import { CartRepository } from '../domain/repositories/cart.repository';
import { AddToCartUseCase } from './usecases/add-to-cart.usecase';
import { UpdateCartItemUseCase } from './usecases/update-cart-item.usecase';
import { CheckProductAvailabilityPort } from './ports/output/check-product-availability.port';
import { GetProductByIdPort } from './ports/output/get-product-by-id.port';
import { ClearCartUseCase } from './usecases/clear-cart.usecase';
import { RemoveItemUseCase } from './usecases/remove-item.usecase';
import { CartInfrastructureModule } from '../infrastructure/cart-infrastructure.module';
import { LoggerAdapterToken, LoggerPort, LoggerModule } from '@nest-upskilling/common';

@Module({
  imports: [CartInfrastructureModule, LoggerModule],
  providers: [
    {
      inject: [
        CartRepositoryToken,
        GET_PRODUCT_BY_ID_ADAPTER_TOKEN,
        LoggerAdapterToken,
      ],
      provide: ADD_TO_CART_USE_CASE,
      useFactory: (
        cartRepository: CartRepository,
        getProductByIdPort: GetProductByIdPort,
        loggerPort: LoggerPort,
      ) => new AddToCartUseCase(cartRepository, getProductByIdPort, loggerPort),
    },
    {
      inject: [CartRepositoryToken, CHECK_PRODUCT_AVAILABILITY_ADAPTER_TOKEN],
      provide: UPDATE_CART_ITEM_USE_CASE,
      useFactory: (
        cartRepository: CartRepository,
        checkProductAvailabilityPort: CheckProductAvailabilityPort,
      ) =>
        new UpdateCartItemUseCase(cartRepository, checkProductAvailabilityPort),
    },
    {
      inject: [CartRepositoryToken, LoggerAdapterToken, LoggerAdapterToken],
      provide: CLEAR_CART_USE_CASE,
      useFactory: (cartRepository: CartRepository, loggerPort: LoggerPort) =>
        new ClearCartUseCase(cartRepository, loggerPort),
    },
    {
      inject: [CartRepositoryToken],
      provide: REMOVE_CART_ITEM_USE_CASE,
      useFactory: (cartRepository: CartRepository) =>
        new RemoveItemUseCase(cartRepository),
    },
  ],
  exports: [
    UPDATE_CART_ITEM_USE_CASE,
    ADD_TO_CART_USE_CASE,
    CLEAR_CART_USE_CASE,
    REMOVE_CART_ITEM_USE_CASE,
  ],
})
export class CartApplicationModule {}
